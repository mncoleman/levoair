import { useEffect, useState } from "react";
import { useCursorPreference } from "@/lib/cursorPreference";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** The custom cursor in miniature: a dot inside a ring, slashed when off. */
const CursorIcon = ({ off }: { off: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" strokeWidth="1.25" />
    <circle cx="12" cy="12" r="2.25" fill="currentColor" stroke="none" />
    {off && <line x1="4.5" y1="19.5" x2="19.5" y2="4.5" strokeWidth="1.5" />}
  </svg>
);

/**
 * Bottom-right button that turns the custom cursor on and off. Only shown on
 * mouse/trackpad devices, since the custom cursor never mounts on touch.
 */
const CursorToggle = () => {
  const { fancy, setFancy } = useCursorPreference();
  const [applicable, setApplicable] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setApplicable(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!applicable) return null;

  const label = fancy ? "Turn off custom cursor" : "Turn on custom cursor";

  return (
    <button
      type="button"
      aria-pressed={!fancy}
      aria-label={label}
      title={label}
      onClick={() => {
        setFancy(!fancy);
        trackEvent("custom_cursor_toggle", { event_category: "engagement", event_label: fancy ? "off" : "on" });
      }}
      className={cn(
        // Below the cursor's z-[9999] so the cursor still draws over the button.
        "fixed bottom-5 right-5 z-40 inline-flex h-10 w-10 items-center justify-center rounded-lg border backdrop-blur-xl transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        fancy
          ? "border-border/60 bg-background/50 text-muted-foreground hover:border-primary/50 hover:text-primary"
          : "border-primary/40 bg-primary/10 text-primary"
      )}
    >
      <CursorIcon off={!fancy} />
    </button>
  );
};

export default CursorToggle;
