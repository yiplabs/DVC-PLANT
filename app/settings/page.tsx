"use client";

import { useTheme } from "@/components/ThemeProvider";

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      className={`toggle${on ? " on" : ""}`}
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
    >
      <i />
    </button>
  );
}

export default function SettingsPage() {
  const { theme, toggleTheme, particles, setParticles } = useTheme();

  return (
    <main className="settings-main page-scroll">
      <div className="micro-label">Settings</div>
      <h1 className="page-h1">Make it yours</h1>
      <p className="page-sub">Theme and garden ambience — more settings land with the real app.</p>

      <div className="card settings-card">
        <div className="settings-row">
          <div style={{ flex: 1 }}>
            <div className="settings-row-title">Dark mode</div>
            <div className="settings-row-sub">Nighttime garden — deep purple, brighter glow.</div>
          </div>
          <Toggle on={theme === "dark"} onClick={toggleTheme} label="Toggle dark mode" />
        </div>
        <div className="settings-row">
          <div style={{ flex: 1 }}>
            <div className="settings-row-title">Golden particles</div>
            <div className="settings-row-sub">Floating sparkles around your plant on the Garden stage.</div>
          </div>
          <Toggle on={particles} onClick={() => setParticles(!particles)} label="Toggle particles" />
        </div>
      </div>
    </main>
  );
}
