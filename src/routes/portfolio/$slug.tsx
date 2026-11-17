import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead, propertyJsonLd } from "@/lib/seo";
import { CaseStudy } from "@/components/case-study";
import { getProperty } from "@/lib/portfolio";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const property = getProperty(params.slug);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.property;
    if (!p) return { meta: [{ title: "Property | Brickfield Group" }] };
    // A 1200×630 preview per photographed property (public/og/); the rest use the branded default.
    const image = OG_IMAGES.has(p.slug) ? `/og/${p.slug}.jpg` : undefined;
    return pageHead({
      title: `${p.name}, ${p.type} property in ${p.area} | Brickfield Group`,
      description: p.summary,
      path: `/portfolio/${p.slug}`,
      ...(image ? { image, imageAlt: p.name } : {}),
      jsonLd: propertyJsonLd(p),
    });
  },
  component: PropertyPage,
});

const OG_IMAGES = new Set([
  "brickfield-canvas",
  "9-loop-street",
  "brickfield-call-centre",
  "66-68-wierda",
]);

function PropertyPage() {
  const { property } = Route.useLoaderData();
  return <CaseStudy key={property.slug} property={property} />;
}
