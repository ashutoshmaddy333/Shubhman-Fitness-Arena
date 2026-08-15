interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}

export function SectionLabel({ number, label, className = "" }: SectionLabelProps) {
  return (
    <div
      className={[
        "flex items-center gap-3 type-micro text-[var(--muted)]",
        className,
      ].join(" ")}
    >
      <span className="text-[var(--accent)] tabular-nums">{number}</span>
      <span className="h-px w-10 bg-gradient-to-r from-[var(--accent-muted)] to-transparent" aria-hidden="true" />
      <span className="text-[var(--text-secondary)]">{label}</span>
    </div>
  );
}
