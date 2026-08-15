import { BRAND } from "@/lib/constants/assets";

export function JsonLd() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubhmanfitnessarena.example.com";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: BRAND.name,
    description:
      "Premium performance training. Discipline, strength, recovery, and community.",
    url: siteUrl,
    slogan: "BECOME MORE.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
