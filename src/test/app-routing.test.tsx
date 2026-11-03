import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { properties } from "@/lib/portfolio";
import { media } from "@/lib/media";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
const router = () => createRouter({ routeTree, context: { queryClient: new QueryClient() } });

describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    expect(router().matchRoutes("/").at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it.each(["/about", "/contact", "/services", "/sustainability"])(
    "matches the requested page %s",
    (path) => {
      expect(router().matchRoutes(path).at(-1)?.routeId).toBe(path);
    },
  );
  it("matches the portfolio index", () => {
    expect(router().matchRoutes("/portfolio").at(-1)?.routeId).toBe("/portfolio/");
  });
  it.each(properties.map((p) => p.slug))("matches the property page /portfolio/%s", (slug) => {
    expect(router().matchRoutes(`/portfolio/${slug}`).at(-1)?.routeId).toBe("/portfolio/$slug");
  });
  it.each(["/brickfield-canvas", "/loop-street"])("keeps the old case study URL %s", (path) => {
    expect(router().matchRoutes(path).at(-1)?.routeId).toBe(path);
  });
});

describe("Content", () => {
  it("only references shots that exist in the shot list", () => {
    const ids = new Set(Object.keys(media));
    const json = JSON.stringify(properties);
    for (const match of json.matchAll(/"(?:hero|card|media|before|after)":"(\w+)"/g))
      expect(ids).toContain(match[1]);
  });
});
