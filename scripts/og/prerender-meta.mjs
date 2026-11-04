// Post-build: write a copy of dist/index.html per informational page with its
// own <title>, description, Open Graph and Twitter tags. Social crawlers don't
// run JS, so without this every route previews as the homepage.
// GitHub Pages serves /foo from foo.html, so /drone-license-guide resolves to
// dist/drone-license-guide.html with a 200 and no redirect.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://levoair.com";
const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const dist = join(root, "dist");
const pages = JSON.parse(
  readFileSync(join(root, "scripts/og/pages.json"), "utf8")
);
const base = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  if (!re.test(html)) throw new Error(`Missing ${attr}="${key}" in index.html`);
  return html.replace(re, tag);
};

for (const page of pages) {
  const url = `${SITE}${page.route}`;
  const image = `${SITE}/og/${page.image}`;
  const title = `${page.ogTitle} - LevoAir`;

  let html = base.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "property", "og:title", page.ogTitle);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "property", "og:url", url);

  const extra = [
    `<meta property="og:site_name" content="LevoAir" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(page.ogTitle)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<link rel="canonical" href="${url}" />`,
  ].join("\n    ");
  html = html.replace("</head>", `    ${extra}\n  </head>`);

  const out = join(dist, `${page.route.replace(/^\//, "")}.html`);
  writeFileSync(out, html);
  console.log(`og: ${page.route} -> ${out.replace(root + "/", "")}`);
}
