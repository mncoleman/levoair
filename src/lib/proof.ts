/**
 * Proof shown on the home and industry pages.
 *
 * Only verified numbers and real projects. Anything left empty is hidden.
 */

export interface ProofStat {
  label: string;
  value: string; // e.g. "1,200+", leave "" to hide
}

export interface ProofProject {
  image: string; // image URL (resized copies live in public/portfolio)
  alt: string; // what the photo shows, for search and screen readers
  title: string; // e.g. "Weekly progress capture, 40-acre residential site"
  industry: string; // e.g. "Construction"
  summary: string; // one sentence on what was flown and delivered
}

export const proofStats: ProofStat[] = [
  { label: "Flights flown", value: "1,500+" },
  { label: "Flight hours", value: "2,000+" },
  { label: "Acres mapped", value: "10,000+" },
];

export const proofProjects: ProofProject[] = [
  {
    image: "/portfolio/68e5a5552cc2613d34be7f98-lg.webp",
    alt: "Aerial drone view of new townhome construction in a residential development",
    title: "New townhome construction",
    industry: "Construction",
    summary: "Aerial capture of new townhome construction.",
  },
  {
    image: "/portfolio/68954ffde474881915728fd6-lg.webp",
    alt: "Aerial drone view of a highway interchange and nearby commercial development",
    title: "Highway interchange",
    industry: "Infrastructure",
    summary: "Aerial capture of a highway interchange and commercial development.",
  },
  {
    image: "/portfolio/68954effe474880ddf728f72-lg.webp",
    alt: "Aerial drone view of a suburban residential neighborhood beside lakes",
    title: "Lakeside residential neighborhood",
    industry: "Residential",
    summary: "Aerial capture of a residential neighborhood beside lakes.",
  },
];

/**
 * What platform pilot checklists screen for, shown as a row of tags.
 * Only what is true today.
 */
export const proofCredentials: string[] = [
  "FAA Part 107 certified",
  "$1M liability insurance",
  "RTK aircraft",
  "RTK base station on site",
];
