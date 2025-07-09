'use client';

import { isSSR } from "@/lib/functions/isSSR";
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  if (isSSR()) {
    return false; // Avoids SSR issues
  }

  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', documentChangeHandler);

    // Initial check
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler);
    };
  }, [query]);

  return matches;
}
