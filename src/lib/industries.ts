export interface Industry {
  path: string;
  name: string;
  title: string; // <title>
  description: string; // meta description
  headline: string; // h1
  intro: string;
  problemHeading: string;
  problem: string;
  captures: string[];
  faqs: { q: string; a: string }[];
}

const airspaceFaq = {
  q: "Can you fly in controlled airspace?",
  a: "Yes. We request LAANC authorizations, and FAA waivers where a site needs one, before the flight goes on the calendar.",
};

const partnerFaq = {
  q: "Can you fly inside our existing drone program?",
  a: "Yes. We fly to your standards and deliver in your format, either directly or as part of your current flight partner's program.",
};

const deliveryFaq = {
  q: "What do you deliver after each flight?",
  a: "Imagery and flight data in the format your team or processing platform expects, uploaded after every visit.",
};

export const industries: Industry[] = [
  {
    path: "/construction-drone-services",
    name: "Construction",
    title: "Construction Drone Services: Progress & Site Capture | LevoAir",
    description:
      "Recurring drone capture for active job sites. Progress, earthwork, and mapping flights flown to the same plan every visit by FAA Part 107 pilots.",
    headline: "Construction Drone Services",
    intro:
      "Scheduled drone capture for active job sites. Every visit is flown to the same plan, so progress, earthwork, and site conditions compare cleanly week to week.",
    problemHeading: "Progress Data Only Works If It's Consistent",
    problem:
      "A missed week, or a flight flown at a different altitude, leaves a gap your schedule and your stakeholders feel. Recurring capture needs the same plan, the same standards, and a team that shows up on the date.",
    captures: [
      "Repeat mapping flights for orthomosaics and surface models",
      "Progress photo and video sets for owner and lender updates",
      "Oblique capture for 3D site models",
      "Earthwork and stockpile capture flown to your processing specs",
    ],
    faqs: [
      {
        q: "How often can you fly a site?",
        a: "On the cadence your project needs, from a single visit to recurring weekly or monthly flights. Every visit uses the same saved flight plan.",
      },
      airspaceFaq,
      partnerFaq,
      deliveryFaq,
    ],
  },
  {
    path: "/drone-mapping-services",
    name: "Mapping & Survey",
    title: "Drone Mapping & Photogrammetry Services | LevoAir",
    description:
      "Photogrammetry and drone mapping flights planned for your deliverable: set overlap, altitude, and ground sample distance, flown the same way every time.",
    headline: "Drone Mapping & Survey Services",
    intro:
      "Photogrammetry flights planned for the deliverable you need. Overlap, altitude, and ground sample distance are set up front and flown the same way every time.",
    problemHeading: "Bad Flight Plans Mean Reflying the Site",
    problem:
      "Mapping data falls apart when the flight isn't planned for it. Thin overlap, shifting altitude, or missed coverage means reprocessing, or sending someone back out to fly it again.",
    captures: [
      "Nadir photogrammetry flights for orthomosaics",
      "Surface and terrain model capture",
      "Ground control coordination with your survey team",
      "Land and site assessment imagery",
    ],
    faqs: [
      {
        q: "How do you plan a mapping flight?",
        a: "We set overlap, altitude, and ground sample distance to match your deliverable, then save the mission so repeat flights match the first one.",
      },
      {
        q: "Do you work with ground control points?",
        a: "Yes. We coordinate ground control with your survey team so the capture lines up with your control network.",
      },
      airspaceFaq,
      deliveryFaq,
    ],
  },
  {
    path: "/drone-inspection-services",
    name: "Inspection",
    title: "Drone Inspection Services: Roofs, Structures & Infrastructure | LevoAir",
    description:
      "Drone inspection of roofs, facades, structures, and infrastructure without lifts or crews at height. Repeat inspections flown from saved positions.",
    headline: "Drone Inspection Services",
    intro:
      "Close-range drone inspection of roofs, facades, structures, and infrastructure, without lifts, scaffolding, or crews working at height.",
    problemHeading: "Getting Eyes Up There Is Slow and Risky",
    problem:
      "A look at a roof, facade, or structure usually means equipment rental, people at height, and lost time. A drone flight gets the same view faster, and a saved flight gets it again next time from the same angles.",
    captures: [
      "Roof and facade inspection imagery",
      "Infrastructure and structure documentation",
      "Repeat inspections flown from saved positions for side-by-side comparison",
      "Detailed photo and video sets for engineering review",
    ],
    faqs: [
      {
        q: "Can you repeat the same inspection later?",
        a: "Yes. We save flight positions so later inspections capture the same angles, which makes changes easy to compare.",
      },
      airspaceFaq,
      partnerFaq,
      deliveryFaq,
    ],
  },
];
