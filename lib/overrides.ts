// HANDOFF NOTE — project overrides store.
//
// The admin panel (/admin) lets a founder edit how their project shows up in
// the garden: name, pitch, links, and the project video. This prototype has
// no backend, so edits persist to localStorage and the Garden page merges
// them over the mock data from lib/data.ts on mount.
//
// When wiring the real backend, replace load/save with your API calls
// (PATCH /projects/:slug) and delete this file — the shapes below map 1:1
// onto the Project entity in lib/data.ts.

import type { ProjectLink } from "@/lib/data";

export type ProjectOverrides = {
  name?: string;
  quote?: string;
  /** null = video explicitly removed; undefined = never set */
  videoId?: string | null;
  links?: ProjectLink[];
};

const key = (slug: string) => `sproutly-project-${slug}`;

export function loadOverrides(slug: string): ProjectOverrides {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(key(slug)) ?? "{}") as ProjectOverrides;
  } catch {
    return {};
  }
}

export function saveOverrides(slug: string, patch: ProjectOverrides) {
  const next = { ...loadOverrides(slug), ...patch };
  localStorage.setItem(key(slug), JSON.stringify(next));
  return next;
}
