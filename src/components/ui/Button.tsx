import Link from "next/link";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--accent-bright)] border-transparent shadow-[0_0_0_0_var(--accent-glow)] hover:shadow-[0_8px_32px_-8px_var(--accent-glow)]",
  secondary:
    "bg-transparent text-[var(--text)] border-[var(--border-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  ghost:
    "bg-transparent text-[var(--muted)] border-transparent hover:text-[var(--text)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 type-caption",
  md: "px-6 py-3 type-caption",
  lg: "px-8 py-4 type-body",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      href,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = [
      "inline-flex items-center justify-center gap-2",
      "border font-medium tracking-[0.12em] uppercase",
      "transition-all duration-300 ease-[var(--ease-out-expo)]",
      "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)]",
      "disabled:opacity-40 disabled:pointer-events-none",
      "cursor-pointer rounded-[var(--radius-sm)]",
      variantClasses[variant],
      sizeClasses[size],
      className,
    ].join(" ");

    if (href) {
      return (
        <Link href={href} className={classes} data-interactive>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} data-interactive {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
