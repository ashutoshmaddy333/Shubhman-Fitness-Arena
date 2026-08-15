"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { NavLink } from "@/lib/constants/navigation";

interface NavLinkWithPreviewProps {
  item: NavLink;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
}

/** Nav link with cinematic image preview on hover */
export function NavLinkWithPreview({
  item,
  onNavigate,
  variant = "desktop",
}: NavLinkWithPreviewProps) {
  const [hovered, setHovered] = useState(false);

  if (variant === "mobile") {
    return (
      <Link
        href={item.href}
        className="group flex items-center gap-4 py-2"
        onClick={onNavigate}
      >
        {item.image && (
          <div className="relative h-16 w-24 shrink-0 overflow-hidden border border-[var(--border)] bg-[var(--surface-elevated)]">
            <Image
              src={item.image.src}
              alt=""
              fill
              className="object-cover"
              style={{ objectPosition: item.image.objectPosition ?? "center" }}
              sizes="96px"
            />
          </div>
        )}
        <div>
          <span className="type-heading-xl text-[var(--text)] block group-hover:text-[var(--accent)] transition-colors">
            {item.label}
          </span>
          {item.description && (
            <span className="type-micro text-[var(--muted)] mt-1 block">{item.description}</span>
          )}
        </div>
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={item.href}
        className={[
          "type-micro font-medium tracking-[0.14em] uppercase transition-colors duration-300 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]",
          hovered ? "text-[var(--accent-bright)]" : "text-[var(--text-secondary)] hover:text-[var(--text)]",
        ].join(" ")}
        data-interactive
      >
        {item.label}
      </Link>

      {item.image && hovered && (
        <div className="absolute left-1/2 top-[calc(100%+12px)] z-[calc(var(--z-nav)+2)] w-52 -translate-x-1/2 pointer-events-none opacity-100 transition-opacity duration-200">
          <div className="overflow-hidden border border-[var(--border)] bg-[var(--surface-elevated)] rounded-[var(--radius-md)] shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                className="object-cover"
                style={{ objectPosition: item.image.objectPosition ?? "center" }}
                sizes="208px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <div className="px-3 py-2">
              <p className="type-micro text-[var(--accent)]">{item.label}</p>
              {item.description && (
                <p className="type-caption text-[var(--muted)] mt-0.5">{item.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
