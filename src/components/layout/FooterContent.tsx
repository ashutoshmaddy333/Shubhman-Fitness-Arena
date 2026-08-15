import Link from "next/link";
import { FOOTER_NAV, FOOTER_CONTACT, FOOTER_SOCIAL } from "@/lib/constants/navigation";
import { BRAND } from "@/lib/constants/assets";
import { BrandLogo } from "@/components/brand/BrandLogo";

interface FooterContentProps {
  className?: string;
}

/** Footer markup only — no background (uses 3D canvas) */
export function FooterContent({ className = "" }: FooterContentProps) {
  return (
    <div className={`footer-on-canvas ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
        <div className="lg:col-span-2" data-footer-col>
          <BrandLogo variant="full" className="mb-5" />
          <p className="footer-body type-body-lg mt-2 max-w-sm">{BRAND.philosophy.body}</p>
          <ul className="mt-6 flex flex-wrap gap-3" aria-label="Core values">
            {BRAND.values.map((value) => (
              <li key={value}>
                <span className="footer-pill type-micro px-3 py-1.5 rounded-[var(--radius-sm)]">
                  {value}
                </span>
              </li>
            ))}
          </ul>
          <div className="footer-meta mt-8 space-y-2 type-caption">
            <p>{FOOTER_CONTACT.location}</p>
            <p>{FOOTER_CONTACT.hours}</p>
            <p>
              <a
                href={`mailto:${FOOTER_CONTACT.email}`}
                className="footer-link transition-colors"
                data-interactive
              >
                {FOOTER_CONTACT.email}
              </a>
            </p>
          </div>
        </div>

        {Object.entries(FOOTER_NAV).map(([group, links]) => (
          <div key={group} data-footer-col>
            <p className="footer-label type-micro mb-5 uppercase">{group}</p>
            <ul className="space-y-2.5" role="list">
              {links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="footer-link type-caption transition-colors"
                    data-interactive
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        data-footer-bottom
        className="footer-divider mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-4"
      >
        <p className="footer-meta type-caption">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </p>
        <ul className="flex gap-6" role="list">
          {FOOTER_SOCIAL.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="footer-link type-caption transition-colors"
                data-interactive
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
