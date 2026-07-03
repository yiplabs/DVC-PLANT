// Plant illustrations — everything is inline SVG, ported from the design canvas.

import { useId } from "react";
import type { PlantKind } from "@/lib/data";

/* ------------------------------------------------------------------ */
/* Mini plant glyphs — the 8 growth stages plus wilted/regrowth        */
/* ------------------------------------------------------------------ */

type Glyph = {
  d1: string; s1: string; f1: string;
  d2: string; s2: string; f2: string;
  d3: string; s3: string; f3: string;
  d4: string; s4: string; f4: string;
  d5: string; s5: string; f5: string;
};

const cir = (x: number, y: number, r: number) =>
  `M${x} ${y} m${-r} 0 a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0 `;

const petals = (x: number, y: number, o: number, r: number) =>
  cir(x, y - o, r) + cir(x + o, y, r) + cir(x, y + o, r) + cir(x - o, y, r);

const lfL = {
  s: (y: number) => `M12 ${y}c0-2-1.4-3-3.4-3 0 2 1.4 3 3.4 3z`,
  m: (y: number) => `M12 ${y}c0-2.6-1.8-3.9-4.5-3.9 0 2.6 1.8 3.9 4.5 3.9z`,
  b: (y: number) => `M12 ${y}c0-3.1-2.2-4.7-5.5-4.7 0 3.1 2.2 4.7 5.5 4.7z`,
};
const lfR = {
  s: (y: number) => `M12 ${y}c0-2 1.4-3 3.4-3 0 2-1.4 3-3.4 3z`,
  m: (y: number) => `M12 ${y}c0-2.6 1.8-3.9 4.5-3.9 0 2.6-1.8 3.9-4.5 3.9z`,
  b: (y: number) => `M12 ${y}c0-3.1 2.2-4.7 5.5-4.7 0 3.1-2.2 4.7-5.5 4.7z`,
};

function glyph(kind: PlantKind): Glyph {
  const g: Glyph = {
    d1: "M0 0", s1: "#2eb872", f1: "none",
    d2: "M0 0", s2: "none", f2: "#3ecf8e",
    d3: "M0 0", s3: "none", f3: "#2eb872",
    d4: "M0 0", s4: "none", f4: "#fbbf24",
    d5: "M0 0", s5: "none", f5: "#ffd166",
  };
  if (kind === "wilted") {
    g.d1 = "M12 20c0-6-.5-9 4.5-10.5"; g.s1 = "#a07850"; g.f1 = "none";
    g.d2 = "M16 9.5c2.8 1.2 3.6 3.4 3.2 6-2.8-.4-4.3-2.8-3.2-6z"; g.s2 = "none"; g.f2 = "#c39a6b";
    g.d3 = "M0 0"; g.f3 = "none";
    return g;
  }
  if (kind === "regrowth") {
    g.d1 = "M12 20V8.5"; g.s1 = "#9a94ae"; g.f1 = "none";
    g.d2 = "M10 15.5l4-2.4"; g.s2 = "#7a7590"; g.f2 = "none";
    g.d3 = "M12 8.5c0-3.4 2.4-5 5.8-5 0 3.4-2.4 5-5.8 5z"; g.s3 = "none"; g.f3 = "#3ecf8e";
    return g;
  }
  const stage = kind;
  if (stage === 1) {
    g.d1 = "M12 19.6c-1.7 0-2.9-1-2.9-2.5 0-1.7 1.3-3.1 2.9-3.1s2.9 1.4 2.9 3.1c0 1.5-1.2 2.5-2.9 2.5z";
    g.f1 = "#a07850"; g.s1 = "none";
    g.d2 = "M12 14v-1.4"; g.s2 = "#2eb872"; g.f2 = "none";
    g.d3 = lfL.s(12.8); g.f3 = "#3ecf8e";
  } else if (stage === 2) {
    g.d1 = "M12 20v-4.6";
    g.d2 = lfL.s(15.6); g.d3 = lfR.s(15.6);
  } else if (stage === 3) {
    g.d1 = "M12 20v-6.6";
    g.d2 = lfL.m(15.4); g.d3 = lfR.m(13.6);
  } else if (stage === 4) {
    g.d1 = "M12 20v-9";
    g.d2 = lfL.m(15.4); g.d3 = lfR.m(13.2);
    g.d4 = lfL.s(11.2); g.f4 = "#7ddba9";
  } else if (stage === 5) {
    g.d1 = "M12 20V9";
    g.d2 = lfL.b(15.6); g.d3 = lfR.m(12.6);
    g.d4 = cir(12, 7.4, 2); g.s4 = "#f59e0b";
  } else if (stage === 6) {
    g.d1 = "M12 20V8.4";
    g.d2 = lfL.b(15.8); g.d3 = lfR.b(13.4);
    g.d4 = petals(12, 6.4, 2.1, 1.55);
    g.d5 = cir(12, 6.4, 1.35); g.s5 = "#f59e0b";
  } else if (stage === 7) {
    g.d1 = "M12 20V7.6";
    g.d2 = lfL.b(16); g.d3 = lfR.b(13.4);
    g.d4 = petals(12, 5.8, 2.3, 1.7);
    g.d5 = cir(12, 5.8, 1.5); g.s5 = "#f59e0b";
  } else {
    g.d1 = "M12 20V6.4";
    g.d2 = lfL.b(16.4) + lfL.s(11.4);
    g.d3 = lfR.b(14) + lfR.s(10);
    g.d4 = petals(12, 5, 2.4, 1.8);
    g.d5 = cir(12, 5, 1.6); g.s5 = "#f59e0b";
  }
  return g;
}

export function MiniPlant({
  kind,
  size = 34,
  soil = false,
}: {
  kind: PlantKind;
  size?: number;
  soil?: boolean;
}) {
  const g = glyph(kind);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {soil && <ellipse cx="12" cy="20.7" rx="6.5" ry="1.7" fill="#c9a07c" />}
      <path d={g.d1} fill={g.f1} stroke={g.s1} strokeWidth={2.4} strokeLinecap="round" />
      <path d={g.d2} fill={g.f2} stroke={g.s2} strokeWidth={1.6} strokeLinecap="round" />
      <path d={g.d3} fill={g.f3} stroke={g.s3} strokeWidth={1.6} strokeLinecap="round" />
      <path d={g.d4} fill={g.f4} stroke={g.s4} strokeWidth={1.6} strokeLinecap="round" />
      <path d={g.d5} fill={g.f5} stroke={g.s5} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Hero plant — the big character-select illustration on Garden.       */
/* Every growth tier (1 seed → 8 full bloom) exists at hero size.      */
/* ------------------------------------------------------------------ */

export type HeroStage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const TIER_NAMES: Record<HeroStage, string> = {
  1: "Seed",
  2: "Sprout",
  3: "First Leaf",
  4: "Budding",
  5: "Flowering",
  6: "Pollinate",
  7: "Full Bloom",
  8: "Full Bloom",
};

/** Transform that scales a shape by `s` while pinning its anchor (ax,ay) to (tx,ty). */
const pin = (s: number, ax: number, ay: number, tx: number, ty: number) =>
  `translate(${(tx - ax * s).toFixed(2)} ${(ty - ay * s).toFixed(2)}) scale(${s})`;

const BIG_L = "M147 240c-30-3-48-22-51-48 28 3 48 21 51 48z"; // anchor 147,240
const BIG_R = "M152 206c30-3 48-22 51-48-28 3-48 21-51 48z"; // anchor 152,206
const SMALL_L = "M148 268c-20-2-32-14-34-31 19 2 32 14 34 31z"; // anchor 148,268
const SMALL_R = "M152 262c20-2 32-14 34-31-19 2-32 14-34 31z"; // anchor 152,262

function LeafBigL({ t }: { t?: string }) {
  return <path d={BIG_L} transform={t} fill="#3ecf8e" stroke="#27a06b" strokeWidth={5} strokeLinejoin="round" />;
}
function LeafBigR({ t }: { t?: string }) {
  return <path d={BIG_R} transform={t} fill="#2eb872" stroke="#219660" strokeWidth={5} strokeLinejoin="round" />;
}
function LeafSmallL({ t }: { t?: string }) {
  return <path d={SMALL_L} transform={t} fill="#3ecf8e" stroke="#27a06b" strokeWidth={4.5} strokeLinejoin="round" />;
}
function LeafSmallR({ t }: { t?: string }) {
  return <path d={SMALL_R} transform={t} fill="#2eb872" stroke="#219660" strokeWidth={4.5} strokeLinejoin="round" />;
}

function Flower({ scale = 1 }: { scale?: number }) {
  return (
    <g transform={pin(scale, 150, 116, 150, 116)}>
      <circle cx="150" cy="96" r="12.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth={3.5} />
      <circle cx="167" cy="106" r="12.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth={3.5} />
      <circle cx="167" cy="126" r="12.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth={3.5} />
      <circle cx="150" cy="136" r="12.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth={3.5} />
      <circle cx="133" cy="126" r="12.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth={3.5} />
      <circle cx="133" cy="106" r="12.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth={3.5} />
      <circle cx="150" cy="116" r="11" fill="#ffd166" stroke="#f59e0b" strokeWidth={4} />
    </g>
  );
}

// Per-tier stem: path, width and stem-top y (where buds/flowers sit)
const STEMS: Record<HeroStage, { d: string; w: number; top: number } | null> = {
  1: null,
  2: { d: "M150 282c-4-18 3-28 0-46", w: 8, top: 236 },
  3: { d: "M150 282c-5-24 5-38 0-64", w: 9.5, top: 218 },
  4: { d: "M150 282c-6-30 6-48 0-86", w: 11, top: 196 },
  5: { d: "M150 282c-7-38 8-62 0-96-6-26-2-46 0-70", w: 13, top: 116 },
  6: { d: "M150 282c-7-38 8-62 0-96-6-26-2-46 0-70", w: 13, top: 116 },
  7: { d: "M150 282c-7-38 8-62 0-96-6-26-2-46 0-70", w: 13, top: 116 },
  8: { d: "M150 282c-7-38 8-62 0-96-6-26-2-46 0-70", w: 13, top: 116 },
};

// Amber glow behind the bud/flower per tier (0 = none)
const FLOWER_GLOW: Record<HeroStage, number> = { 1: 0, 2: 0, 3: 0, 4: 28, 5: 48, 6: 54, 7: 58, 8: 66 };

// Purple ground-glow radius per tier
const GROUND_GLOW: Record<HeroStage, number> = { 1: 88, 2: 100, 3: 112, 4: 124, 5: 142, 6: 148, 7: 154, 8: 162 };

export function HeroPlant({
  stage = 5,
  dark,
  particles,
}: {
  stage?: HeroStage;
  dark: boolean;
  particles: boolean;
}) {
  const uid = useId().replace(/[:]/g, "");
  const stemId = `stem-${uid}`;
  const glowId = `glow-${uid}`;
  const flowId = `flow-${uid}`;
  const soilA = dark ? "#6e4c37" : "#8a6248";
  const soilB = dark ? "#8a6248" : "#a57c58";
  const stem = STEMS[stage];
  const flowerGlow = FLOWER_GLOW[stage];
  const glowY = stage === 4 ? 194 : 116;
  const p = dark
    ? [0.95, 0.75, 0.7, 0.85, 0.55, 0.65, 0.8]
    : [0.85, 0.6, 0.55, 0.7, 0.4, 0.5, 0.65];

  return (
    <svg width="452" height="500" viewBox="0 0 300 332" style={{ marginTop: -4 }}>
      <defs>
        <linearGradient id={stemId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#6c5ce7" />
          <stop offset="0.55" stopColor="#4834d4" />
          <stop offset="1" stopColor="#00cec9" />
        </linearGradient>
        <radialGradient id={glowId}>
          <stop offset="0" stopColor={dark ? "#8b7cf7" : "#6c5ce7"} stopOpacity={dark ? 0.65 : 0.38} />
          <stop offset="1" stopColor={dark ? "#8b7cf7" : "#6c5ce7"} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={flowId}>
          <stop offset="0" stopColor="#fbbf24" stopOpacity={dark ? 0.7 : 0.5} />
          <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="150" cy="296" rx={GROUND_GLOW[stage] + (dark ? 6 : 0)} ry={dark ? 32 : 30} fill={`url(#${glowId})`} />
      <ellipse cx="150" cy="288" rx="102" ry="28" fill={soilA} />
      <ellipse cx="150" cy="280" rx="92" ry="22" fill={soilB} />
      <circle cx="118" cy="280" r="4" fill={soilA} />
      <circle cx="176" cy="286" r="3.4" fill={soilA} />

      {flowerGlow > 0 && <circle cx="150" cy={glowY} r={flowerGlow + (dark ? 6 : 0)} fill={`url(#${flowId})`} />}

      {stem && (
        <path d={stem.d} fill="none" stroke={`url(#${stemId})`} strokeWidth={stem.w} strokeLinecap="round" />
      )}

      {stage === 1 && (
        <g>
          {/* seed body half-tucked into the soil, with a hopeful little nub */}
          <ellipse cx="150" cy="262" rx="17" ry="14" fill="#a07850" stroke="#8a6248" strokeWidth={4} />
          <path d="M143 256q7-6 14 0" fill="none" stroke="#8a6248" strokeWidth={3} strokeLinecap="round" />
          <path d="M150 248v-10" fill="none" stroke="#2eb872" strokeWidth={5.5} strokeLinecap="round" />
          <path d={SMALL_L} transform={pin(0.55, 148, 268, 149, 240)} fill="#3ecf8e" stroke="#27a06b" strokeWidth={4.5} strokeLinejoin="round" />
        </g>
      )}

      {stage === 2 && (
        <g>
          <LeafSmallL t={pin(0.9, 148, 268, 148, 252)} />
          <LeafSmallR t={pin(0.9, 152, 262, 152, 243)} />
        </g>
      )}

      {stage === 3 && (
        <g>
          <LeafBigL t={pin(0.7, 147, 240, 147, 250)} />
          <LeafBigR t={pin(0.7, 152, 206, 152, 230)} />
        </g>
      )}

      {stage === 4 && (
        <g>
          <LeafBigL t={pin(0.85, 147, 240, 147, 250)} />
          <LeafBigR t={pin(0.85, 152, 206, 152, 226)} />
          <LeafSmallL t={pin(0.9, 148, 268, 148, 270)} />
          {/* young bud */}
          <circle cx="150" cy="192" r="11" fill="#fbbf24" stroke="#f59e0b" strokeWidth={3.5} />
          <circle cx="150" cy="192" r="4.5" fill="#ffd166" />
        </g>
      )}

      {stage >= 5 && (
        <g>
          <LeafBigL />
          <LeafBigR />
          <LeafSmallL />
          <LeafSmallR />
          {stage >= 7 && (
            <g>
              <LeafSmallL t={pin(0.75, 148, 268, 148, 234)} />
              <LeafSmallR t={pin(0.75, 152, 262, 152, 226)} />
            </g>
          )}
          {stage === 8 && (
            <g>
              <LeafBigL t={pin(0.55, 147, 240, 148, 204)} />
              <LeafBigR t={pin(0.55, 152, 206, 152, 190)} />
            </g>
          )}
          <Flower scale={stage === 5 ? 1 : stage === 6 ? 1.04 : stage === 7 ? 1.14 : 1.28} />
          {stage >= 6 && (
            <g className="particles" opacity={particles ? 1 : 0}>
              {/* pollen drifting off the bloom */}
              <circle cx="176" cy="76" r="3" fill="#ffd166" opacity={0.85} />
              <circle cx="196" cy="58" r="2.4" fill="#fbbf24" opacity={0.7} />
              <circle cx="124" cy="70" r="2.6" fill="#ffd166" opacity={0.75} />
              {stage === 8 && <circle cx="212" cy="98" r="3.4" fill="#fbbf24" opacity={0.6} />}
            </g>
          )}
        </g>
      )}

      {stage >= 5 && (
        <g opacity={particles ? 1 : 0} className="particles">
          <circle cx="64" cy="120" r="4" fill="#fbbf24" opacity={p[0]} />
          <circle cx="236" cy="70" r="3" fill="#fbbf24" opacity={p[1]} />
          <circle cx="216" cy="176" r="5" fill="#ffd166" opacity={p[2]} />
          <circle cx="84" cy="210" r="3" fill="#ffd166" opacity={p[3]} />
          <circle cx="252" cy="238" r="4" fill="#fbbf24" opacity={p[4]} />
          <circle cx="44" cy="176" r="2.6" fill="#fbbf24" opacity={p[5]} />
          <circle cx="196" cy="34" r="2.6" fill="#ffd166" opacity={p[6]} />
        </g>
      )}
      {stage === 4 && (
        <g opacity={particles ? 1 : 0} className="particles">
          <circle cx="96" cy="200" r="3" fill="#ffd166" opacity={0.6} />
          <circle cx="208" cy="188" r="3.4" fill="#fbbf24" opacity={0.5} />
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Pot mascot — the cute "submit your project" pot with watering can   */
/* ------------------------------------------------------------------ */

export function PotMascot({ width = 140, height = 112 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 100">
      <ellipse cx="60" cy="94" rx="38" ry="5" fill="#eef0ff" />
      <path d="M60 34V22" fill="none" stroke="#2eb872" strokeWidth={4} strokeLinecap="round" />
      <path d="M60 26c0-8-5-11-13-11 0 8 5 11 13 11z" fill="#3ecf8e" stroke="#27a06b" strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M60 22c0-8 5-11 13-11 0 8-5 11-13 11z" fill="#2eb872" stroke="#219660" strokeWidth={2.5} strokeLinejoin="round" />
      <rect x="38" y="34" width="44" height="12" rx="6" fill="#7d6ef0" />
      <path d="M42 46h36l-4.5 40a6 6 0 0 1-6 5.5h-15a6 6 0 0 1-6-5.5z" fill="#6c5ce7" />
      <circle cx="53" cy="64" r="2.6" fill="#241f3a" />
      <circle cx="67" cy="64" r="2.6" fill="#241f3a" />
      <path d="M53 71q7 6 14 0" fill="none" stroke="#241f3a" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M92 62l-9-5" fill="none" stroke="#00cec9" strokeWidth={5} strokeLinecap="round" />
      <rect x="90" y="58" width="21" height="17" rx="5" fill="#00cec9" />
      <path d="M100 58c0-6 9-6 9 0" fill="none" stroke="#00b5b1" strokeWidth={3.5} />
      <circle cx="86" cy="30" r="3" fill="#fbbf24" opacity={0.8} />
      <circle cx="30" cy="42" r="2.4" fill="#ffd166" opacity={0.7} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Stage mascot — a flowering plant being interviewed at the mic       */
/* (drawn for the gradient hero, so pot & mic read white)              */
/* ------------------------------------------------------------------ */

export function StageMascot({ width = 190, height = 122 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 200 128">
      <ellipse cx="92" cy="120" rx="80" ry="7" fill="rgba(20,17,31,0.2)" />
      <circle cx="92" cy="54" r="50" fill="rgba(255,209,102,0.18)" />
      {/* plant */}
      <path d="M92 92V52" stroke="#2eb872" strokeWidth={5} strokeLinecap="round" />
      <path d="M92 80c0-10-6.5-14-16-14 0 10 6.5 14 16 14z" fill="#3ecf8e" stroke="#27a06b" strokeWidth={3} strokeLinejoin="round" />
      <path d="M92 68c0-10 6.5-14 16-14 0 10-6.5 14-16 14z" fill="#2eb872" stroke="#219660" strokeWidth={3} strokeLinejoin="round" />
      {/* flower */}
      <circle cx="92" cy="31" r="8.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth={2.5} />
      <circle cx="102" cy="41" r="8.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth={2.5} />
      <circle cx="92" cy="51" r="8.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth={2.5} />
      <circle cx="82" cy="41" r="8.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth={2.5} />
      <circle cx="92" cy="41" r="7.5" fill="#ffd166" stroke="#f59e0b" strokeWidth={2.5} />
      {/* pot with a happy face */}
      <rect x="72" y="86" width="40" height="10" rx="5" fill="#ffffff" opacity={0.95} />
      <path d="M76 96h32l-3.8 20a5.5 5.5 0 0 1-5.4 4.6h-13.6a5.5 5.5 0 0 1-5.4-4.6z" fill="#ffffff" opacity={0.92} />
      <circle cx="86" cy="106" r="2.2" fill="#4834d4" />
      <circle cx="98" cy="106" r="2.2" fill="#4834d4" />
      <path d="M86 111q6 5 12 0" stroke="#4834d4" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      {/* microphone leaning in for the interview */}
      <g transform="rotate(-14 148 92)">
        <path d="M148 122V88" stroke="rgba(255,255,255,0.9)" strokeWidth={4} strokeLinecap="round" />
        <path d="M137 122h22" stroke="rgba(255,255,255,0.9)" strokeWidth={4} strokeLinecap="round" />
        <rect x="138" y="56" width="20" height="32" rx="10" fill="#2d2a45" stroke="rgba(255,255,255,0.9)" strokeWidth={3} />
        <path d="M142 66h12M142 72h12" stroke="rgba(255,255,255,0.45)" strokeWidth={2} strokeLinecap="round" />
      </g>
      {/* sparkles */}
      <circle cx="34" cy="32" r="3" fill="#ffd166" opacity={0.9} />
      <circle cx="156" cy="28" r="2.4" fill="#ffd166" opacity={0.7} />
      <circle cx="22" cy="74" r="2.2" fill="#ffffff" opacity={0.6} />
      <circle cx="176" cy="52" r="2" fill="#ffffff" opacity={0.5} />
    </svg>
  );
}

/* Pending seed sprout used in the approval banner plant tile */
export function SeedSprout({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <ellipse cx="12" cy="20.6" rx="6" ry="1.6" fill="#e3c184" />
      <path d="M12 20v-4.5" fill="none" stroke="#2eb872" strokeWidth={2.4} strokeLinecap="round" />
      <path d="M12 16c0-3-2-4.4-5-4.4 0 3 2 4.4 5 4.4z" fill="#3ecf8e" />
    </svg>
  );
}
