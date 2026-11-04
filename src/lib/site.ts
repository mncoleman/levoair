/**
 * Business facts used across the site and in structured data.
 * Leave a field empty until it is confirmed. Empty fields are not rendered.
 */
export const SITE = {
  name: "LevoAir",
  url: "https://levoair.com",
  email: "info@levoair.com",
  // Shown on Contact and in the footer. Empty hides it.
  phone: "(970) 670-7048",
  // Used in structured data for local search.
  areaServed: "Colorado",
  linkedin: "https://www.linkedin.com/company/levoair/",
  logo: "https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68ed922e8c1d1065ae358ef7.png",
  defaultImage: "https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/6915203a93f9db10714de5da.gif",
};

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: SITE.logo,
  email: SITE.email,
  ...(SITE.phone && { telephone: SITE.phone }),
  ...(SITE.areaServed && { areaServed: SITE.areaServed }),
  sameAs: [SITE.linkedin],
};

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE.url}${item.path}`,
  })),
});
