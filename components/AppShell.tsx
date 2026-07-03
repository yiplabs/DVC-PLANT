"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import {
  BellIcon,
  FolderIcon,
  GearIcon,
  HomeIcon,
  LogoSproutIcon,
  MoonIcon,
  QuestIcon,
  SearchIcon,
  SproutIcon,
  StageIcon,
  SunIcon,
  TrophyIcon,
} from "@/components/icons";

const NAV = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Garden", href: "/garden", icon: SproutIcon },
  { label: "Quests", href: "/quests", icon: QuestIcon },
  { label: "Stage", href: "/stage", icon: StageIcon },
  { label: "Submissions", href: "/submissions", icon: FolderIcon },
  { label: "Settings", href: "/settings", icon: GearIcon },
];

function isActive(href: string, pathname: string) {
  if (href === "/") return false; // Home routes to the garden directory
  return pathname === href || pathname.startsWith(href + "/");
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="shell">
      <header className="topbar">
        <div className="topbar-left">
          <div className="logo-tile">
            <LogoSproutIcon />
          </div>
          <span className="wordmark">Sproutly</span>
        </div>
        <div className="searchbar">
          <SearchIcon />
          <input type="text" placeholder="Search the garden…" aria-label="Search the garden" />
        </div>
        <div className="topbar-right">
          <button
            className="topbar-icon-btn"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            onClick={toggleTheme}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <button className="topbar-icon-btn" aria-label="Notifications">
            <BellIcon />
          </button>
          <button className="topbar-icon-btn" aria-label="Achievements">
            <TrophyIcon />
          </button>
          <div className="topbar-avatar">M</div>
        </div>
      </header>
      <div className="shell-body">
        <nav className="sidebar">
          {NAV.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={`nav-pill${isActive(href, pathname) ? " active" : ""}`}
            >
              <Icon />
              {label}
            </Link>
          ))}
        </nav>
        <div className="shell-content">{children}</div>
      </div>
    </div>
  );
}
