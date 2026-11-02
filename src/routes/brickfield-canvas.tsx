import { createFileRoute } from "@tanstack/react-router";
import { CaseStudy } from "@/components/case-study";
import canvas from "@/assets/brickfield-canvas.asset.json";

export const Route = createFileRoute("/brickfield-canvas")({
  head: () => ({ meta: [
    { title: "Brickfield Canvas — Brickfield Group Case Study" },
    { name: "description", content: "The transformation of an industrial property into Brickfield Canvas, a 10,400m² commercial campus in Woodstock, Cape Town." },
    { property: "og:title", content: "Brickfield Canvas — Redeveloped. Reimagined." },
    { property: "og:description", content: "Adaptive reuse in Woodstock: A-Grade workspace, shared amenities and green infrastructure." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Canvas,
});

function Canvas() {
  return <CaseStudy name="Brickfield Canvas" category="Mixed-use flagship" location="Woodstock, Cape Town" image={canvas.url} imageAlt="The Brickfield Canvas exterior and landscaped campus in Woodstock" introduction="An industrial past. A new kind of working community." sections={[
    { title: "The transformation", text: "Acquired in 2016, the industrial property at 35 Brickfield Road was stripped back and rebuilt over three years. In 2019 it emerged as a 10,400m² commercial campus, bringing new purpose to an existing Woodstock building." },
    { title: "More than office space", text: "A-Grade offices sit alongside a community café, co-working spaces, a gym and meeting rooms. The campus brings together businesses across technology, health, finance and the sciences." },
    { title: "Built for the long term", text: "Solar power, a borehole, in-slab heating and living walls are part of the campus’s green infrastructure. The building’s reuse and day-to-day operation reflect the same long-term perspective." },
    { title: "A place businesses stay", text: "Home to more than 20 businesses and fully tenanted since 2022, Canvas shows what patient investment and a focus on the tenant experience can deliver." },
  ]} next={{ name: "9 Loop Street", to: "/loop-street" }} />;
}