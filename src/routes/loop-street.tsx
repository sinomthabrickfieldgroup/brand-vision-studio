import { createFileRoute, redirect } from "@tanstack/react-router";

// The case study moved under /portfolio. Keep the old URL working.
export const Route = createFileRoute("/loop-street")({
  beforeLoad: () => {
    throw redirect({ to: "/portfolio/$slug", params: { slug: "loop-street" }, statusCode: 301 });
  },
});
