// Sproutly icon set — 24×24 viewBox, rounded 2.2px strokes per the design spec.

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(size: number | undefined, fallback: number) {
  return { width: size ?? fallback, height: size ?? fallback, viewBox: "0 0 24 24" };
}

export function SproutIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 19)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21v-8" />
      <path d="M12 13C12 9 9 7 5 7c0 4 3 6 7 6z" />
      <path d="M12 13c0-4 3-6 7-6 0 4-3 6-7 6z" />
    </svg>
  );
}

export function LogoSproutIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 22)} fill="none" stroke="#ffffff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21v-8" />
      <path d="M12 13C12 9 9 7 5 7c0 4 3 6 7 6z" fill="rgba(255,255,255,0.35)" />
      <path d="M12 13c0-4 3-6 7-6 0 4-3 6-7 6z" fill="rgba(255,255,255,0.35)" />
    </svg>
  );
}

export function HomeIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 19)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 11l8-7 8 7v9h-5.5v-5h-5v5H4z" />
    </svg>
  );
}

export function QuestIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 19)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 21V4h11.5l-2.5 4.5 2.5 4.5H6" />
    </svg>
  );
}

export function StageIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 19)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="7" width="12" height="10" rx="2.5" />
      <path d="M15 10.5l6-3v9l-6-3" />
    </svg>
  );
}

export function FolderIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 19)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2.5h7.5A2.5 2.5 0 0 1 21 10v6.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5z" />
    </svg>
  );
}

export function GearIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 19)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2.1 2.1M16.9 16.9L19 19M19 5l-2.1 2.1M7.1 16.9L5 19" />
    </svg>
  );
}

export function BellIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 19)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 3h16z" />
      <path d="M10.5 21.5a2 2 0 0 0 3 0" />
    </svg>
  );
}

export function TrophyIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 19)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
      <path d="M8 5H5a3 3 0 0 0 3 4M16 5h3a3 3 0 0 1-3 4" />
      <path d="M12 13v4M9 20h6" />
    </svg>
  );
}

export function SearchIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 17)} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  );
}

export function DropIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 19)} fill="rgba(255,255,255,0.3)" stroke="#ffffff" strokeWidth={2.4} strokeLinejoin="round" {...props}>
      <path d="M12 3.5s6 6.8 6 10.7a6 6 0 1 1-12 0C6 10.3 12 3.5 12 3.5z" />
    </svg>
  );
}

export function DropFillIcon({ size, fill = "#6c5ce7", ...props }: IconProps & { fill?: string }) {
  return (
    <svg {...base(size, 12)} fill={fill} {...props}>
      <path d="M12 3s6 6.8 6 11a6 6 0 1 1-12 0c0-4.2 6-11 6-11z" />
    </svg>
  );
}

export function FlameIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 12)} fill="#f59e0b" {...props}>
      <path d="M12 3c.8 3.5 4.8 5 4.8 9.5a4.8 4.8 0 0 1-9.6 0c0-2.4 1.6-3.6 1.9-5.9.9.9 1.5 1.6 2.5 1.8-.3-1.8-.6-3.7.4-5.4z" />
    </svg>
  );
}

export function StarIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 12)} fill="#fbbf24" {...props}>
      <path d="M12 3l2.7 5.6 6.3.9-4.5 4.4 1 6.1-5.5-2.9-5.5 2.9 1-6.1L3 9.5l6.3-.9z" />
    </svg>
  );
}

export function PlayIcon({ size, fill = "currentColor", ...props }: IconProps & { fill?: string }) {
  return (
    <svg {...base(size, 11)} fill={fill} {...props}>
      <path d="M8 5.5l11 6.5-11 6.5z" />
    </svg>
  );
}

export function DocIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 12)} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinejoin="round" {...props}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
    </svg>
  );
}

export function DownloadIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 16)} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 4v10M7.5 10.5L12 15l4.5-4.5M5 19.5h14" />
    </svg>
  );
}

export function LockIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 13)} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinejoin="round" {...props}>
      <rect x="6" y="11" width="12" height="9" rx="2.5" />
      <path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3" />
    </svg>
  );
}

export function CheckIcon({ size, strokeWidth = 4, ...props }: IconProps & { strokeWidth?: number }) {
  return (
    <svg {...base(size, 14)} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 13l4 4 10-10" />
    </svg>
  );
}

export function ChevronLeftIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 16)} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronRightIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 16)} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronDownIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 13)} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  );
}

export function ChevronUpIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 11)} fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 14.5l6-6 6 6" />
    </svg>
  );
}

export function TargetIcon({ size, ...props }: IconProps) {
  // "In progress" quest node icon
  return (
    <svg {...base(size, 24)} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M15.6 12v1.4a2.4 2.4 0 0 0 4.8 0V12a8.4 8.4 0 1 0-3.3 6.7" />
    </svg>
  );
}

export function SendIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 16)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 3L10.5 13.5" />
      <path d="M21 3l-6.8 18-3.7-7.5L3 9.8z" />
    </svg>
  );
}

export function GlobeIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 15)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <ellipse cx="12" cy="12" rx="3.8" ry="8.5" />
      <path d="M3.8 12h16.4" />
    </svg>
  );
}

export function XSocialIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 14)} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" {...props}>
      <path d="M5 4.5l14 15M19 4.5l-14 15" />
    </svg>
  );
}

export function CodeIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 15)} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 7.5L4.5 12 9 16.5M15 7.5l4.5 4.5-4.5 4.5" />
    </svg>
  );
}

export function ChatIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 15)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H9l-5 4z" />
    </svg>
  );
}

export function YoutubeIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 15)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinejoin="round" {...props}>
      <rect x="3" y="6" width="18" height="13" rx="4" />
      <path d="M10.5 10l4.5 2.5-4.5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowUpRightIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 12)} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function VideoCamIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 19)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="7" width="12" height="10" rx="2.5" />
      <path d="M15 10.5l6-3v9l-6-3" />
    </svg>
  );
}

export function PlusIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 18)} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function SlidersIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 19)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
      <circle cx="9" cy="7" r="2.4" fill="var(--card, #fff)" />
      <circle cx="15" cy="12" r="2.4" fill="var(--card, #fff)" />
      <circle cx="7" cy="17" r="2.4" fill="var(--card, #fff)" />
    </svg>
  );
}

export function SunIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 19)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.8 1.8M17.2 17.2L19 19M19 5l-1.8 1.8M6.8 17.2L5 19" />
    </svg>
  );
}

export function MoonIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, 19)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 13.5A8.5 8.5 0 1 1 10.5 4 6.8 6.8 0 0 0 20 13.5z" />
    </svg>
  );
}
