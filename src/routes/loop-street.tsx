import { createFileRoute } from "@tanstack/react-router";
import { CaseStudy } from "@/components/case-study";
import loop from "@/assets/loop-street-photo.asset.json";

export const Route = createFileRoute("/loop-street")({
  head: () => ({ meta: [
    { title: "9 Loop Street — Brickfield Group Case Study" },
    { name: "description", content: "The refurbishment of 9 Loop Street in Maitland, Cape Town: a purpose-built industrial facility for AMD Engineering." },
    { property: "og:title", content: "9 Loop Street — Refurbished from the ground up" },
    { property: "og:description", content: "An industrial warehouse transformed for specialist steel fabrication and manufacturing in Maitland." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: LoopStreet,
});

function LoopStreet() {
  return <CaseStudy name="9 Loop Street" category="Industrial" location="Maitland, Cape Town" image={loop.url} imageAlt="Refurbishment work at Brickfield Group’s 9 Loop Street industrial property in Maitland" introduction="Refurbished from the ground up. Ready for serious industry." sections={[
    { title: "The transformation", text: "Acquired in March 2026, a conventional industrial warehouse was comprehensively renovated over five months. Completed in August 2026, the refurbishment created a premium facility tailored to manufacturing and fabrication." },
    { title: "Designed around operations", text: "The 2,362m² facility combines a column-efficient warehouse with a modern office and canteen block. Dual yard access via Loop Street and Norway Street supports the movement of trucks and materials." },
    { title: "Power with a purpose", text: "An upgraded 400A three-phase power supply supports the demands of heavy engineering. The improvements focus on what the occupying business needs to work efficiently." },
    { title: "A long-term home", text: "The first tenant is AMD Engineering, a specialist steel fabrication and manufacturing business established in 1993. The facility’s power and warehouse layout were purpose-suited to its operations." },
  ]} next={{ name: "Brickfield Canvas", to: "/brickfield-canvas" }} />;
}