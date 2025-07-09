import { breakpoints } from "@/lib/constants/breakpoints";
import { useMediaQuery } from "./use-media-query";


export function useBreakpoints() {
  return {
    sm: useMediaQuery(`(min-width: ${breakpoints.sm})`),
    md: useMediaQuery(`(min-width: ${breakpoints.md})`),
    lg: useMediaQuery(`(min-width: ${breakpoints.lg})`),
    xl: useMediaQuery(`(min-width: ${breakpoints.xl})`),
    "2xl": useMediaQuery(`(min-width: ${breakpoints["2xl"]})`),
  }
}
