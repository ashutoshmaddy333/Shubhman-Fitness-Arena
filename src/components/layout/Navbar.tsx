"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { PRIMARY_NAV } from "@/lib/constants/navigation";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NavLinkWithPreview } from "@/components/layout/NavLinkWithPreview";
import { useLenis } from "@/components/providers/LenisContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const updateScrolled = useCallback((scrollY: number) => {
    setScrolled(scrollY > 40);
  }, []);

  useEffect(() => {
    if (lenis) {
      const onScroll = ({ scroll }: { scroll: number }) => updateScrolled(scroll);
      lenis.on("scroll", onScroll);
      updateScrolled(lenis.scroll);
      return () => lenis.off("scroll", onScroll);
    }

    const onScroll = () => updateScrolled(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrolled(window.scrollY);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis, updateScrolled]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-[var(--z-nav)] transition-all duration-500",
        scrolled ? "glass-nav glass-nav--scrolled" : "glass-nav glass-nav--top",
      ].join(" ")}
    >
      <nav
        className="container-forge flex items-center justify-between h-[var(--nav-height)]"
        aria-label="Main navigation"
      >
        <BrandLogo variant="compact" linked className="max-w-[11rem] sm:max-w-none" />

        <ul className="hidden lg:flex items-center gap-7" role="list">
          {PRIMARY_NAV.map((item) => (
            <li key={item.label}>
              <NavLinkWithPreview item={item} variant="desktop" />
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="#membership"
            className="type-micro text-[var(--text-secondary)] hover:text-[var(--accent-bright)] transition-colors [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]"
            data-interactive
          >
            Join
          </Link>
          <MagneticButton size="sm">Start Your Journey</MagneticButton>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          data-interactive
        >
          <span
            className={[
              "block h-px w-6 bg-[var(--text)] transition-transform duration-300",
              menuOpen ? "translate-y-[7px] rotate-45" : "",
            ].join(" ")}
            aria-hidden="true"
          />
          <span
            className={[
              "block h-px w-6 bg-[var(--text)] transition-opacity duration-300",
              menuOpen ? "opacity-0" : "",
            ].join(" ")}
            aria-hidden="true"
          />
          <span
            className={[
              "block h-px w-6 bg-[var(--text)] transition-transform duration-300",
              menuOpen ? "-translate-y-[7px] -rotate-45" : "",
            ].join(" ")}
            aria-hidden="true"
          />
        </button>
      </nav>

      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="lg:hidden fixed inset-0 top-[var(--nav-height)] bg-[var(--background)]/98 backdrop-blur-md z-[var(--z-overlay)] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <ul className="container-forge py-10 flex flex-col gap-5" role="list">
            {PRIMARY_NAV.map((item) => (
              <li key={item.label}>
                <NavLinkWithPreview
                  item={item}
                  variant="mobile"
                  onNavigate={() => setMenuOpen(false)}
                />
              </li>
            ))}
            <li className="pt-6">
              <MagneticButton className="w-full">Start Your Journey</MagneticButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
