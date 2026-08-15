"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PRIMARY_NAV } from "@/lib/constants/navigation";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NavLinkWithPreview } from "@/components/layout/NavLinkWithPreview";
import { scrollToAnchor } from "@/lib/navigation/scrollToAnchor";
import { useLenis } from "@/components/providers/LenisContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (!menuOpen) return;

    const scrollY = window.scrollY;
    document.body.dataset.scrollLock = String(scrollY);
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    lenis?.stop();

    return () => {
      const lockedY = Number(document.body.dataset.scrollLock ?? 0);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      delete document.body.dataset.scrollLock;
      window.scrollTo(0, lockedY);
      lenis?.start();
    };
  }, [menuOpen, lenis]);

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
        "pt-[env(safe-area-inset-top,0px)]",
        scrolled ? "glass-nav glass-nav--scrolled" : "glass-nav glass-nav--top",
      ].join(" ")}
    >
      <nav
        className="container-forge flex items-center justify-between gap-3 min-h-[var(--nav-height)] h-[var(--nav-height)]"
        aria-label="Main navigation"
      >
        <BrandLogo variant="compact" linked className="min-w-0 shrink" />

        <ul className="hidden lg:flex items-center gap-7 shrink-0" role="list">
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
            onClick={(e) => {
              if (scrollToAnchor("#membership", lenis)) e.preventDefault();
            }}
          >
            Join
          </Link>
          <MagneticButton size="sm">Start Your Journey</MagneticButton>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="nav-menu-toggle lg:hidden relative z-[calc(var(--z-nav)+1)] flex flex-col justify-center items-center gap-1.5 size-10 shrink-0"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
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

      {mounted &&
        menuOpen &&
        createPortal(
          <>
            <button
              type="button"
              className="lg:hidden fixed inset-0 z-[calc(var(--z-nav)-2)] bg-black/70 backdrop-blur-[2px]"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
            <div
              ref={menuRef}
              id="mobile-menu"
              className="mobile-nav-panel lg:hidden fixed inset-x-0 bottom-0 top-[calc(var(--nav-height)+env(safe-area-inset-top,0px))] z-[calc(var(--z-nav)-1)] overflow-y-auto overscroll-contain touch-pan-y bg-[var(--background)] border-t border-[var(--border-strong)] shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              data-lenis-prevent
            >
              <ul className="container-forge py-8 flex flex-col gap-2" role="list">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.label}>
                    <NavLinkWithPreview
                      item={item}
                      variant="mobile"
                      onNavigate={() => setMenuOpen(false)}
                    />
                  </li>
                ))}
                <li className="pt-4 mt-2 border-t border-[var(--border)]">
                  <MagneticButton className="w-full">Start Your Journey</MagneticButton>
                </li>
              </ul>
            </div>
          </>,
          document.body,
        )}
    </header>
  );
}
