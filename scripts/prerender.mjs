/**
 * Prerenders every route to static HTML after `vite build`, then writes sitemap.xml.
 *
 * GitHub Pages serves /services from services.html with a 200, so each route gets
 * its own file with the real content, title, meta and JSON-LD already in place.
 * Without this, every route but / is served from 404.html with a 404 status.
 */
import { preview } from "vite";
import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const SITE = "https://levoair.com";
const DIST = path.resolve("dist");
const SETTLE_MS = 3000; // let the hero text animations finish before the snapshot

// Keep in sync with src/routes.tsx. sitemap: false keeps noindex pages out of the sitemap.
const routes = [
  { path: "/", priority: "1.0" },
  { path: "/services", priority: "0.9" },
  { path: "/construction-drone-services", priority: "0.9" },
  { path: "/drone-mapping-services", priority: "0.9" },
  { path: "/drone-inspection-services", priority: "0.9" },
  { path: "/portfolio", priority: "0.7" },
  { path: "/about", priority: "0.7" },
  { path: "/contact", priority: "0.8" },
  { path: "/drone-license-guide", priority: "0.8" },
  { path: "/drone-registration-guide", priority: "0.8" },
  { path: "/terms", priority: "0.2" },
  { path: "/privacy", priority: "0.2" },
  { path: "/brand-kit", sitemap: false },
  { path: "/__not-found__", file: "404.html", sitemap: false },
];

const fileFor = (route) => route.file ?? (route.path === "/" ? "index.html" : `${route.path.slice(1)}.html`);

const server = await preview({ logLevel: "warn", preview: { port: 4173, strictPort: true } });
const origin = server.resolvedUrls.local[0].replace(/\/$/, "");

const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
const rendered = [];

try {
  for (const route of routes) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setRequestInterception(true);
    // Only load the site itself. Blocks analytics, the form embed and other third parties.
    page.on("request", (req) => (req.url().startsWith(origin) ? req.continue() : req.abort()));

    await page.goto(`${origin}${route.path}`, { waitUntil: "networkidle0", timeout: 60000 });
    await new Promise((r) => setTimeout(r, SETTLE_MS));

    const html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);
    if (route.sitemap !== false && !html.includes('rel="canonical"')) throw new Error(`No canonical on ${route.path}`);

    rendered.push({ file: fileFor(route), html });
    console.log(`prerendered ${route.path} -> ${fileFor(route)}`);
    await page.close();
  }
} finally {
  await browser.close();
  server.httpServer.close();
}

// Write after rendering so the preview server keeps serving the original index.html.
for (const { file, html } of rendered) {
  await writeFile(path.join(DIST, file), html);
}

const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((r) => r.sitemap !== false)
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
await writeFile(path.join(DIST, "sitemap.xml"), sitemap);
console.log(`wrote sitemap.xml (${routes.filter((r) => r.sitemap !== false).length} urls)`);
