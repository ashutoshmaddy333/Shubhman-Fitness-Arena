"use client";

import { useMemo } from "react";

interface SplitTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  unitClassName?: string;
  splitBy?: "words" | "chars" | "lines";
  /** Selector hook for GSAP text animations */
  dataSplit?: "words" | "chars" | "lines";
}

export function SplitText({
  text,
  as: Tag = "span",
  className = "",
  unitClassName = "",
  splitBy = "words",
  dataSplit,
}: SplitTextProps) {
  const units = useMemo(() => {
    if (splitBy === "chars") return text.split("");
    if (splitBy === "lines") return text.split("\n");
    return text.split(" ");
  }, [text, splitBy]);

  return (
    <Tag className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden="true"
        className={
          splitBy === "lines"
            ? "flex flex-col"
            : "inline-flex flex-wrap"
        }
        data-split={dataSplit ?? splitBy}
      >
        {units.map((unit, i) => (
          <span
            key={`${unit}-${i}`}
            className={`${splitBy === "words" || splitBy === "chars" ? "inline-block" : "block"} will-change-transform ${unitClassName}`}
            data-split-unit
          >
            {unit}
            {splitBy === "words" && i < units.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </span>
    </Tag>
  );
}
