"use client";

import { useCallback, useMemo, useRef } from "react";
import { art } from "@/lib/ascii";

const BEAM_WIDTH = 10;
const CYCLE = 3000;
const PAUSE = 800;

type ArtVariant = keyof typeof art;

export function AsciiArt({
  variant,
  className,
}: {
  variant: ArtVariant;
  className?: string;
}) {
  const spansByD = useRef<HTMLSpanElement[][]>([]);

  const lines = useMemo(
    () =>
      art[variant]
        .split("\n")
        .map((line, row) =>
          [...line].map((char, col) => ({ char, d: row + col })),
        ),
    [variant],
  );

  const maxD = useMemo(
    () => Math.max(...lines.map((line, row) => row + line.length - 1)),
    [lines],
  );

  const registerSpan = useCallback((el: HTMLSpanElement | null, d: number) => {
    if (!el) return;

    const group = (spansByD.current[d] ??= []);
    group.push(el);

    return () => {
      group.splice(group.indexOf(el), 1);
    };
  }, []);

  const runBeam = useCallback(
    (node: HTMLPreElement | null) => {
      if (!node || matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      let raf = 0;
      let start: number | null = null;
      let last: number | null = null;

      const setLit = (d: number, lit: boolean) => {
        const group = spansByD.current[d];
        if (group) for (const el of group) el.classList.toggle("lit", lit);
      };

      const tick = (ts: number) => {
        start ??= ts;

        const elapsed = (ts - start) % (CYCLE + PAUSE);
        const progress = Math.max(0, elapsed - PAUSE / 2) / CYCLE;
        const center = progress * (maxD + BEAM_WIDTH * 2) - BEAM_WIDTH;
        const min = Math.floor(center - BEAM_WIDTH / 2);
        const max = Math.floor(center + BEAM_WIDTH / 2);

        if (min !== last) {
          const prev = last ?? min;

          for (let d = prev; d < min; d++) setLit(d, false);
          for (let d = Math.max(prev + 1, min); d <= max; d++) setLit(d, true);

          last = min;
        }

        raf = requestAnimationFrame(tick);
      };

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting === raf > 0) return;

        if (entry.isIntersecting) {
          raf = requestAnimationFrame(tick);
          return;
        }

        cancelAnimationFrame(raf);
        raf = 0;
        start = last = null;

        for (const el of spansByD.current.flat()) el.classList.remove("lit");
      });

      observer.observe(node);

      return () => {
        observer.disconnect();
        cancelAnimationFrame(raf);
      };
    },
    [maxD],
  );

  return (
    <pre
      ref={runBeam}
      className={`scanline text-xs select-none ${className ?? ""}`}
      aria-hidden="true"
    >
      {lines.map((line, row) => (
        <span key={row} className="block">
          {line.map(({ char, d }, col) =>
            char === " " ? (
              char
            ) : (
              <span
                key={col}
                ref={(el) => registerSpan(el, d)}
                className="scanline-char"
              >
                {char}
              </span>
            ),
          )}
        </span>
      ))}
    </pre>
  );
}
