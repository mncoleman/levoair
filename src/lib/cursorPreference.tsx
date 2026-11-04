import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "fancy-cursor";

interface CursorPreference {
  fancy: boolean;
  setFancy: (on: boolean) => void;
}

const CursorPreferenceContext = createContext<CursorPreference>({
  fancy: true,
  setFancy: () => {},
});

export const useCursorPreference = () => useContext(CursorPreferenceContext);

/**
 * Remembers whether the visitor wants the custom cursor. index.html stamps
 * `data-fancy-cursor` on <html> before first paint from the same storage key,
 * and index.css only hides the native cursor when it is "on", so the two
 * never disagree.
 */
export const CursorPreferenceProvider = ({ children }: { children: ReactNode }) => {
  const [fancy, setFancyState] = useState(true);

  useEffect(() => {
    try {
      setFancyState(localStorage.getItem(STORAGE_KEY) !== "off");
    } catch {
      /* storage unavailable (private mode): keep the default */
    }
  }, []);

  const setFancy = useCallback((on: boolean) => {
    setFancyState(on);
    document.documentElement.setAttribute("data-fancy-cursor", on ? "on" : "off");
    try {
      localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
    } catch {
      /* non-fatal: the toggle still works for this visit */
    }
  }, []);

  return (
    <CursorPreferenceContext.Provider value={{ fancy, setFancy }}>
      {children}
    </CursorPreferenceContext.Provider>
  );
};
