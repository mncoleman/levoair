import { useLayoutEffect } from "react";
import { SITE } from "@/lib/site";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Sets title, meta, canonical, Open Graph and JSON-LD for a page.
 * Runs as a layout effect so the head is correct before analytics reads
 * document.title and before the prerender script snapshots the page.
 */
export const Seo = ({
  title,
  description,
  path,
  image = SITE.defaultImage,
  type = "website",
  noindex = false,
  jsonLd,
}: SeoProps) => {
  useLayoutEffect(() => {
    const url = `${SITE.url}${path === "/" ? "/" : path}`;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    if (noindex) document.head.querySelector('link[rel="canonical"]')?.remove();
    else setLink("canonical", url);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", image);
    setMeta("property", "og:site_name", SITE.name);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    document.head.querySelector("#page-jsonld")?.remove();
    if (jsonLd?.length) {
      const script = document.createElement("script");
      script.id = "page-jsonld";
      script.type = "application/ld+json";
      script.text = JSON.stringify({ "@context": "https://schema.org", "@graph": jsonLd });
      document.head.appendChild(script);
    }
  }, [title, description, path, image, type, noindex, jsonLd]);

  return null;
};
