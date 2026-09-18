import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Plane,
  GraduationCap,
  ShieldCheck,
  ClipboardList,
  UserCheck,
  RefreshCw,
  BookOpen,
  Clock,
  DollarSign,
  ExternalLink,
  CheckCircle2,
  XCircle,
  ChevronRight,
  AlertCircle,
  FileText,
  Calendar,
  Sparkles,
  Scale,
  Radio,
  Tag,
  Radar,
  MapPinned,
  Briefcase,
  Gamepad2,
  Weight,
  ArrowRight,
} from "lucide-react";
import usePageTitle from "@/lib/usePageTitle";
import ScrollFloat from "@/components/ScrollFloat";
import { BlurText } from "@/components/ui/BlurText";
import GlassCube from "@/components/ui/GlassCube";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { trackEvent, trackOutboundLink } from "@/lib/analytics";

type FlyerType = "recreational" | "part107";

interface Step {
  icon: typeof Plane;
  title: string;
  duration: string;
  cost: string;
  description: string;
  details: string[];
  link?: { url: string; label: string };
}

const DRONEZONE_URL = "https://faadronezone-access.faa.gov/";

const recreationalSteps: Step[] = [
  {
    icon: Scale,
    title: "Weigh Your Drone (With Everything Attached)",
    duration: "2 minutes",
    cost: "Free",
    description:
      "The FAA threshold is 250 grams (0.55 lb) at takeoff, including battery, propeller guards, filters, and any accessory you bolt on. If it is under 250 g and you only ever fly it for fun, you can skip registration entirely.",
    details: [
      "Under 250 g and purely recreational: no registration, no Remote ID required",
      "250 g or more: registration and Remote ID are required before the first flight",
      "Popular sub-250 g models (DJI Mini series and similar) tip over the line once you add prop guards or a heavier battery",
      "If you ever fly for work, goodwill, or a client, the 250 g exemption no longer applies to you",
    ],
  },
  {
    icon: UserCheck,
    title: "Create Your FAA DroneZone Account",
    duration: "5 minutes",
    cost: "Free",
    description:
      "DroneZone is the FAA's registration portal for everything under 55 pounds. Use an email address you will still have in three years; you will need it to renew.",
    details: [
      "You must be 13 or older to register; a parent or guardian registers for younger flyers",
      "U.S. citizens and legal permanent residents receive a registration certificate",
      "Foreign nationals receive a 'recognition of ownership' document through the same process",
      "Have your address, phone number, and a credit or debit card ready",
    ],
    link: { url: DRONEZONE_URL, label: "Open FAA DroneZone" },
  },
  {
    icon: ClipboardList,
    title: "Register as a Recreational Flyer",
    duration: "5 minutes",
    cost: "$5 for 3 years",
    description:
      "One recreational registration covers every drone you own. You get a single FA number and apply it to your whole fleet. Add each aircraft to your inventory with its make, model, and Remote ID serial number.",
    details: [
      "Select the 'Recreational Flyer' dashboard, not Part 107",
      "One $5 fee covers all your drones for 3 years",
      "List the Remote ID serial number for each Standard Remote ID drone or broadcast module",
      "A recreational registration cannot be used for Part 107 flights, and cannot be converted later",
    ],
    link: { url: DRONEZONE_URL, label: "Register at DroneZone" },
  },
  {
    icon: Tag,
    title: "Mark Your Registration Number on the Airframe",
    duration: "5 minutes",
    cost: "Free to $10 (label)",
    description:
      "Your FA number must be on the outside of every drone you fly, legible without tools. Inside the battery compartment no longer counts. Sharpie, engraving, or a printed label all work.",
    details: [
      "Number must be visible on an external surface",
      "Same number goes on every drone in your recreational inventory",
      "Durable label makers and engraved plates hold up better than marker on matte plastic",
    ],
    link: {
      url: "https://www.faa.gov/sites/faa.gov/files/uas/recreational_fliers/UAS_how_to_label_Infographic.pdf",
      label: "FAA Labeling Guide (PDF)",
    },
  },
  {
    icon: GraduationCap,
    title: "Take TRUST (The Recreational UAS Safety Test)",
    duration: "20 to 30 minutes",
    cost: "Free",
    description:
      "Federal law requires every recreational flyer to pass TRUST before flying, regardless of drone weight. Yes, even the 249 g drone that did not need registration. It is free, online, and you cannot fail it.",
    details: [
      "Required for every recreational flyer, including sub-250 g pilots",
      "Taken once, never expires",
      "Every question can be corrected to 100% before your certificate is issued",
      "Download and save the certificate; administrators do not keep a copy, and losing it means retaking the test",
    ],
    link: {
      url: "https://www.faa.gov/uas/recreational_flyers/knowledge_test_updates",
      label: "FAA TRUST Overview",
    },
  },
  {
    icon: FileText,
    title: "Carry Proof on Every Flight",
    duration: "Ongoing",
    cost: "Free",
    description:
      "Law enforcement and FAA personnel can ask for your paperwork on the spot. A phone screenshot is fine, but it has to be on you, not at home.",
    details: [
      "Registration certificate (paper or digital)",
      "TRUST completion certificate",
      "Anyone borrowing your drone must carry your registration certificate too",
      "Failure to register or carry proof can lead to civil and criminal penalties",
    ],
  },
  {
    icon: RefreshCw,
    title: "Renew Every 3 Years",
    duration: "5 minutes",
    cost: "$5",
    description:
      "Registration expires 3 years from the date you paid. Log back into DroneZone with the same email, renew, and keep flying. TRUST does not need to be repeated.",
    details: [
      "Set a calendar reminder for 3 years out; the FAA reminder email is easy to miss",
      "Add new drones to your inventory any time at no extra charge",
      "TRUST is a one-time requirement unless you lose your certificate",
    ],
    link: { url: DRONEZONE_URL, label: "Renew at DroneZone" },
  },
];

const part107Steps: Step[] = [
  {
    icon: Briefcase,
    title: "Confirm You Are Flying Under Part 107",
    duration: "1 minute",
    cost: "Free",
    description:
      "If there is any business purpose, client, or goodwill involved, you are under Part 107. Weight does not matter here: every drone flown under Part 107 must be registered, including sub-250 g models.",
    details: [
      "Roof inspections, real estate photos, event coverage, and volunteer survey work are all Part 107",
      "The 250 g exemption exists only for purely recreational flying",
      "You must hold a current Part 107 Remote Pilot Certificate to act as pilot in command",
      "When in doubt, the FAA's guidance is to assume Part 107",
    ],
    link: {
      url: "/drone-license-guide",
      label: "Need the certificate first? Read our license guide",
    },
  },
  {
    icon: UserCheck,
    title: "Create or Log Into FAA DroneZone",
    duration: "5 minutes",
    cost: "Free",
    description:
      "DroneZone handles registration for all drones under 55 pounds. Make sure you land on the Part 107 dashboard and not the recreational one; the two registration types are not interchangeable.",
    details: [
      "13 or older, U.S. citizen or legal permanent resident for a full registration certificate",
      "Foreign operators receive a recognition of ownership instead",
      "Business registrations can be made in a company name",
    ],
    link: { url: DRONEZONE_URL, label: "Open FAA DroneZone" },
  },
  {
    icon: ClipboardList,
    title: "Register Each Drone Individually",
    duration: "5 minutes per drone",
    cost: "$5 per drone, 3 years",
    description:
      "Unlike recreational registration, Part 107 assigns a unique registration number to every aircraft. Each drone gets its own $5 fee and its own 3-year expiration date.",
    details: [
      "Enter make, model, and serial number for every aircraft",
      "Answer 'Yes' to Remote ID and enter the Standard Remote ID serial number",
      "Using a broadcast module? It is registered as its own device with its own number",
      "Track expiration dates per airframe; they will drift apart as you add aircraft",
    ],
    link: { url: DRONEZONE_URL, label: "Register at DroneZone" },
  },
  {
    icon: Tag,
    title: "Mark Each Airframe",
    duration: "5 minutes per drone",
    cost: "Free to $10 (label)",
    description:
      "Each drone carries its own FA number on an external surface, readable without tools. On a commercial fleet, a consistent label placement makes ramp checks painless.",
    details: [
      "External surface only; battery compartments no longer qualify",
      "Match the number to the specific airframe, not a shared fleet number",
      "Engraved plates or laminated labels survive weather and handling",
    ],
    link: {
      url: "https://www.faa.gov/sites/faa.gov/files/uas/recreational_fliers/UAS_how_to_label_Infographic.pdf",
      label: "FAA Labeling Guide (PDF)",
    },
  },
  {
    icon: Radio,
    title: "Verify Remote ID Compliance",
    duration: "10 minutes",
    cost: "Free to $150 (module)",
    description:
      "Every registered drone must broadcast Remote ID unless it is flying inside an FAA-Recognized Identification Area. Check your model against the FAA's Declaration of Compliance list before you fly a paid job.",
    details: [
      "Standard Remote ID: built into the aircraft, broadcasts drone and controller location",
      "Broadcast module: add-on for older aircraft, requires visual line of sight at all times",
      "Only manufacturers can submit a Declaration of Compliance; do not file one yourself",
      "Update DroneZone when you swap a module or upgrade firmware to Standard Remote ID",
    ],
    link: {
      url: "https://uasdoc.faa.gov/listDocs?docType=rid&status=accepted",
      label: "Check the FAA Compliance List",
    },
  },
  {
    icon: FileText,
    title: "Carry Your Credentials on Every Job",
    duration: "Ongoing",
    cost: "Free",
    description:
      "A ramp check from the FAA or local police is rare, but it happens. Have everything on your phone or in your case.",
    details: [
      "Remote Pilot Certificate (or temporary certificate)",
      "Registration certificate for the specific drone you are flying",
      "Your most recent recurrent training completion certificate",
      "Any active LAANC authorization or waiver for the airspace you are in",
    ],
  },
  {
    icon: RefreshCw,
    title: "Renew Registration and Stay Current",
    duration: "5 minutes + 2 hours",
    cost: "$5 per drone",
    description:
      "Two clocks run in parallel. Each drone's registration expires every 3 years, and your own knowledge currency expires every 24 calendar months. Letting either lapse grounds you.",
    details: [
      "Registration: renew each drone at DroneZone before its expiration",
      "Currency: complete ALC-677 (or ALC-515 for Part 61 pilots) every 24 calendar months",
      "Your certificate never expires, but flying without current training is a violation",
    ],
    link: {
      url: "https://www.faasafety.gov/gslac/ALC/CourseLanding.aspx?cID=677",
      label: "Take ALC-677 (Free)",
    },
  },
];

interface WeightClass {
  icon: typeof Plane;
  range: string;
  title: string;
  recreational: { required: boolean; text: string };
  commercial: { required: boolean; text: string };
  note: string;
}

const weightClasses: WeightClass[] = [
  {
    icon: Sparkles,
    range: "Under 250 g",
    title: "Micro Drones",
    recreational: {
      required: false,
      text: "Exempt from registration and Remote ID. TRUST is still required.",
    },
    commercial: {
      required: true,
      text: "Must be registered and Remote ID compliant like any other aircraft.",
    },
    note: "Weigh it with the battery and every accessory attached. A 249 g drone with prop guards is usually over the line.",
  },
  {
    icon: Plane,
    range: "250 g to 55 lb",
    title: "Standard Small UAS",
    recreational: {
      required: true,
      text: "One $5 registration covers your whole fleet for 3 years.",
    },
    commercial: {
      required: true,
      text: "$5 per drone, each with its own number and 3-year expiration.",
    },
    note: "Register online at FAA DroneZone under 14 CFR Part 48. This is where nearly every consumer and prosumer drone lands.",
  },
  {
    icon: Weight,
    range: "55 lb and over",
    title: "Large UAS",
    recreational: {
      required: true,
      text: "Paper registration under Part 47 with an N-number.",
    },
    commercial: {
      required: true,
      text: "Paper registration under Part 47, plus Part 107 does not apply. You need a waiver or exemption to fly.",
    },
    note: "Mailed application (AC Form 8050-1), notarized affidavit, and a $5 fee. Expect several weeks to a few months for processing.",
  },
];

interface RemoteIdOption {
  icon: typeof Plane;
  title: string;
  who: string;
  text: string;
  caveat: string;
}

const remoteIdOptions: RemoteIdOption[] = [
  {
    icon: Radar,
    title: "Standard Remote ID",
    who: "Most drones made after late 2022",
    text: "Built-in broadcast of the drone's serial number, location, altitude, velocity, and the control station location.",
    caveat: "Verify your model on the FAA Declaration of Compliance list. Some need a firmware update.",
  },
  {
    icon: Radio,
    title: "Broadcast Module",
    who: "Older aircraft and home builds",
    text: "A small add-on transmitter that broadcasts the drone's serial number, location, and takeoff point.",
    caveat: "The drone must stay within visual line of sight at all times. Register the module's serial number in DroneZone.",
  },
  {
    icon: MapPinned,
    title: "Fly in a FRIA",
    who: "Flyers without any Remote ID equipment",
    text: "An FAA-Recognized Identification Area is a mapped zone, usually a model aircraft field, where non-broadcasting drones may fly.",
    caveat: "Only FAA-recognized community organizations and schools can establish one. Visual line of sight required.",
  },
];

interface CurrencyRequirement {
  icon: typeof Plane;
  code: string;
  title: string;
  audience: string;
  frequency: string;
  cost: string;
  format: string;
  where: { url: string; label: string };
  why: string;
  details: string[];
}

const currencyRequirements: CurrencyRequirement[] = [
  {
    icon: Gamepad2,
    code: "TRUST",
    title: "The Recreational UAS Safety Test",
    audience: "Every recreational flyer, any drone weight",
    frequency: "Once. Never expires.",
    cost: "Free",
    format: "Online, roughly 20 to 30 minutes, untimed",
    where: {
      url: "https://www.faa.gov/uas/recreational_flyers/knowledge_test_updates",
      label: "FAA-approved administrators",
    },
    why: "Congress wrote the requirement into 49 U.S.C. 44809, the same law that lets you fly for fun without a Part 107 certificate. It exists to make sure hobby pilots know the basic airspace rules before their first flight.",
    details: [
      "Mix of short lessons and multiple-choice questions",
      "Wrong answers can be corrected until you reach 100%",
      "The administrator issues a certificate; the FAA and the administrator keep no record",
      "Lose the certificate and you retake the test (it is free, so no real harm done)",
    ],
  },
  {
    icon: ShieldCheck,
    code: "ALC-677",
    title: "Part 107 Small UAS Recurrent",
    audience: "Every Part 107 certificate holder",
    frequency: "Every 24 calendar months",
    cost: "Free",
    format: "Online at FAASafety.gov, about 2 hours, self-paced",
    where: {
      url: "https://www.faasafety.gov/gslac/ALC/CourseLanding.aspx?cID=677",
      label: "Take ALC-677 at FAASafety.gov",
    },
    why: "Your Remote Pilot Certificate never expires, but the privilege to exercise it does. Part 107.65 requires recent aeronautical knowledge, and since April 2021 this free course replaced the paid in-person recurrent test.",
    details: [
      "Covers regulation changes, night operations, operations over people, and Remote ID",
      "Ends with an open-book multiple-choice knowledge check with unlimited retries",
      "Download the completion certificate and keep it with your flight records",
      "Currency runs to the end of the 24th calendar month after completion, not the exact date",
    ],
  },
  {
    icon: Plane,
    code: "ALC-515",
    title: "Part 107 Recurrent for Part 61 Pilots",
    audience: "Part 107 holders who also hold a Part 61 certificate with a current flight review",
    frequency: "Every 24 calendar months",
    cost: "Free",
    format: "Online at FAASafety.gov, shorter than ALC-677",
    where: {
      url: "https://www.faasafety.gov/gslac/ALC/CourseLanding.aspx?cID=515",
      label: "Take ALC-515 at FAASafety.gov",
    },
    why: "Manned pilots already cover airspace, weather, and regulations in their flight review, so the FAA trimmed the drone-specific recurrent course to what is unique to Part 107.",
    details: [
      "Your flight review must be current under 14 CFR 61.56 to qualify",
      "If your flight review lapses, take ALC-677 instead",
      "Same 24-calendar-month clock as ALC-677",
      "Keep both your flight review endorsement and course certificate together",
    ],
  },
];

const trustAdministrators = [
  { name: "Pilot Institute", url: "https://trust.pilotinstitute.com/", popular: true },
  { name: "UAV Coach", url: "https://uavcoach.com/faa-recreational-drone-training/", popular: true },
  { name: "Academy of Model Aeronautics (AMA)", url: "https://trust.modelaircraft.org/", popular: true },
  { name: "Drone Trust", url: "https://dronetrust.com/faa-trust/", popular: false },
  { name: "Embry-Riddle Aeronautical University", url: "https://webforms.erau.edu/public/faa-trust/", popular: false },
  { name: "Boy Scouts of America", url: "https://www.scouting.org/the-recreational-uas-safety-test/", popular: false },
  { name: "CrossFlight Sky Solutions", url: "https://my.crossflightskysolutions.com/faa-trust/", popular: false },
  { name: "Proctorio", url: "https://proctorio.com/faa/trust", popular: false },
  { name: "Robotics Education & Competition Foundation", url: "http://recf.org/trust", popular: false },
  { name: "Tactical Aviation", url: "https://www.tacavpro.com/trust/", popular: false },
  { name: "HSU Foundation", url: "https://trust.hsu-foundation.org/", popular: false },
  { name: "University of Arizona Global Campus", url: "https://www.uagc.edu/partnerships/corporate/faa-trust", popular: false },
  { name: "Chippewa Valley Technical College", url: "https://www.cvtc.edu/academics/certificates/aviation/faa-approved-ta-trust", popular: false },
  { name: "Community College of Allegheny County", url: "https://trust.turbine.us.com/", popular: false },
  { name: "Lake Area Technical College", url: "https://www.lakeareatech.edu/corporate-education/customized-industry-training/aviation-drone-training/the-recreational-uas-safety-test-trust/", popular: false },
  { name: "Pasco-Hernando State College", url: "https://phsc.edu/faa-trust", popular: false },
];

const officialResources = [
  {
    url: DRONEZONE_URL,
    label: "FAA DroneZone",
    desc: "Register, renew, manage your inventory, and add Remote ID serial numbers.",
  },
  {
    url: "https://www.faa.gov/uas/getting_started/register_drone",
    label: "FAA: How to Register Your Drone",
    desc: "The official rules, fees, and eligibility for both flyer types.",
  },
  {
    url: "https://www.faa.gov/uas/getting_started/remote_id",
    label: "FAA: Remote ID",
    desc: "Compliance options, FRIA map, and DroneZone instructions for adding modules.",
  },
  {
    url: "https://uasdoc.faa.gov/listDocs?docType=rid&status=accepted",
    label: "Remote ID Declaration of Compliance List",
    desc: "Search your drone or module to confirm it is FAA-accepted.",
  },
  {
    url: "https://www.faa.gov/uas/recreational_flyers",
    label: "FAA: Recreational Flyers",
    desc: "The full rule set for flying under the 44809 exception.",
  },
  {
    url: "https://www.faasafety.gov/",
    label: "FAASafety.gov",
    desc: "Home of ALC-677 and ALC-515 recurrent courses.",
  },
  {
    url: "https://www.faa.gov/uas/getting_started/user_identification_tool",
    label: "FAA User Identification Tool",
    desc: "Not sure which rules apply to you? The FAA has a short quiz for that.",
  },
  {
    url: "https://www.faa.gov/licenses_certificates/aircraft_certification/aircraft_registry/ua",
    label: "FAA: Registering Drones Over 55 lb",
    desc: "The Part 47 paper process, forms, and affidavit requirements.",
  },
];

const FlyerToggle = ({
  selected,
  onChange,
}: {
  selected: FlyerType;
  onChange: (f: FlyerType) => void;
}) => {
  const handleSelect = (flyer: FlyerType) => {
    onChange(flyer);
    trackEvent("drone_registration_flyer_select", {
      event_category: "engagement",
      event_label: flyer,
      flyer_type: flyer,
    });
  };

  const options: {
    key: FlyerType;
    icon: typeof Plane;
    eyebrow: string;
    title: string;
    text: string;
  }[] = [
    {
      key: "recreational",
      icon: Gamepad2,
      eyebrow: "Flying for Fun",
      title: "Recreational Flyer",
      text: "Personal enjoyment only. One registration covers all your drones, and TRUST is your only test.",
    },
    {
      key: "part107",
      icon: Briefcase,
      eyebrow: "Flying for Work",
      title: "Part 107 Commercial",
      text: "Any business, client, or goodwill purpose. Every drone registers individually and you recertify every 24 months.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
      {options.map((opt) => {
        const active = selected === opt.key;
        const Icon = opt.icon;
        return (
          <button
            key={opt.key}
            onClick={() => handleSelect(opt.key)}
            className={`group relative text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
              active
                ? "border-primary bg-primary/10"
                : "border-border bg-card/50 hover:border-primary/40"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      active ? "bg-primary/20" : "bg-primary/10"
                    }`}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {opt.eyebrow}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1">{opt.title}</h3>
                <p className="text-sm text-muted-foreground">{opt.text}</p>
              </div>
              <ChevronRight
                className={`h-5 w-5 transition-all ${
                  active
                    ? "text-primary translate-x-1"
                    : "text-muted-foreground"
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};

const StepLink = ({ link }: { link: NonNullable<Step["link"]> }) => {
  const className =
    "inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors";
  if (link.url.startsWith("/")) {
    return (
      <Link to={link.url} className={className}>
        {link.label}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    );
  }
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackOutboundLink(link.url, link.label)}
      className={className}
    >
      {link.label}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
};

const StepCard = ({ step, index }: { step: Step; index: number }) => {
  const Icon = step.icon;
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${Math.min(index * 60, 300)}ms` }}
    >
      <SpotlightCard
        className="!p-0 !rounded-2xl !bg-card/60 !border-border"
        spotlightColor="rgba(230, 179, 37, 0.15)"
      >
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-5">
            <div className="flex md:flex-col items-center gap-4 md:gap-3 md:w-20 shrink-0">
              <div className="relative">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full gradient-primary text-xs font-bold text-primary-foreground flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                {step.title}
              </h3>

              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  {step.duration}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <DollarSign className="h-3.5 w-3.5 text-primary" />
                  {step.cost}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                {step.description}
              </p>

              <ul className="space-y-2 mb-4">
                {step.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground/85"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {step.link && <StepLink link={step.link} />}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

const FlyerSummary = ({ flyer }: { flyer: FlyerType }) => {
  const summary =
    flyer === "recreational"
      ? {
          title: "Recreational Registration",
          intro:
            "Flying purely for fun under the Exception for Limited Recreational Operations. You register once, apply one number to every drone you own, and take a single free safety test that never expires.",
          stats: [
            { label: "Cost", value: "$5 total" },
            { label: "Valid For", value: "3 years" },
            { label: "Recurrency", value: "TRUST, once" },
          ],
          steps: recreationalSteps.length,
        }
      : {
          title: "Part 107 Registration",
          intro:
            "Flying for any business or goodwill purpose under 14 CFR Part 107. Every drone registers on its own number regardless of weight, and you complete free online recurrent training every 24 calendar months to keep your certificate usable.",
          stats: [
            { label: "Cost", value: "$5 / drone" },
            { label: "Valid For", value: "3 years" },
            { label: "Recurrency", value: "24 months" },
          ],
          steps: part107Steps.length,
        };

  return (
    <div className="max-w-4xl mx-auto mb-10">
      <GlassCube
        className="w-full"
        wobbleAngle={flyer === "recreational" ? 0 : 1.5}
      >
        <div className="p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
            {summary.title}
          </span>
          <p className="text-foreground/90 leading-relaxed mb-6">
            {summary.intro}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Steps
              </div>
              <div className="text-2xl font-bold text-gradient">
                {summary.steps}
              </div>
            </div>
            {summary.stats.map((s) => (
              <div key={s.label}>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {s.label}
                </div>
                <div className="text-2xl font-bold text-gradient">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCube>
    </div>
  );
};

const RequirementPill = ({
  required,
  label,
}: {
  required: boolean;
  label: string;
}) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
      required
        ? "bg-primary/15 text-primary"
        : "bg-muted text-muted-foreground"
    }`}
  >
    {required ? (
      <CheckCircle2 className="h-3.5 w-3.5" />
    ) : (
      <XCircle className="h-3.5 w-3.5" />
    )}
    {label}
  </span>
);

const WeightClassCard = ({
  wc,
  index,
  flyer,
}: {
  wc: WeightClass;
  index: number;
  flyer: FlyerType;
}) => {
  const Icon = wc.icon;
  return (
    <GlassCube className="h-full" wobbleAngle={(index / 3) * Math.PI * 2}>
      <div className="p-7 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            {wc.range}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-4">{wc.title}</h3>

        <div className="space-y-4 mb-5">
          <div
            className={`rounded-xl p-3 border transition-colors ${
              flyer === "recreational"
                ? "border-primary/40 bg-primary/5"
                : "border-border/60 bg-card/30"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold text-muted-foreground">
                Recreational
              </span>
              <RequirementPill
                required={wc.recreational.required}
                label={wc.recreational.required ? "Register" : "Exempt"}
              />
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed">
              {wc.recreational.text}
            </p>
          </div>
          <div
            className={`rounded-xl p-3 border transition-colors ${
              flyer === "part107"
                ? "border-primary/40 bg-primary/5"
                : "border-border/60 bg-card/30"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold text-muted-foreground">
                Part 107
              </span>
              <RequirementPill
                required={wc.commercial.required}
                label={wc.commercial.required ? "Register" : "Exempt"}
              />
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed">
              {wc.commercial.text}
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mt-auto">
          {wc.note}
        </p>
      </div>
    </GlassCube>
  );
};

const CurrencyCard = ({
  req,
  index,
  highlighted,
}: {
  req: CurrencyRequirement;
  index: number;
  highlighted: boolean;
}) => {
  const Icon = req.icon;
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${Math.min(index * 80, 240)}ms` }}
    >
      <SpotlightCard
        className={`!p-0 !rounded-2xl !bg-card/60 ${
          highlighted ? "!border-primary/50" : "!border-border"
        }`}
        spotlightColor="rgba(230, 179, 37, 0.15)"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block">
                  {req.code}
                </span>
                <h3 className="text-lg md:text-xl font-bold leading-tight">
                  {req.title}
                </h3>
              </div>
            </div>
            {highlighted && (
              <span className="shrink-0 rounded-full bg-primary/15 text-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider">
                Your path
              </span>
            )}
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mb-5">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                Who
              </dt>
              <dd className="text-foreground/90">{req.audience}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                How Often
              </dt>
              <dd className="text-foreground/90">{req.frequency}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                Cost
              </dt>
              <dd className="text-foreground/90">{req.cost}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                Format
              </dt>
              <dd className="text-foreground/90">{req.format}</dd>
            </div>
          </dl>

          <div className="rounded-xl border border-border/60 bg-card/40 p-4 mb-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
              Why it exists
            </span>
            <p className="text-sm text-foreground/85 leading-relaxed">
              {req.why}
            </p>
          </div>

          <ul className="space-y-2 mb-5">
            {req.details.map((d, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground/85"
              >
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <a
            href={req.where.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundLink(req.where.url, req.where.label)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
          >
            {req.where.label}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </SpotlightCard>
    </div>
  );
};

const DroneRegistration = () => {
  usePageTitle("Drone Registration & Recurrency Guide");
  const [flyer, setFlyer] = useState<FlyerType>("recreational");

  const steps = flyer === "recreational" ? recreationalSteps : part107Steps;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
        <div
          className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full blur-orb"
          style={{ background: "hsl(43 84% 55% / 0.15)" }}
        />
        <div
          className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] rounded-full blur-orb"
          style={{ background: "hsl(38 90% 50% / 0.10)" }}
        />
      </div>

      <main className="pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-4 block">
              Registration & Recurrency Guide
            </span>
            <ScrollFloat
              containerClassName="mb-4"
              textClassName="text-5xl md:text-6xl font-bold"
            >
              Stay Legal, Stay Current
            </ScrollFloat>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <BlurText
                text="FAA drone registration, Remote ID, TRUST, and recurrent training explained"
                delay={400}
                duration={1000}
                className="text-gradient"
              />
            </p>
          </div>

          {/* Intro */}
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Getting a certificate is only half the paperwork. The aircraft
              itself has to be registered, it has to broadcast Remote ID, and
              you have to prove you still know the rules on a schedule the FAA
              sets. What that looks like depends entirely on why you fly. Pick
              your flyer type and we will tailor the rest of the page.
            </p>
          </div>

          {/* Flyer Toggle */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Why Do You Fly?
              </span>
            </div>
            <FlyerToggle selected={flyer} onChange={setFlyer} />
          </div>

          {/* Summary */}
          <FlyerSummary flyer={flyer} />

          {/* Weight classes */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                Do I Need to Register?
              </span>
              <ScrollFloat
                containerClassName="mb-4"
                textClassName="text-4xl md:text-5xl font-bold"
              >
                It Depends on Weight and Purpose
              </ScrollFloat>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The FAA draws two lines: 250 grams and 55 pounds. Where your
                drone lands, combined with why you are flying it, decides
                whether and how you register. Your selected flyer type is
                highlighted below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {weightClasses.map((wc, i) => (
                <WeightClassCard
                  key={wc.range}
                  wc={wc}
                  index={i}
                  flyer={flyer}
                />
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-8 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
              <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/85 leading-relaxed">
                <span className="font-semibold">Registrations do not cross over.</span>{" "}
                A drone registered as recreational cannot be flown under Part
                107, and the FAA will not convert one to the other. If you do
                both, you register the same aircraft twice, once on each
                dashboard, and mark it with the Part 107 number.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="text-center mb-12">
            <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
              The Process
            </span>
            <ScrollFloat
              containerClassName="mb-0"
              textClassName="text-4xl md:text-5xl font-bold"
            >
              {flyer === "recreational"
                ? "Recreational Registration"
                : "Part 107 Registration"}
            </ScrollFloat>
          </div>

          <div className="max-w-4xl mx-auto space-y-5 mb-24">
            {steps.map((step, i) => (
              <StepCard key={`${flyer}-${i}`} step={step} index={i} />
            ))}
          </div>

          {/* Remote ID */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                Required Since September 2023
              </span>
              <ScrollFloat
                containerClassName="mb-4"
                textClassName="text-4xl font-bold"
              >
                Remote ID: Three Ways to Comply
              </ScrollFloat>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Think of it as a digital license plate. If your drone is
                required to be registered, it is required to broadcast Remote
                ID. Sub-250 g recreational drones are the only exception.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {remoteIdOptions.map((opt, i) => (
                <GlassCube
                  key={opt.title}
                  className="h-full"
                  wobbleAngle={(i / 3) * Math.PI * 2 + 0.7}
                >
                  <div className="p-7 flex flex-col h-full space-y-4">
                    <div className="p-3 rounded-lg bg-primary/10 w-fit">
                      <opt.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{opt.title}</h3>
                      <span className="text-xs text-primary font-medium">
                        {opt.who}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {opt.text}
                    </p>
                    <p className="text-xs text-foreground/70 leading-relaxed border-t border-border/60 pt-3 mt-auto">
                      {opt.caveat}
                    </p>
                  </div>
                </GlassCube>
              ))}
            </div>
          </div>

          {/* Recurrency */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                Recurrency & Testing
              </span>
              <ScrollFloat
                containerClassName="mb-4"
                textClassName="text-4xl md:text-5xl font-bold"
              >
                Proving You Still Know the Rules
              </ScrollFloat>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                There are three FAA knowledge requirements for drone pilots
                after the initial certificate, and every one of them is free.
                Which one applies to you depends on how you fly and whether
                you also hold a manned pilot certificate.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {currencyRequirements.map((req, i) => (
                <CurrencyCard
                  key={req.code}
                  req={req}
                  index={i}
                  highlighted={
                    flyer === "recreational"
                      ? req.code === "TRUST"
                      : req.code === "ALC-677"
                  }
                />
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-8 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
              <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/85 leading-relaxed">
                <span className="font-semibold">Calendar months, not days.</span>{" "}
                Finish ALC-677 on the 8th of a month and you are current
                through the last day of that same month two years later. Set a
                reminder for the month before it lapses. A lapsed certificate
                holder is not fined for the lapse itself, but flying before
                retaking the course is a Part 107 violation.
              </p>
            </div>
          </div>

          {/* TRUST administrators */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="text-center mb-10">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                Where to Take TRUST
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                FAA-Approved Test Administrators
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The FAA writes the test but does not host it. Any of these
                organizations will give you the same content and an identical
                certificate. If a site charges for TRUST, it is not one of
                them.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trustAdministrators.map((ta) => (
                <a
                  key={ta.url}
                  href={ta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundLink(ta.url, `TRUST: ${ta.name}`)}
                  className="group flex items-center justify-between gap-3 p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <GraduationCap className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {ta.name}
                    </span>
                    {ta.popular && (
                      <span className="hidden sm:inline-block shrink-0 rounded-full bg-primary/15 text-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </a>
              ))}
            </div>

            <p className="text-xs text-muted-foreground/70 text-center mt-6 max-w-2xl mx-auto">
              List sourced from the FAA's official TRUST page. LevoAir is not
              affiliated with any of these administrators and does not receive
              compensation for these listings.
            </p>
          </div>

          {/* Resources */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="text-center mb-10">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                Official Resources
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Bookmark These</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {officialResources.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundLink(r.url, r.label)}
                  className="group block p-5 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {r.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {r.desc}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Related guide */}
          <div className="max-w-4xl mx-auto mb-24">
            <Link
              to="/drone-license-guide"
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground block mb-1">
                    Related Guide
                  </span>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    How to Get Your Part 107 Remote Pilot Certificate
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Registration gets the drone legal. This gets you legal.
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          </div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto">
            <Card className="p-10 md:p-14 text-center border-primary/20 bg-card/60 backdrop-blur-md">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                Rather Not Manage Any of This?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Pilots Come Registered, Current, and Insured.
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                LevoAir contract pilots fly registered, Remote ID compliant
                aircraft with current Part 107 recurrent training. You get the
                footage and the data. We handle the FAA.
              </p>
              <Button
                asChild
                className="gradient-primary font-semibold"
                size="lg"
              >
                <Link to="/contact">Hire a Pilot</Link>
              </Button>
            </Card>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground/70 text-center mt-12 max-w-3xl mx-auto leading-relaxed">
            Information on this page is provided as a general guide and may
            change as the FAA updates its regulations, fees, and procedures.
            Always verify current requirements directly with the FAA before
            relying on them for registration or flight operations.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DroneRegistration;
