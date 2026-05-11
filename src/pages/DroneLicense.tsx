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
  Award,
  RefreshCw,
  BookOpen,
  Users,
  Clock,
  DollarSign,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  FileText,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";
import usePageTitle from "@/lib/usePageTitle";
import ScrollFloat from "@/components/ScrollFloat";
import { BlurText } from "@/components/ui/BlurText";
import GlassCube from "@/components/ui/GlassCube";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { trackEvent, trackOutboundLink } from "@/lib/analytics";

type PathType = "new" | "part61";

interface Step {
  icon: typeof Plane;
  title: string;
  duration: string;
  cost: string;
  description: string;
  details: string[];
  link?: { url: string; label: string };
}

const newPilotSteps: Step[] = [
  {
    icon: ShieldCheck,
    title: "Confirm You're Eligible",
    duration: "5 minutes",
    cost: "Free",
    description:
      "Make sure you meet the FAA's basic requirements before investing time and money in the process.",
    details: [
      "Be at least 16 years old",
      "Read, speak, write, and understand English",
      "Be in a physical and mental condition to safely operate a small UAS",
      "Not be subject to any FAA order denying an airman certificate",
    ],
  },
  {
    icon: UserCheck,
    title: "Create Your IACRA Account",
    duration: "10 minutes",
    cost: "Free",
    description:
      "Register on the FAA's Integrated Airman Certification and Rating Application (IACRA) site to get your FAA Tracking Number (FTN). You'll need this before you can register for the knowledge test.",
    details: [
      "Visit IACRA and register as an Applicant",
      "Receive your FTN (FAA Tracking Number) by email",
      "Save your FTN — you'll use it everywhere from here on",
    ],
    link: { url: "https://iacra.faa.gov/IACRA/", label: "Open IACRA" },
  },
  {
    icon: BookOpen,
    title: "Study for the UAG Knowledge Test",
    duration: "20 - 40 hours",
    cost: "Free - $200 (test prep)",
    description:
      "The Unmanned Aircraft General – Small (UAG) test covers regulations, airspace, weather, loading & performance, and operations. Free FAA materials are excellent, but most people pair them with a paid prep course.",
    details: [
      "FAA Remote Pilot Study Guide (free PDF)",
      "Airman Certification Standards (ACS) for UAS",
      "Sectional charts, METAR / TAF reading, and CFR Part 107",
      "Optional paid courses: Pilot Institute, Drone Pilot Ground School, Drone Launch Academy",
    ],
    link: {
      url: "https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/remote_pilot_study_guide.pdf",
      label: "Free FAA Study Guide",
    },
  },
  {
    icon: Calendar,
    title: "Schedule the Knowledge Test",
    duration: "5 minutes to book",
    cost: "$175",
    description:
      "Find a PSI Testing Center near you and book the Unmanned Aircraft General – Small (UAG) exam. Centers fill up fast in major metros — book early.",
    details: [
      "60 multiple-choice questions, 2 hour time limit",
      "Passing score is 70% (42 of 60 correct)",
      "Bring a government-issued photo ID — you will be turned away without it",
      "Roughly 22 questions on regulations, 28 on operations, 13 on airspace, plus weather and loading",
    ],
    link: {
      url: "https://faa.psiexams.com/faa/login",
      label: "Book at PSI",
    },
  },
  {
    icon: GraduationCap,
    title: "Take & Pass the Test",
    duration: "Up to 2 hours",
    cost: "Included",
    description:
      "You'll get your score immediately at the testing center. Failed it? You can retest after 14 days. Most candidates pass on the first try with proper preparation.",
    details: [
      "Print the Airman Knowledge Test Report — you need it for the next step",
      "Your score posts to IACRA roughly 48 hours later",
      "Test results are valid for 24 calendar months",
    ],
  },
  {
    icon: ClipboardList,
    title: "Apply in IACRA (Form 8710-13)",
    duration: "20 minutes",
    cost: "Free",
    description:
      "Once your test score appears in IACRA, log back in and complete FAA Form 8710-13 — the Airman Certificate and/or Rating Application — to formally request your Remote Pilot Certificate.",
    details: [
      "Log into IACRA and start a new 8710-13 application",
      "Select 'Pilot' then 'Remote Pilot' as the certificate sought",
      "Reference your knowledge test report by ID",
      "Sign electronically and submit",
    ],
    link: { url: "https://iacra.faa.gov/IACRA/", label: "Apply in IACRA" },
  },
  {
    icon: ShieldCheck,
    title: "TSA Security Vetting",
    duration: "3 - 7 days (typical)",
    cost: "Free",
    description:
      "The TSA runs a background check automatically once your application is submitted. There's nothing for you to do here except wait for the email.",
    details: [
      "Check your email — including spam — for FAA correspondence",
      "Most candidates clear in under a week",
      "Prior aviation incidents or unresolved warrants can delay or deny vetting",
    ],
  },
  {
    icon: Award,
    title: "Print Your Temporary Certificate",
    duration: "Same day as TSA clearance",
    cost: "Free",
    description:
      "Once TSA vetting clears, log into IACRA and download your Temporary Remote Pilot Certificate. You are now legally authorized to fly commercially under Part 107.",
    details: [
      "Temporary certificate is valid for 120 days",
      "Carry it (paper or digital) on every flight",
      "Permanent plastic card arrives by mail within several weeks",
    ],
  },
  {
    icon: Plane,
    title: "Register Your Drone",
    duration: "10 minutes",
    cost: "$5 per drone",
    description:
      "Any drone flown commercially must be registered with the FAA at DroneZone. Registration is good for 3 years. Don't forget to mark your registration number visibly on the airframe.",
    details: [
      "Register at FAA DroneZone under Part 107",
      "Each commercial drone needs its own registration",
      "Most aircraft also need Remote ID — verify your model is compliant",
    ],
    link: {
      url: "https://faadronezone-access.faa.gov/",
      label: "FAA DroneZone",
    },
  },
  {
    icon: RefreshCw,
    title: "Stay Current Every 24 Months",
    duration: "1 - 2 hours",
    cost: "Free",
    description:
      "To keep your certificate active, complete the free online recurrent training (ALC-677) every 24 calendar months on FAASafety.gov. No retest, no testing center.",
    details: [
      "Course: ALC-677 — Part 107 Small UAS Recurrent",
      "Completion is automatic — no proctor required",
      "Save the completion certificate with your flight records",
    ],
    link: {
      url: "https://www.faasafety.gov/",
      label: "FAASafety.gov",
    },
  },
];

const part61PilotSteps: Step[] = [
  {
    icon: ShieldCheck,
    title: "Confirm Your Flight Review is Current",
    duration: "5 minutes",
    cost: "Free",
    description:
      "The Part 61 fast track is only available to manned pilots with a current flight review (BFR) on file. If yours has lapsed, you'll need to take the standard knowledge test path instead.",
    details: [
      "Recreational, Private, Commercial, and ATP all qualify",
      "Flight review must be within the last 24 calendar months",
      "Sport pilots: confirm your endorsements satisfy 14 CFR § 61.56",
    ],
  },
  {
    icon: UserCheck,
    title: "Create or Sign In to IACRA",
    duration: "10 minutes",
    cost: "Free",
    description:
      "If you don't already have an FAA Tracking Number (FTN), create one now. Most active Part 61 pilots already have an IACRA account from their original certification.",
    details: [
      "Use your existing IACRA login if you have one",
      "Verify your name and certificate number match your Part 61 records exactly",
    ],
    link: { url: "https://iacra.faa.gov/IACRA/", label: "Open IACRA" },
  },
  {
    icon: GraduationCap,
    title: "Complete the Free ALC-451 Online Course",
    duration: "2 - 3 hours",
    cost: "Free",
    description:
      "Instead of paying $175 and sitting for a knowledge test at a PSI center, you complete a free online course on the FAA Safety Team site: 'Part 107 Small Unmanned Aircraft Systems (sUAS).'",
    details: [
      "Course code: ALC-451",
      "Self-paced — start, stop, and resume anytime",
      "Save the completion certificate as a PDF",
      "Counts as your initial aeronautical knowledge requirement",
    ],
    link: {
      url: "https://www.faasafety.gov/gslac/ALC/CourseLanding.aspx?cID=451",
      label: "Take ALC-451 (Free)",
    },
  },
  {
    icon: ClipboardList,
    title: "Complete Form 8710-13 in IACRA",
    duration: "20 minutes",
    cost: "Free",
    description:
      "Log into IACRA and submit FAA Form 8710-13 — the Airman Certificate and/or Rating Application — selecting Remote Pilot as the certificate sought.",
    details: [
      "Reference your ALC-451 completion certificate",
      "Reference your existing Part 61 certificate number",
      "Sign electronically before scheduling your validation appointment",
    ],
    link: { url: "https://iacra.faa.gov/IACRA/", label: "Apply in IACRA" },
  },
  {
    icon: Users,
    title: "Validate Your Identity with a CFI, DPE, FSDO, or ACR",
    duration: "30 - 60 minutes",
    cost: "Free - $100",
    description:
      "Bring your completed application, ALC-451 certificate, proof of current flight review, and a government photo ID to one of four authorized parties for identity validation.",
    details: [
      "CFI (Certified Flight Instructor) — typically the easiest, often free for current students",
      "FSDO (Flight Standards District Office) — by appointment, no cost",
      "DPE (Designated Pilot Examiner) — most charge a fee",
      "ACR (Airman Certification Representative) — usually at flight schools",
      "Heads up: a CFI cannot issue a temporary certificate — only a FSDO, DPE, or ACR can",
    ],
  },
  {
    icon: ShieldCheck,
    title: "TSA Security Vetting",
    duration: "3 - 7 days (typical)",
    cost: "Free",
    description:
      "Once submitted, TSA runs an automatic background check. Watch your email for FAA correspondence and the temporary certificate availability notice.",
    details: [
      "Check spam folders — the FAA email is easily missed",
      "Most Part 61 pilots clear quickly since they're already in the system",
    ],
  },
  {
    icon: Award,
    title: "Print Your Temporary Certificate",
    duration: "Same day as TSA clearance",
    cost: "Free",
    description:
      "Download the Temporary Remote Pilot Certificate from IACRA. You are now legally authorized to fly commercially under Part 107.",
    details: [
      "Valid for 120 days",
      "Carry it on every commercial flight (paper or digital is fine)",
      "Permanent plastic card arrives by mail in several weeks",
    ],
  },
  {
    icon: Plane,
    title: "Register Your Drone",
    duration: "10 minutes",
    cost: "$5 per drone",
    description:
      "Every drone flown under Part 107 must be registered at FAA DroneZone. Registration is good for 3 years and the registration number must be visible on the airframe.",
    details: [
      "Register under Part 107, not the recreational rule",
      "Each commercial drone needs its own registration",
      "Verify Remote ID compliance for your aircraft",
    ],
    link: {
      url: "https://faadronezone-access.faa.gov/",
      label: "FAA DroneZone",
    },
  },
  {
    icon: RefreshCw,
    title: "Stay Current with ALC-515",
    duration: "1 - 2 hours",
    cost: "Free",
    description:
      "Part 61 pilots with a current flight review have a dedicated free recurrent course: ALC-515. Complete it every 24 calendar months to maintain your remote pilot privileges.",
    details: [
      "Course: ALC-515 — Part 107 Small UAS Recurrent (Part 61 Pilots)",
      "Free, online, no proctor",
      "Save the completion certificate with your records",
    ],
    link: {
      url: "https://www.faasafety.gov/gslac/ALC/CourseLanding.aspx?cID=515",
      label: "Take ALC-515 (Free)",
    },
  },
];

const sharedRequirements = [
  {
    icon: MapPin,
    title: "Airspace Authorization",
    text: "Operating in controlled airspace (Class B, C, D, or surface E) requires LAANC authorization or a manual FAA waiver before you fly.",
  },
  {
    icon: AlertCircle,
    title: "Operating Limits",
    text: "Daylight or civil twilight, under 400 ft AGL, within visual line of sight, max 100 mph, and never over people or moving vehicles without a waiver.",
  },
  {
    icon: FileText,
    title: "Carry Your Credentials",
    text: "Bring your Remote Pilot Certificate (or temporary), drone registration, and a photo ID to every commercial flight in case the FAA or law enforcement asks.",
  },
];

const PathToggle = ({
  selected,
  onChange,
}: {
  selected: PathType;
  onChange: (p: PathType) => void;
}) => {
  const handleSelect = (path: PathType) => {
    onChange(path);
    trackEvent("drone_license_path_select", {
      event_category: "engagement",
      event_label: path,
      path_type: path,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
      <button
        onClick={() => handleSelect("new")}
        className={`group relative text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
          selected === "new"
            ? "border-primary bg-primary/10"
            : "border-border bg-card/50 hover:border-primary/40"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`p-2 rounded-lg ${
                  selected === "new" ? "bg-primary/20" : "bg-primary/10"
                }`}
              >
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Standard Path
              </span>
            </div>
            <h3 className="text-xl font-bold mb-1">New to Aviation</h3>
            <p className="text-sm text-muted-foreground">
              No existing Part 61 pilot certificate. Take the knowledge test at
              a PSI testing center.
            </p>
          </div>
          <ChevronRight
            className={`h-5 w-5 transition-all ${
              selected === "new"
                ? "text-primary translate-x-1"
                : "text-muted-foreground"
            }`}
          />
        </div>
      </button>

      <button
        onClick={() => handleSelect("part61")}
        className={`group relative text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
          selected === "part61"
            ? "border-primary bg-primary/10"
            : "border-border bg-card/50 hover:border-primary/40"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`p-2 rounded-lg ${
                  selected === "part61" ? "bg-primary/20" : "bg-primary/10"
                }`}
              >
                <Plane className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Fast Track
              </span>
            </div>
            <h3 className="text-xl font-bold mb-1">Part 61 Pilot</h3>
            <p className="text-sm text-muted-foreground">
              Existing manned pilot certificate with a current flight review.
              Skip the test — take a free online course instead.
            </p>
          </div>
          <ChevronRight
            className={`h-5 w-5 transition-all ${
              selected === "part61"
                ? "text-primary translate-x-1"
                : "text-muted-foreground"
            }`}
          />
        </div>
      </button>
    </div>
  );
};

const StepCard = ({ step, index }: { step: Step; index: number }) => {
  const Icon = step.icon;
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
            {/* Step number + icon */}
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

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                {step.title}
              </h3>

              {/* Meta row */}
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

              {step.link && (
                <a
                  href={step.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackOutboundLink(step.link!.url, step.link!.label)
                  }
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
                >
                  {step.link.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

const PathSummary = ({ path }: { path: PathType }) => {
  const summary =
    path === "new"
      ? {
          title: "The Standard Path",
          intro:
            "If you've never held a manned-pilot certificate, this is your route. You'll study, sit for a proctored knowledge test, and apply for your Remote Pilot Certificate online.",
          totalTime: "3 - 6 weeks",
          totalCost: "$175 - $400",
          steps: newPilotSteps.length,
        }
      : {
          title: "The Fast Track for Part 61 Pilots",
          intro:
            "Already certificated under Part 61 with a current flight review? Skip the $175 PSI exam. You'll take a free online FAA Safety Team course (ALC-451) and apply directly through IACRA.",
          totalTime: "1 - 3 weeks",
          totalCost: "Free - $100",
          steps: part61PilotSteps.length,
        };

  return (
    <div className="max-w-4xl mx-auto mb-10">
      <GlassCube className="w-full" wobbleAngle={path === "new" ? 0 : 1.5}>
        <div className="p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
            {summary.title}
          </span>
          <p className="text-foreground/90 leading-relaxed mb-6">
            {summary.intro}
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Steps
              </div>
              <div className="text-2xl font-bold text-gradient">
                {summary.steps}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Time
              </div>
              <div className="text-2xl font-bold text-gradient">
                {summary.totalTime}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Total Cost
              </div>
              <div className="text-2xl font-bold text-gradient">
                {summary.totalCost}
              </div>
            </div>
          </div>
        </div>
      </GlassCube>
    </div>
  );
};

const DroneLicense = () => {
  usePageTitle("How to Get Your Drone Pilot License");
  const [path, setPath] = useState<PathType>("new");
  const stepsRef = useRef<HTMLDivElement>(null);

  const steps = path === "new" ? newPilotSteps : part61PilotSteps;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
        <div
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-orb"
          style={{ background: "hsl(43 84% 55% / 0.15)" }}
        />
        <div
          className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] rounded-full blur-orb"
          style={{ background: "hsl(38 90% 50% / 0.10)" }}
        />
      </div>

      <main className="pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-4 block">
              Pilot Certification Guide
            </span>
            <ScrollFloat
              containerClassName="mb-4"
              textClassName="text-5xl md:text-6xl font-bold"
            >
              Earn Your Wings
            </ScrollFloat>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <BlurText
                text="The complete path to your FAA Part 107 Remote Pilot Certificate"
                delay={400}
                duration={1000}
                className="text-gradient"
              />
            </p>
          </div>

          {/* Intro paragraph */}
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Anyone flying a drone for commercial purposes in the United States
              needs a Part 107 Remote Pilot Certificate. The path you take
              depends on whether you already hold a Part 61 manned-pilot
              certificate. Pick your starting point below.
            </p>
          </div>

          {/* Path Toggle */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Choose Your Path
              </span>
            </div>
            <PathToggle selected={path} onChange={setPath} />
          </div>

          {/* Path Summary */}
          <PathSummary path={path} />

          {/* Steps Heading */}
          <div className="text-center mb-12" ref={stepsRef}>
            <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
              The Process
            </span>
            <ScrollFloat
              containerClassName="mb-0"
              textClassName="text-4xl md:text-5xl font-bold"
            >
              {path === "new" ? "Standard Path" : "Part 61 Fast Track"}
            </ScrollFloat>
          </div>

          {/* Steps */}
          <div className="max-w-4xl mx-auto space-y-5 mb-24">
            {steps.map((step, i) => (
              <StepCard key={`${path}-${i}`} step={step} index={i} />
            ))}
          </div>

          {/* Common Requirements */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                Required for Every Pilot
              </span>
              <ScrollFloat
                containerClassName="mb-0"
                textClassName="text-4xl font-bold"
              >
                Operating Under Part 107
              </ScrollFloat>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {sharedRequirements.map((req, i) => (
                <GlassCube
                  key={req.title}
                  className="min-h-[220px]"
                  wobbleAngle={(i / 3) * Math.PI * 2}
                >
                  <div className="p-7 flex flex-col items-start space-y-4 min-h-[220px]">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <req.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">{req.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {req.text}
                    </p>
                  </div>
                </GlassCube>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="text-center mb-10">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                Official Resources
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Bookmark These
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  url: "https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot",
                  label: "FAA: Become a Certificated Remote Pilot",
                  desc: "Official starting point for everything Part 107.",
                },
                {
                  url: "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107",
                  label: "14 CFR Part 107 (eCFR)",
                  desc: "The full regulation, always up to date.",
                },
                {
                  url: "https://iacra.faa.gov/IACRA/",
                  label: "IACRA",
                  desc: "Where you create your FTN and submit Form 8710-13.",
                },
                {
                  url: "https://faadronezone-access.faa.gov/",
                  label: "FAA DroneZone",
                  desc: "Register your drones and request waivers.",
                },
                {
                  url: "https://www.faasafety.gov/",
                  label: "FAASafety.gov",
                  desc: "Home of the free ALC-451 and ALC-515 courses.",
                },
                {
                  url: "https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/remote_pilot_study_guide.pdf",
                  label: "FAA Remote Pilot Study Guide",
                  desc: "The free PDF that covers most of the test.",
                },
              ].map((r) => (
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

          {/* CTA */}
          <div className="max-w-3xl mx-auto">
            <Card className="p-10 md:p-14 text-center border-primary/20 bg-card/60 backdrop-blur-md">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                Need a Pilot Now?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Skip the Process. Hire One of Ours.
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                If you need certified pilots for an upcoming job rather than
                going through certification yourself, LevoAir provides FAA Part
                107 certified contract pilots ready to deploy.
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
            change as the FAA updates its regulations and procedures. Always
            verify current requirements directly with the FAA before relying on
            them for certification or commercial operation.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DroneLicense;
