import { useEffect } from "react";

const BASE_TITLE = "LevoAir";

/**
 * Sets the document title to "{pageTitle} - LevoAir" or "LevoAir" when no pageTitle provided.
 * Restores previous title on unmount.
 */
export default function usePageTitle(pageTitle?: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = pageTitle ? `${pageTitle} - ${BASE_TITLE}` : BASE_TITLE;
    return () => {
      document.title = prev;
    };
  }, [pageTitle]);
}
