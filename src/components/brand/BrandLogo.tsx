import Image from "next/image";
import Link from "next/link";
import { ASSETS, BRAND } from "@/lib/constants/assets";

export type BrandLogoVariant = "mark" | "compact" | "full";

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  /** Wrap in home link */
  linked?: boolean;
  className?: string;
}

const LOGO_MARK = ASSETS.logo.mark;

export function BrandLogo({
  variant = "full",
  linked = false,
  className = "",
}: BrandLogoProps) {
  const markSize = variant === "full" ? 44 : 36;

  const content = (
    <span
      className={[
        "inline-flex items-center gap-2.5 sm:gap-3 min-w-0",
        linked ? "group" : "",
        className,
      ].join(" ")}
    >
      <span
        className={[
          "relative shrink-0 rounded-[var(--radius-sm)] overflow-hidden",
          "ring-1 ring-[rgba(94,179,255,0.22)]",
          "shadow-[0_0_24px_rgba(94,179,255,0.18)]",
          linked ? "transition-shadow duration-300 group-hover:shadow-[0_0_32px_rgba(94,179,255,0.32)]" : "",
        ].join(" ")}
      >
        <Image
          src={LOGO_MARK}
          alt=""
          width={markSize}
          height={markSize}
          className="block"
          priority={variant === "full"}
          aria-hidden
        />
      </span>

      {variant !== "mark" && (
        <span className="flex min-w-0 flex-col leading-[1.05]">
          <span
            className={[
              "font-[family-name:var(--font-display)] uppercase text-[var(--text)] truncate",
              variant === "compact"
                ? "text-[0.72rem] sm:text-[0.8rem] tracking-[0.14em]"
                : "text-[0.78rem] sm:text-[0.88rem] tracking-[0.16em]",
            ].join(" ")}
          >
            Shubhman
          </span>
          <span
            className={[
              "uppercase text-[var(--accent-bright)] truncate",
              variant === "compact"
                ? "type-micro text-[0.58rem] sm:text-[0.62rem] tracking-[0.22em]"
                : "type-micro tracking-[0.24em]",
            ].join(" ")}
          >
            Fitness Arena
          </span>
        </span>
      )}

      <span className="sr-only">{BRAND.name}</span>
    </span>
  );

  if (linked) {
    return (
      <Link href="/" className="inline-flex min-w-0 max-w-[min(100%,18rem)] sm:max-w-none" data-interactive>
        {content}
      </Link>
    );
  }

  return content;
}
