// Post-build: write a copy of dist/index.html per article (and the /articles
// index) with its own <title>, description, Open Graph and Twitter tags.
// Social crawlers don't run JS, so without this every route previews as the
// homepage. GitHub Pages serves /a/foo from a/foo.html with a 200 and no
// redirect. Old top-level article URLs get the same tags (pointing at the new
// URL) so links shared before the move still preview correctly.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://levoair.com";
const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const dist = join(root, "dist");
const articles = JSON.parse(
  readFileSync(join(root, "src/data/articles.json"), "utf8")
);
const base = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);
  if (!re.test(html)) throw new Error(`Missing ${attr}="${key}" in index.html`);
  return html.replace(re, `<meta ${attr}="${key}" content="${esc(value)}" />`);
};

const render = ({ path, title, description, image }) => {
  const url = `${SITE}${path}`;
  const img = `${SITE}${image}`;
  let html = base.replace(
    /<title>[^<]*<\/title>/,
    `<title>${esc(`${title} - LevoAir`)}</title>`
  );
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:image", img);
  html = setMeta(html, "property", "og:url", url);
  const extra = [
    `<meta property="og:site_name" content="LevoAir" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    `<link rel="canonical" href="${url}" />`,
  ].join("\n    ");
  return html.replace("</head>", `    ${extra}\n  </head>`);
};

const write = (file, html) => {
  const out = join(dist, file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`og: dist/${file}`);
};

write(
  "articles.html",
  render({
    path: "/articles",
    title: "Articles",
    description:
      "Plain-English guides to FAA drone licensing, registration, Remote ID, and flying legally.",
    image: "/og/articles.png",
  })
);

for (const a of articles) {
  const html = render({
    path: `/a/${a.slug}`,
    title: a.title,
    description: a.description,
    image: a.image,
  });
  write(`a/${a.slug}.html`, html);
  write(`${a.slug}.html`, html); // legacy URL, redirects client-side
}
