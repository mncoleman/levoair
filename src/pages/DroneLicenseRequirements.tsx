import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import {
  Plane,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Home as HomeIcon,
  Camera,
  Building2,
  Youtube,
  HeartHandshake,
  Warehouse,
  Trees,
  Users,
  Mountain,
  Gauge,
  Eye,
  Moon,
  MapPinned,
  FileWarning,
  Scale,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { SITE, organizationSchema, breadcrumbSchema } from "@/lib/site";
import ScrollFloat from "@/components/ScrollFloat";
import { BlurText } from "@/components/ui/BlurText";
import GlassCube from "@/components/ui/GlassCube";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { trackEvent, trackOutboundLink } from "@/lib/analytics";

type Purpose = "recreational" | "part107" | "unsure";
type Verdict = "required" | "not-required" | "gray";

const ecfr = (section: string) =>
  `https://www.ecfr.gov/current/title-14/section-${section}`;

const PART_107_URL =
  "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107";
const USC_44809_URL = "https://www.law.cornell.edu/uscode/text/49/44809";

interface RegLink {
  url: string;
  label: string;
}

interface Scenario {
  icon: typeof Plane;
  title: string;
  verdict: Verdict;
  text: string;
}

interface Faq {
  q: string;
  a: string[];
  regs?: RegLink[];
}

interface FaqGroup {
  key: string;
  eyebrow: string;
  title: string;
  faqs: Faq[];
}

interface Limit {
  icon: typeof Plane;
  label: string;
  text: string;
  reg: RegLink;
}

const scenarios: Scenario[] = [
  {
    icon: Building2,
    title: "A roofing company inspecting a customer's roof",
    verdict: "required",
    text: "The flight supports a business, so it falls under Part 107. Whoever flies needs a Remote Pilot Certificate, even if the inspection itself is free.",
  },
  {
    icon: Camera,
    title: "A real estate agent shooting listing photos",
    verdict: "required",
    text: "Marketing a property you are paid to sell is business use. This is one of the most common reasons people get fined.",
  },
  {
    icon: Youtube,
    title: "Filming for a monetized YouTube or social channel",
    verdict: "required",
    text: "If the footage is meant to earn money or promote a business, treat it as Part 107. Posting a vacation video you shot for fun is fine.",
  },
  {
    icon: HeartHandshake,
    title: "Volunteering photos for a church or nonprofit",
    verdict: "required",
    text: "Unpaid does not mean recreational. Flying for an organization, or in exchange for goodwill, is still Part 107.",
  },
  {
    icon: Warehouse,
    title: "A farmer checking crops or fences",
    verdict: "required",
    text: "Using a drone to run a farm is a business purpose. The same flight over a backyard garden kept for fun would be recreational.",
  },
  {
    icon: HomeIcon,
    title: "Checking your own roof after a storm",
    verdict: "gray",
    text: "Recreational means purely for fun, and a roof check is a chore, not a hobby. If an insurance claim or contractor is involved, play it safe and fly under Part 107.",
  },
  {
    icon: Trees,
    title: "Flying at the park on a Saturday",
    verdict: "not-required",
    text: "No license needed. You do need the free TRUST test, and registration if the drone weighs 250 grams or more.",
  },
  {
    icon: Mountain,
    title: "Vacation footage just for your family",
    verdict: "not-required",
    text: "Purely recreational. Follow the recreational rules, and check local and park rules before launching.",
  },
];

const faqGroups: FaqGroup[] = [
  {
    key: "most-asked",
    eyebrow: "The Questions We Get Most",
    title: "Business, Personal, and the Neighbor's House",
    faqs: [
      {
        q: "We're a business. Do we need a license to fly drones?",
        a: [
          "Yes. Any flight that supports a business, even one where the drone work is free, falls under the FAA's Part 107 rules, and the person at the controls must hold a Remote Pilot Certificate (often called a 'drone license').",
          "The license belongs to the person, not the company. There is no FAA license for the business itself. If three employees will fly, all three need their own certificate, or one certified pilot must directly supervise and be able to take over the controls immediately.",
          "Each drone the business flies must also be registered with the FAA ($5 per drone, good for 3 years) and broadcast Remote ID.",
        ],
        regs: [
          { url: ecfr("107.12"), label: "14 CFR 107.12: Certificate required" },
          { url: ecfr("107.13"), label: "14 CFR 107.13: Registration" },
        ],
      },
      {
        q: "Does it matter if I'm flying for business or personal use?",
        a: [
          "That is the whole question. The FAA splits drone flying into two categories based on why you fly, not how big the drone is or whether you get paid.",
          "Recreational flying is purely for fun or personal enjoyment. No license is required, just a free online safety test (TRUST) and registration for drones 250 grams or heavier.",
          "Everything else, including business use, client work, volunteering for an organization, or flights that promote a company, is Part 107 and needs a licensed pilot. If you are not sure, the safe answer is Part 107.",
        ],
        regs: [
          { url: USC_44809_URL, label: "49 U.S.C. 44809: Recreational exception" },
          { url: ecfr("107.1"), label: "14 CFR 107.1: Who Part 107 applies to" },
        ],
      },
      {
        q: "Can I fly over someone else's house?",
        a: [
          "Federally, yes. The FAA controls the airspace, and no federal rule bans flying over a house or private property. The rule that matters is about people: a Part 107 pilot generally cannot fly over people who are out in the open and not involved in the flight. People inside a house are under a covered structure, so passing over a roof is allowed.",
          "Where it gets tricky is state and local law. Many states have drone privacy, trespass, or surveillance laws, and some cities restrict where you can take off and land. Taking off from someone's yard without permission is trespassing, no matter what the FAA says.",
          "For roof inspections the practical answer is simple: get the homeowner's permission in writing, stay over their property, and avoid pointing the camera into neighbors' yards or windows.",
        ],
        regs: [
          { url: ecfr("107.39"), label: "14 CFR 107.39: Operations over people" },
          { url: ecfr("107.19"), label: "14 CFR 107.19: Pilot responsibility" },
        ],
      },
    ],
  },
  {
    key: "licensing",
    eyebrow: "Getting Licensed",
    title: "Who Needs It and What It Takes",
    faqs: [
      {
        q: "What exactly is a 'drone license'?",
        a: [
          "The official name is a Remote Pilot Certificate with a small UAS rating, issued under Part 107. You earn it by passing a 60-question multiple choice test at an FAA-approved testing center, then completing a short application online.",
          "It does not expire, but you must complete a free online refresher course every 24 calendar months to keep using it.",
        ],
        regs: [
          { url: ecfr("107.61"), label: "14 CFR 107.61: Eligibility" },
          { url: ecfr("107.65"), label: "14 CFR 107.65: Staying current" },
        ],
      },
      {
        q: "How much does it cost and how long does it take?",
        a: [
          "The knowledge test costs about $175 at the testing center. Most people study for one to three weeks using free FAA materials or an online course. After you pass, the certificate typically arrives within a few weeks, and you can fly with the temporary certificate before then.",
          "Our step-by-step license guide walks through the whole process.",
        ],
      },
      {
        q: "How old do you have to be?",
        a: [
          "16 for a Part 107 Remote Pilot Certificate. There is no minimum age for recreational flying, though a parent or guardian must register the drone for anyone under 13.",
        ],
        regs: [{ url: ecfr("107.61"), label: "14 CFR 107.61: Eligibility" }],
      },
      {
        q: "My drone is tiny (under 250 grams). Do I still need a license for business use?",
        a: [
          "Yes. The 250-gram line only affects registration for recreational flyers. For business use, the pilot needs a certificate and the drone must be registered no matter how small it is.",
        ],
        regs: [
          { url: ecfr("48.15"), label: "14 CFR 48.15: Registration required" },
        ],
      },
      {
        q: "Can an unlicensed employee fly if a licensed pilot is there?",
        a: [
          "Yes, with conditions. A person without a certificate can operate the controls only while directly supervised by a certified Remote Pilot in Command who can immediately take over. In practice that means standing side by side, often with a second controller or the ability to grab the one in use.",
        ],
        regs: [{ url: ecfr("107.12"), label: "14 CFR 107.12(a)(2): Supervised operation" }],
      },
      {
        q: "Do I need insurance?",
        a: [
          "The FAA does not require it. Clients, property managers, and general contractors almost always do, and most general liability policies exclude aircraft, drones included. If you are flying for a business, ask your agent about an aviation or drone liability policy before your first job.",
        ],
      },
      {
        q: "What happens if I fly commercially without a license?",
        a: [
          "The FAA can issue civil penalties that reach into the tens of thousands of dollars per violation, and it does act on complaints and online footage. An unlicensed commercial flight can also void your insurance if something goes wrong.",
        ],
      },
    ],
  },
  {
    key: "flying",
    eyebrow: "Where and How You Can Fly",
    title: "The Rules in Plain English",
    faqs: [
      {
        q: "How high can I fly?",
        a: [
          "400 feet above the ground for most flights. Part 107 pilots may go higher only when flying within 400 feet of a structure, such as a tower or tall building, and no more than 400 feet above its top.",
        ],
        regs: [{ url: ecfr("107.51"), label: "14 CFR 107.51: Altitude and speed limits" }],
      },
      {
        q: "Do I have to keep the drone in sight?",
        a: [
          "Yes, with your own eyes (glasses are fine, binoculars are not). Watching the video feed on your controller does not count. A visual observer can help you, but the pilot is still responsible.",
        ],
        regs: [{ url: ecfr("107.31"), label: "14 CFR 107.31: Visual line of sight" }],
      },
      {
        q: "Can I fly near an airport?",
        a: [
          "Often, yes, with permission. Most airports sit in controlled airspace, and you need FAA authorization before flying there. For many locations that approval comes instantly through LAANC in apps like Aloft or Autel Explorer. Recreational flyers need authorization in the same airspace.",
        ],
        regs: [{ url: ecfr("107.41"), label: "14 CFR 107.41: Controlled airspace" }],
      },
      {
        q: "Can I fly at night?",
        a: [
          "Yes. Part 107 pilots can fly at night if their training is current and the drone has anti-collision lighting visible for 3 statute miles. Recreational flyers also need lighting that makes the drone visible.",
        ],
        regs: [{ url: ecfr("107.29"), label: "14 CFR 107.29: Night operations" }],
      },
      {
        q: "Can I fly over people, cars, or crowds?",
        a: [
          "Only in limited ways. Flying over people who are not part of your operation depends on the drone's FAA category, and flying over open-air crowds requires Remote ID plus specific approvals. People inside buildings or stationary cars are protected by the structure, so flying over them is allowed. Flying over moving vehicles has its own rules.",
        ],
        regs: [
          { url: ecfr("107.39"), label: "14 CFR 107.39: Over people" },
          { url: ecfr("107.145"), label: "14 CFR 107.145: Over moving vehicles" },
        ],
      },
      {
        q: "Are there places I can never fly?",
        a: [
          "Several. Launching or landing in national parks is prohibited. Temporary flight restrictions go up around stadiums during events, wildfires, and VIP visits. Military bases, prisons, and some critical infrastructure are also off limits. Check the FAA's B4UFLY tools or a LAANC app before every flight.",
        ],
      },
      {
        q: "Do I need a license to fly indoors?",
        a: [
          "No. The FAA regulates the outdoor airspace, so flights fully inside a building, such as a warehouse inventory scan, are not covered by Part 107. Get the building owner's permission and mind your liability.",
        ],
      },
      {
        q: "What if something goes wrong?",
        a: [
          "Part 107 pilots must report an accident to the FAA within 10 calendar days if anyone is seriously injured or knocked unconscious, or if it causes more than $500 in damage to property other than the drone.",
        ],
        regs: [{ url: ecfr("107.9"), label: "14 CFR 107.9: Safety event reporting" }],
      },
    ],
  },
];

const limits: Limit[] = [
  {
    icon: Mountain,
    label: "Maximum Altitude",
    text: "400 feet above ground level. Higher is allowed only within 400 feet of a taller structure, and no more than 400 feet above its top.",
    reg: { url: ecfr("107.51"), label: "107.51" },
  },
  {
    icon: Gauge,
    label: "Maximum Speed",
    text: "100 miles per hour (87 knots) ground speed. Few consumer drones can reach it.",
    reg: { url: ecfr("107.51"), label: "107.51" },
  },
  {
    icon: Eye,
    label: "Visual Line of Sight",
    text: "The pilot or a visual observer must be able to see the drone with their own eyes for the entire flight.",
    reg: { url: ecfr("107.31"), label: "107.31" },
  },
  {
    icon: Users,
    label: "Flying Over People",
    text: "Not over people outdoors who are not part of the operation, unless the drone qualifies for an FAA category that allows it.",
    reg: { url: ecfr("107.39"), label: "107.39" },
  },
  {
    icon: MapPinned,
    label: "Airspace Near Airports",
    text: "Controlled airspace requires FAA authorization before takeoff, often granted instantly through LAANC.",
    reg: { url: ecfr("107.41"), label: "107.41" },
  },
  {
    icon: Moon,
    label: "Night Operations",
    text: "Allowed with anti-collision lighting visible for 3 statute miles and current FAA training.",
    reg: { url: ecfr("107.29"), label: "107.29" },
  },
];

const regulations = [
  {
    url: PART_107_URL,
    label: "14 CFR Part 107",
    desc: "The full small drone rule for business, commercial, and non-recreational flying.",
  },
  {
    url: USC_44809_URL,
    label: "49 U.S.C. 44809",
    desc: "The federal law that lets hobbyists fly without a Part 107 certificate.",
  },
  {
    url: "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-C/part-48",
    label: "14 CFR Part 48",
    desc: "Drone registration and marking requirements.",
  },
  {
    url: "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-89",
    label: "14 CFR Part 89",
    desc: "Remote ID, the digital license plate every registered drone broadcasts.",
  },
  {
    url: "https://www.faa.gov/uas/getting_started/user_identification_tool",
    label: "FAA User Identification Tool",
    desc: "A short FAA quiz that tells you which set of rules applies to you.",
  },
  {
    url: "https://www.faa.gov/uas/getting_started/b4ufly",
    label: "FAA B4UFLY",
    desc: "Apps that show where you can and cannot fly before you launch.",
  },
];

const purposeContent: Record<
  Purpose,
  {
    title: string;
    intro: string;
    needs: { label: string; required: boolean; text: string }[];
  }
> = {
  recreational: {
    title: "Flying Purely for Fun",
    intro:
      "No license required. Recreational flyers follow a simpler set of rules under federal law, as long as the flight has no business purpose at all.",
    needs: [
      { label: "Pilot license", required: false, text: "Not required" },
      { label: "TRUST safety test", required: true, text: "Free, online, once" },
      { label: "Registration", required: true, text: "Only if 250 g or more" },
      { label: "Remote ID", required: true, text: "Only if registered" },
    ],
  },
  part107: {
    title: "Flying for Work or Business",
    intro:
      "A licensed pilot is required. If the flight helps a business in any way, paid or not, it falls under Part 107 and the person flying needs a Remote Pilot Certificate.",
    needs: [
      { label: "Pilot license", required: true, text: "Part 107 certificate" },
      { label: "Knowledge test", required: true, text: "About $175, once" },
      { label: "Registration", required: true, text: "Every drone, any weight" },
      { label: "Remote ID", required: true, text: "Every drone" },
    ],
  },
  unsure: {
    title: "Not Clearly Recreational",
    intro:
      "The no-license option only covers flights that are purely for fun. A practical task, like checking your own roof or gutters, is not clearly covered. The safe choice is to fly under Part 107 with a licensed pilot, or confirm with the FAA's User Identification Tool.",
    needs: [
      { label: "Pilot license", required: true, text: "Safest: Part 107 certificate" },
      { label: "Knowledge test", required: true, text: "About $175, once" },
      { label: "Registration", required: true, text: "Every drone, any weight" },
      { label: "Remote ID", required: true, text: "Every drone" },
    ],
  },
};

const verdictStyle: Record<
  Verdict,
  { label: string; className: string; icon: typeof Plane }
> = {
  required: {
    label: "License required",
    className: "bg-primary/15 text-primary",
    icon: CheckCircle2,
  },
  "not-required": {
    label: "No license",
    className: "bg-muted text-muted-foreground",
    icon: XCircle,
  },
  gray: {
    label: "Gray area",
    className: "bg-accent/15 text-accent",
    icon: HelpCircle,
  },
};

const requirementsSeo = [
  {
    "@type": "Article",
    headline: "Do I Need a Drone License?",
    description:
      "When the FAA requires a drone license and when it does not, in plain English.",
    url: `${SITE.url}/a/do-i-need-a-drone-license`,
    image: `${SITE.url}/og/do-i-need-a-drone-license.png`,
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
  },
  {
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) =>
      g.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
      }))
    ),
  },
  organizationSchema,
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "Do I Need a Drone License?", path: "/a/do-i-need-a-drone-license" },
  ]),
];

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

const RegLinkChip = ({ reg }: { reg: RegLink }) => (
  <a
    href={reg.url}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackOutboundLink(reg.url, reg.label)}
    className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/15 transition-colors"
  >
    <Scale className="h-3.5 w-3.5 shrink-0" />
    <span>{reg.label}</span>
    <ExternalLink className="h-3 w-3 shrink-0" />
  </a>
);

interface SurveyQuestion {
  id: string;
  q: string;
  help: string;
  /** Result when the answer is "Yes". Unset means "Yes" moves to the next question. */
  yes?: Purpose;
  /** Result when the answer is "No". Unset means "No" moves to the next question. */
  no?: Purpose;
  /** Shown with the result: "Because {reason}." */
  yesReason?: string;
  noReason?: string;
}

const surveyQuestions: SurveyQuestion[] = [
  {
    id: "paid",
    q: "Will you get anything in return for this flight?",
    help: "Money, a discount, free products, a trade, or a favor all count. It does not matter who pays or how much.",
    yes: "part107",
    yesReason: "you are getting something in return for the flight",
  },
  {
    id: "business",
    q: "Is the flight connected to a business or job?",
    help: "Yours, your employer's, or a client's. Think inspections, estimates, listings, job sites, or marketing, even if nobody pays for the drone part.",
    yes: "part107",
    yesReason: "the flight supports a business or job",
  },
  {
    id: "organization",
    q: "Are you flying for an organization?",
    help: "A church, nonprofit, school, HOA, club, or volunteer group, even if you are not paid.",
    yes: "part107",
    yesReason: "you are flying on behalf of an organization",
  },
  {
    id: "content",
    q: "Will the photos or video be used to earn money or promote something?",
    help: "A monetized channel, selling footage, ads, or promoting a business or brand.",
    yes: "part107",
    yesReason: "the footage will earn money or promote something",
  },
  {
    id: "fun",
    q: "Is the flight just for fun?",
    help: "Practicing, sightseeing, or filming for yourself, friends, and family. Not a chore or a task you need done.",
    yes: "recreational",
    no: "unsure",
    yesReason:
      "the flight is just for fun, with no payment, business, or organization involved",
    noReason:
      "the flight has a practical purpose, even though no business is involved",
  },
];

const PurposeSurvey = ({
  onResult,
}: {
  onResult: (purpose: Purpose, reason: string) => void;
}) => {
  const [step, setStep] = useState(0);
  const question = surveyQuestions[step];
  const total = surveyQuestions.length;

  const answer = (value: "yes" | "no") => {
    trackEvent("drone_license_requirements_survey_answer", {
      event_category: "engagement",
      event_label: `${question.id}:${value}`,
    });
    const result = value === "yes" ? question.yes : question.no;
    if (result) {
      trackEvent("drone_license_requirements_survey_result", {
        event_category: "engagement",
        event_label: result,
      });
      onResult(
        result,
        (value === "yes" ? question.yesReason : question.noReason) ?? ""
      );
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 sm:p-8">
      <div className="flex items-center justify-between gap-4 mb-3">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Question {step + 1} of {total}
        </span>
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="text-xs font-semibold text-primary hover:text-accent transition-colors"
          >
            Back
          </button>
        )}
      </div>
      <div className="flex gap-1.5 mb-6" aria-hidden="true">
        {surveyQuestions.map((sq, i) => (
          <div
            key={sq.id}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <div key={question.id} className="animate-in fade-in slide-in-from-right-4 duration-300">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-snug">
          {question.q}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
          {question.help}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(["yes", "no"] as const).map((v) => (
            <button
              key={v}
              onClick={() => answer(v)}
              className="min-h-[56px] rounded-xl border-2 border-border bg-card/50 text-base font-semibold hover:border-primary hover:bg-primary/10 active:scale-[0.98] transition-all"
            >
              {v === "yes" ? "Yes" : "No"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const PurposeSummary = ({
  purpose,
  reason,
  onRestart,
}: {
  purpose: Purpose;
  reason: string;
  onRestart: () => void;
}) => {
  const content = purposeContent[purpose];
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <GlassCube className="w-full" wobbleAngle={purpose === "recreational" ? 0 : 1.5}>
        <div className="p-6 md:p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
            Your Result
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-3">
            {purpose === "recreational"
              ? "No License Needed"
              : purpose === "part107"
                ? "You Need a Licensed Pilot"
                : "Play It Safe: Use a Licensed Pilot"}
          </h3>
          <p className="text-sm text-foreground/80 mb-4">
            Because {reason}.
          </p>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
            {content.title}
          </span>
          <p className="text-foreground/90 leading-relaxed mb-6">
            {content.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.needs.map((n) => (
              <div
                key={n.label}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/40 p-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{n.label}</div>
                  <div className="text-xs text-muted-foreground">{n.text}</div>
                </div>
                {n.required ? (
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mt-6">
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Start over
            </button>
            {purpose !== "recreational" && (
              <Link
                to="/a/drone-license-guide"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                How to get licensed
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
            {purpose === "recreational" && (
              <Link
                to="/a/drone-registration-guide"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                Register and take TRUST
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </GlassCube>
    </div>
  );
};

const ScenarioCard = ({
  scenario,
  index,
}: {
  scenario: Scenario;
  index: number;
}) => {
  const Icon = scenario.icon;
  const v = verdictStyle[scenario.verdict];
  const VerdictIcon = v.icon;
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${Math.min((index % 2) * 80, 240)}ms` }}
    >
      <SpotlightCard
        className="!p-0 !rounded-2xl !bg-card/60 !border-border h-full"
        spotlightColor="rgba(230, 179, 37, 0.15)"
      >
        <div className="p-5 md:p-6 flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider shrink-0 ${v.className}`}
            >
              <VerdictIcon className="h-3.5 w-3.5" />
              {v.label}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2 leading-snug">
            {scenario.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {scenario.text}
          </p>
        </div>
      </SpotlightCard>
    </div>
  );
};

const FaqSection = ({ group }: { group: FaqGroup }) => (
  <div className="max-w-4xl mx-auto mb-20">
    <div className="text-center mb-8">
      <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
        {group.eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold">{group.title}</h2>
    </div>

    <Accordion
      type="multiple"
      defaultValue={group.key === "most-asked" ? group.faqs.map((_, i) => `${group.key}-${i}`) : []}
      className="space-y-3"
    >
      {group.faqs.map((faq, i) => (
        <AccordionItem
          key={faq.q}
          value={`${group.key}-${i}`}
          className="rounded-2xl border border-border bg-card/50 px-5 md:px-6 data-[state=open]:border-primary/40 data-[state=open]:bg-card/70 transition-colors"
        >
          <AccordionTrigger
            onClick={() =>
              trackEvent("drone_license_requirements_faq_toggle", {
                event_category: "engagement",
                event_label: faq.q,
              })
            }
            className="text-left text-base md:text-lg font-semibold gap-4 hover:no-underline hover:text-primary py-5"
          >
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            <div className="space-y-3">
              {faq.a.map((p, j) => (
                <p
                  key={j}
                  className="text-sm md:text-base text-foreground/85 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
            {faq.regs && (
              <div className="flex flex-wrap gap-2 mt-4">
                {faq.regs.map((r) => (
                  <RegLinkChip key={r.label} reg={r} />
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

const DroneLicenseRequirements = () => {
  const [result, setResult] = useState<{ purpose: Purpose; reason: string } | null>(null);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Seo
        title="Do I Need a Drone License? Business vs. Personal Use | LevoAir"
        description="When the FAA requires a drone license and when it does not, in plain English. Business vs. personal use, flying over houses, and common questions answered."
        path="/a/do-i-need-a-drone-license"
        image={`${SITE.url}/og/do-i-need-a-drone-license.png`}
        type="article"
        jsonLd={requirementsSeo}
      />

      <main className="pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-4 block">
              Drone License Requirements
            </span>
            <ScrollFloat
              containerClassName="mb-4"
              textClassName="text-4xl sm:text-5xl md:text-6xl font-bold"
            >
              Do I Need a License?
            </ScrollFloat>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              <BlurText
                text="When the FAA requires a drone license, when it does not, and what the rules mean in plain English"
                delay={400}
                duration={1000}
                className="text-gradient"
              />
            </p>
          </div>

          {/* Intro */}
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              The short answer: it depends on <em>why</em> you fly, not what
              you fly. A drone flown for fun needs no license. The exact same
              drone flown to inspect a roof for a customer does. Not sure which
              one you are? Answer a few quick questions below, then scroll for
              real-world examples and answers to the questions we hear most.
            </p>
          </div>

          {/* Survey */}
          <div className="mb-24">
            <div className="text-center mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Find Out in Under a Minute
              </span>
            </div>
            {result ? (
              <PurposeSummary
                purpose={result.purpose}
                reason={result.reason}
                onRestart={() => setResult(null)}
              />
            ) : (
              <PurposeSurvey
                onResult={(purpose, reason) => setResult({ purpose, reason })}
              />
            )}
          </div>

          {/* Scenarios */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                Real-World Examples
              </span>
              <ScrollFloat
                containerClassName="mb-4"
                textClassName="text-3xl sm:text-4xl md:text-5xl font-bold"
              >
                Which Side of the Line?
              </ScrollFloat>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Getting paid is not the test. The FAA asks whether the flight
                has any business purpose at all. Here is how that plays out.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {scenarios.map((s, i) => (
                <ScenarioCard key={s.title} scenario={s} index={i} />
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-8 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
              <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/85 leading-relaxed">
                <span className="font-semibold">When in doubt, it is Part 107.</span>{" "}
                The recreational exception only covers flights that are purely
                for fun. If a flight is partly for work, the FAA treats the
                whole thing as non-recreational.
              </p>
            </div>
          </div>

          {/* FAQs */}
          <div className="text-center mb-12">
            <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
              Common Questions
            </span>
            <ScrollFloat
              containerClassName="mb-4"
              textClassName="text-3xl sm:text-4xl md:text-5xl font-bold"
            >
              Straight Answers
            </ScrollFloat>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each answer links to the actual regulation on the eCFR, the
              official online Code of Federal Regulations, if you want to read
              the exact wording.
            </p>
          </div>

          {faqGroups.map((g) => (
            <FaqSection key={g.key} group={g} />
          ))}

          {/* Limits at a glance */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                Part 107 at a Glance
              </span>
              <ScrollFloat
                containerClassName="mb-4"
                textClassName="text-3xl sm:text-4xl font-bold"
              >
                The Core Limits
              </ScrollFloat>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The six rules licensed pilots work within on every flight. Most
                can be waived by the FAA for specific operations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {limits.map((l) => (
                <div
                  key={l.label}
                  className="rounded-2xl border border-border bg-card/60 h-full"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <l.icon className="h-5 w-5 text-primary" />
                      </div>
                      <a
                        href={l.reg.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackOutboundLink(l.reg.url, `14 CFR ${l.reg.label}`)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent transition-colors"
                      >
                        14 CFR {l.reg.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{l.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {l.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-8 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
              <FileWarning className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/85 leading-relaxed">
                <span className="font-semibold">Federal rules are the floor, not the ceiling.</span>{" "}
                States, cities, parks, and property owners can add their own
                restrictions on where you take off, land, and record. Check
                local rules before flying somewhere new.
              </p>
            </div>
          </div>

          {/* Regulations */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="text-center mb-10">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                Read the Source
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                The Actual Regulations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {regulations.map((r) => (
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

          {/* Related guides */}
          <div className="max-w-4xl mx-auto mb-24 space-y-4">
            {[
              {
                to: "/a/drone-license-guide",
                icon: BookOpen,
                title: "How to Get Your Part 107 Remote Pilot Certificate",
                text: "Need the license? Here is the step-by-step path.",
              },
              {
                to: "/a/drone-registration-guide",
                icon: Plane,
                title: "Drone Registration, Remote ID & Recurrent Training",
                text: "The pilot is licensed. Now get the aircraft legal.",
              },
            ].map((g) => (
              <Link
                key={g.to}
                to={g.to}
                className="group flex items-center justify-between gap-4 p-5 md:p-6 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                    <g.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground block mb-1">
                      Related Guide
                    </span>
                    <h3 className="text-base md:text-lg font-bold group-hover:text-primary transition-colors">
                      {g.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{g.text}</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-14 text-center border-primary/20 bg-card/60 backdrop-blur-md">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                Need Roof or Property Imagery?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Skip the License. Hire a Licensed Pilot.
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                LevoAir pilots are Part 107 certified, current, insured, and
                fly registered Remote ID aircraft. You get the inspection photos
                and data without managing the FAA side.
              </p>
              <Button asChild className="gradient-primary font-semibold" size="lg">
                <Link to="/contact">Hire a Pilot</Link>
              </Button>
            </Card>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground/70 text-center mt-12 max-w-3xl mx-auto leading-relaxed">
            Information on this page is a plain-language summary for general
            guidance and is not legal advice. FAA regulations and state and
            local laws change. Always verify current requirements with the FAA
            and your local authorities before flying.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DroneLicenseRequirements;
