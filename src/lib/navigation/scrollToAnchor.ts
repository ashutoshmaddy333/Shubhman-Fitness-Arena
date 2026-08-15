import type Lenis from "lenis";

function getNavScrollOffset(): number {
  const root = document.documentElement;
  const navHeight = parseFloat(getComputedStyle(root).getPropertyValue("--nav-height")) || 76;
  return -(navHeight + 12);
}

/** Scroll to in-page anchor — works with Lenis (desktop) and native scroll (mobile) */
export function scrollToAnchor(href: string, lenis: Lenis | null): boolean {
  if (!href.startsWith("#") || href.length < 2) return false;

  const target = document.getElementById(href.slice(1));
  if (!target) return false;

  const offset = getNavScrollOffset();

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.35, easing: (t) => 1 - (1 - t) ** 3 });
    return true;
  }

  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  return true;
}
