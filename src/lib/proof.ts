/**
 * Proof shown on the home and industry pages.
 *
 * TODO(Matthew): fill these in with verified numbers and real projects before
 * this goes live. Anything left empty is hidden, so the site never shows a
 * placeholder. Only enter figures you can back up.
 */

export interface ProofStat {
  label: string;
  value: string; // e.g. "1,200+", leave "" to hide
}

export interface ProofProject {
  image: string; // full image URL
  alt: string; // what the photo shows, for search and screen readers
  title: string; // e.g. "Weekly progress capture, 40-acre residential site"
  industry: string; // e.g. "Construction"
  summary: string; // one sentence on what was flown and delivered
}

export const proofStats: ProofStat[] = [
  { label: "Flights flown", value: "" },
  { label: "Sites captured", value: "" },
  { label: "Acres mapped", value: "" },
  { label: "Industries served", value: "" },
];

export const proofProjects: ProofProject[] = [];

/**
 * What platform pilot checklists screen for, shown as a row of tags.
 * TODO(Matthew): add only what is true today, e.g. "$1M liability insurance",
 * "RTK aircraft", "RTK base station on site", "Mavic 3 Enterprise RTK".
 */
export const proofCredentials: string[] = [];
