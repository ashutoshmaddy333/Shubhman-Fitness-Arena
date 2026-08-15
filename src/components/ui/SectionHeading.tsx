interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <header
      className={[
        align === "center" ? "text-center mx-auto" : "text-left",
        "max-w-4xl",
        className,
      ].join(" ")}
    >
      <h2 className="type-display-md text-[var(--text)]" id="philosophy-heading">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 type-body-lg text-[var(--muted)] max-w-2xl">
          {subtitle}
        </p>
      )}
    </header>
  );
}
