import { CONTACT, type Property } from "@/lib/portfolio";

/** The live domain. Canonical URLs, link-preview images and the sitemap all use it. */
export const SITE_URL = "https://brickfieldgroup.co.za";
export const SITE_NAME = "Brickfield Group";

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

type HeadInput = {
  /** The browser-tab and search-result title. */
  title: string;
  /** The search-result snippet: one or two plain sentences, under ~160 characters. */
  description: string;
  /** The page's own path, e.g. "/about". */
  path: string;
  /** Link-preview title and text, if different from the search ones. */
  ogTitle?: string;
  ogDescription?: string;
  /** A 1200×630 JPG in public/og/. Defaults to the branded Canvas image. */
  image?: string;
  imageAlt?: string;
  /** Structured data (schema.org) for this page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Everything a page needs in <head> for search and link previews: title, description, canonical
 * URL, Open Graph and Twitter tags with an absolute image URL, and optional structured data.
 */
export function pageHead({
  title,
  description,
  path,
  ogTitle = title,
  ogDescription = description,
  image = "/og/default.jpg",
  imageAlt = "Brickfield Group",
  jsonLd,
}: HeadInput) {
  const url = absoluteUrl(path);
  const img = absoluteUrl(image);
  const data = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDescription },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt },
      { property: "og:locale", content: "en_ZA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: ogDescription },
      { name: "twitter:image", content: img },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: data.map((d) => ({ type: "application/ld+json", children: JSON.stringify(d) })),
  };
}

/** The company, for search engines' knowledge panel. Rendered on the home page. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/icon-512.png"),
  email: CONTACT.email,
  telephone: "+27 21 830 0750",
  foundingDate: "2009",
  address: {
    "@type": "PostalAddress",
    streetAddress: "35 Brickfield Road",
    addressLocality: "Woodstock, Cape Town",
    postalCode: "7925",
    addressCountry: "ZA",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Firefly Capital",
    url: "https://fireflycapital.co.za",
  },
  areaServed: ["Cape Town", "Johannesburg"],
};

/** One property, as a place the company owns. */
export const propertyJsonLd = (p: Property) => ({
  "@context": "https://schema.org",
  "@type": "Place",
  name: p.name,
  description: p.summary,
  url: absoluteUrl(`/portfolio/${p.slug}`),
  address: {
    "@type": "PostalAddress",
    streetAddress: p.address,
    addressLocality: `${p.area}, ${p.city}`,
    addressCountry: "ZA",
  },
  containedInPlace: { "@type": "City", name: p.city },
  publicAccess: false,
});
