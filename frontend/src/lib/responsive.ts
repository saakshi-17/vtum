import { BREAKPOINTS } from './constants';

/**
 * Responsive design utilities for conditional rendering and styling
 */

export function useMediaQuery(query: string): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(query).matches;
}

export const mediaQueries = {
  sm: `(min-width: ${BREAKPOINTS.sm})`,
  md: `(min-width: ${BREAKPOINTS.md})`,
  lg: `(min-width: ${BREAKPOINTS.lg})`,
  xl: `(min-width: ${BREAKPOINTS.xl})`,
  '2xl': `(min-width: ${BREAKPOINTS['2xl']})`,
};

export function getResponsiveClass(
  classes: Record<string, string>,
  defaultClass: string
): string {
  if (typeof window === 'undefined') return defaultClass;

  if (window.innerWidth >= parseInt(BREAKPOINTS['2xl'])) {
    return classes['2xl'] || classes.xl || classes.lg || classes.md || classes.sm || defaultClass;
  } else if (window.innerWidth >= parseInt(BREAKPOINTS.xl)) {
    return classes.xl || classes.lg || classes.md || classes.sm || defaultClass;
  } else if (window.innerWidth >= parseInt(BREAKPOINTS.lg)) {
    return classes.lg || classes.md || classes.sm || defaultClass;
  } else if (window.innerWidth >= parseInt(BREAKPOINTS.md)) {
    return classes.md || classes.sm || defaultClass;
  } else if (window.innerWidth >= parseInt(BREAKPOINTS.sm)) {
    return classes.sm || defaultClass;
  }
  return defaultClass;
}
