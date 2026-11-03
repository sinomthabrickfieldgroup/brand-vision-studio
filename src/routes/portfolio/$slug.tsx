import { createFileRoute, notFound } from "@tanstack/react-router";
import { CaseStudy } from "@/components/case-study";
import { media } from "@/lib/media";
import { getProperty } from "@/lib/portfolio";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const property = getProperty(params.slug);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.property;
    if (!p) return { meta: [{ title: "Property — Brickfield Group" }] };
    const hero = media[p.hero];
    const image = "src" in hero ? hero.src : undefined;
    return {
      meta: [
        { title: `${p.name} — ${p.type} property in ${p.area} | Brickfield Group` },
        { name: "description", content: p.summary },
        { property: "og:title", content: `${p.name} — Brickfield Group` },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "website" },
        ...(image ? [{ property: "og:image", content: image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PropertyPage,
});

function PropertyPage() {
  const { property } = Route.useLoaderData();
  return <CaseStudy key={property.slug} property={property} />;
}
