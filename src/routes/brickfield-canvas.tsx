import { createFileRoute, redirect } from "@tanstack/react-router";

// The case study moved under /portfolio. Keep the old URL working.
export const Route = createFileRoute("/brickfield-canvas")({
  beforeLoad: () => {
    throw redirect({
      to: "/portfolio/$slug",
      params: { slug: "brickfield-canvas" },
      statusCode: 301,
    });
  },
});
