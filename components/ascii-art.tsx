"use client";

import { useRef, useMemo, useCallback } from "react";
import { art } from "@/lib/ascii";

const BEAM_WIDTH = 8;
const CYCLE = 3000;
const PAUSE = 800;

type ArtVariant = keyof typeof art;

function buildLines(text: string) {
  return text
    .split("\n")
    .map((line, row) => [...line].map((char, col) => ({ char, d: row + col })));
}

export function AsciiArt({
  variant,
  className,
}: {
  variant: ArtVariant;
  className?: string;
}) {
  const spansByD = useRef<Map<number, HTMLSpanElement[]>>(new Map());
  const rafRef = useRef<number | null>(null);

  const lines = useMemo(() => buildLines(art[variant]), [variant]);

  const maxD = useMemo(
    () => Math.max(...lines.flatMap((line) => line.map((t) => t.d))),
    [lines],
  );

  const registerSpan = (el: HTMLSpanElement | null, d: number) => {
    if (!el) return;
    if (!spansByD.current.has(d)) spansByD.current.set(d, []);

    spansByD.current.get(d)!.push(el);
  };

  const startAnimation = useCallback(
    (node: HTMLPreElement | null) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (!node) return;

      let start: number | null = null;
      let lastBeamMin: number | null = null;

      const tick = (ts: number) => {
        start ??= ts;

        const elapsed = (ts - start) % (CYCLE + PAUSE);
        const t = Math.max(0, elapsed - PAUSE / 2) / CYCLE;

        const beamCenter = t * (maxD + BEAM_WIDTH * 2) - BEAM_WIDTH;
        const beamMin = Math.floor(beamCenter - BEAM_WIDTH / 2);
        const beamMax = Math.floor(beamCenter + BEAM_WIDTH / 2);

        if (beamMin !== lastBeamMin) {
          const prev = lastBeamMin ?? beamMin;

          for (let d = prev; d < beamMin; d++)
            spansByD.current
              .get(d)
              ?.forEach((el) => el.classList.remove("lit"));
          for (let d = Math.max(prev + 1, beamMin); d <= beamMax; d++)
            spansByD.current.get(d)?.forEach((el) => el.classList.add("lit"));

          lastBeamMin = beamMin;
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    },
    [maxD],
  );

  return (
    <pre
      ref={startAnimation}
      className={`text-xs select-none ${className ?? ""}`}
      aria-hidden="true"
    >
      {lines.map((line, row) => (
        <span key={row} style={{ display: "block" }}>
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
