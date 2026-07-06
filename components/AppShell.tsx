"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import {
  BellIcon,
  ChevronDownIcon,
  FolderIcon,
  GearIcon,
  HomeIcon,
  LogoSproutIcon,
  MoonIcon,
  QuestIcon,
  SearchIcon,
  SlidersIcon,
  SproutIcon,
  StageIcon,
  SunIcon,
  TrophyIcon,
} from "@/components/icons";

// HANDOFF NOTE — navigation contract with the host app:
// The whole showcase occupies exactly ONE tab in the host sidebar. Its label
// will likely be just "Projects" (the host menu is already crowded); the pages
// below are sub-pages of that single tab, reached by clicking through it.
// The disclosure nav here models that; swap it for the host's own pattern
// (accordion, secondary nav, breadcrumbs) without touching the pages.
const SECTION = [
  { label: "All Projects", href: "/garden", icon: HomeIcon },
  { label: "Quests", href: "/quests", icon: QuestIcon },
  { label: "Stage", href: "/stage", icon: StageIcon },
  { label: "Submissions", href: "/submissions", icon: FolderIcon },
];

function isActive(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [navOpen, setNavOpen] = useState(false);

  // Deep links into a section page reveal the submenu so you can see where you are
  useEffect(() => {
    if (SECTION.some((c) => c.href !== "/garden" && isActive(c.href, pathname))) {
      setNavOpen(true);
    }
  }, [pathname]);

  const sectionActive = SECTION.some((c) => isActive(c.href, pathname));

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
          <button
            className={`nav-pill nav-parent${sectionActive && !navOpen ? " active" : ""}`}
            aria-expanded={navOpen}
            onClick={() => setNavOpen((o) => !o)}
          >
            <SproutIcon />
            <span className="nav-parent-text">
              Garden
              <small>Project showcase</small>
            </span>
            <ChevronDownIcon size={13} className={`nav-chev${navOpen ? " open" : ""}`} />
          </button>
          {navOpen && (
            <div className="nav-sub">
              {SECTION.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className={`nav-pill nav-sub-pill${isActive(href, pathname) ? " active" : ""}`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </div>
          )}
          <div className="nav-bottom">
            <Link
              href="/admin"
              className={`nav-pill${isActive("/admin", pathname) ? " active" : ""}`}
            >
              <SlidersIcon />
              Admin panel
            </Link>
            <Link
              href="/settings"
              className={`nav-pill${isActive("/settings", pathname) ? " active" : ""}`}
            >
              <GearIcon />
              Settings
            </Link>
          </div>
        </nav>
        <div className="shell-content">{children}</div>
      </div>
    </div>
  );
}
