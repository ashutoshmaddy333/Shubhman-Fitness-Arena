"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap/registerGSAP";
import type { GalleryItem } from "@/lib/content/gallery";
import { ForgeImageFrame } from "@/components/ui/ForgeImageFrame";
import { HoverMotion } from "@/components/motion/HoverMotion";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

const ITEMS_PER_SLIDE = 8;

function chunkItems<T>(items: readonly T[], size: number): T[][] {
  const slides: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    slides.push(items.slice(i, i + size) as T[]);
  }
  return slides;
}

interface GalleryCarouselProps {
  items: readonly GalleryItem[];
}

export function GalleryCarousel({ items }: GalleryCarouselProps) {
  const slides = chunkItems(items, ITEMS_PER_SLIDE);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotionContext();

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (reducedMotion) {
      gsap.set(track, { xPercent: -100 * active });
      return;
    }

    gsap.to(track, {
      xPercent: -100 * active,
      duration: 0.72,
      ease: "power2.inOut",
    });
  }, [active, reducedMotion]);

  return (
    <div className="gallery-carousel relative">
      <div className="overflow-hidden rounded-[var(--radius-md)]">
        <div ref={trackRef} className="flex will-change-transform">
          {slides.map((slideItems, slideIndex) => (
            <div
              key={slideIndex}
              className="gallery-carousel-slide grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3 md:gap-4 w-full shrink-0 grow-0 basis-full min-w-full"
            >
              {slideItems.map((item) => (
                <HoverMotion key={item.id} preset="scale">
                  <figure className="relative aspect-[4/5] min-h-0 overflow-hidden border border-[var(--border)] bg-[var(--surface-elevated)]">
                    <ForgeImageFrame
                      src={item.src}
                      alt={item.alt}
                      objectPosition={item.objectPosition ?? "center center"}
                      variant="scale"
                      fill
                      sizes="(max-width:1024px) 50vw, 25vw"
                      className="h-full"
                    />
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-[#050608]/92 to-transparent z-10">
                      <span className="type-micro text-[var(--accent)]">{item.category}</span>
                      <p className="type-caption text-[var(--text)] mt-1 line-clamp-2">{item.alt}</p>
                    </figcaption>
                  </figure>
                </HoverMotion>
              ))}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Gallery slides">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Show gallery slide ${i + 1}`}
                className={[
                  "h-2 rounded-full transition-all duration-300",
                  i === active
                    ? "w-8 bg-[var(--accent)]"
                    : "w-2 bg-[var(--muted)]/50 hover:bg-[var(--accent)]/60",
                ].join(" ")}
                onClick={() => goTo(i)}
                data-interactive
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="gallery-carousel-btn"
              aria-label="Previous gallery slide"
              onClick={() => goTo(active - 1)}
              data-interactive
            >
              ←
            </button>
            <button
              type="button"
              className="gallery-carousel-btn"
              aria-label="Next gallery slide"
              onClick={() => goTo(active + 1)}
              data-interactive
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
