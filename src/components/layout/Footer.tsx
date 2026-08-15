"use client";

import { usePathname } from "next/navigation";
import { FooterContent } from "@/components/layout/FooterContent";

/** Standalone footer for non-home routes — home footer lives inside FinalCinematicSection */
export function Footer() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="relative z-[var(--z-content)] bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="container-forge section-padding">
        <FooterContent />
      </div>
    </footer>
  );
}
