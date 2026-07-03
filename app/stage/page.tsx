"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/icons";
import { lineup } from "@/lib/data";

const LINEUP_TONE = {
  confirmed: "tone-emerald",
  waitlist: "tone-amber",
  pending: "tone-amber",
} as const;

export default function StagePage() {
  const [length, setLength] = useState("3 min");
  const [reminded, setReminded] = useState(false);
  const [requested, setRequested] = useState(false);
  const [demoText, setDemoText] = useState(
    "The new ranking table, live — plus where I'm stuck on pricing.",
  );

  return (
    <main className="stage-main page-scroll">
      <div className="micro-label">Live showcase</div>
      <h1 className="page-h1">Pitch on stream</h1>
      <p className="page-sub">
        Demo your project live on the garden stream — the hosts and the chat ask you questions.
      </p>

      <div className="card stream-hero">
        <div className="date-tile">
          <span className="date-month">JUL</span>
          <span className="date-day">9</span>
          <span className="date-dow">THU</span>
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div className="stream-title">Community pitch night #14</div>
          <div className="stream-meta">
            <div className="avatar-stack">
              <div className="mini-avatar" style={{ background: "linear-gradient(135deg,#4834d4,#6c5ce7)" }}>I</div>
              <div className="mini-avatar" style={{ background: "linear-gradient(135deg,#00cec9,#2eb872)" }}>T</div>
            </div>
            <span>Hosted by keepers Ines &amp; Tom · 7:00 PM CET · streamed live to the garden</span>
          </div>
        </div>
        <span className="spots-chip">3 pitch spots left</span>
        <button className="btn-lavender" onClick={() => setReminded(true)}>
          {reminded ? "Reminder set ✓" : "Remind me"}
        </button>
      </div>

      <div className="stage-grid">
        <div className="card request-card">
          <div className="card-label">Request a spot</div>

          <div className="field-label" style={{ marginTop: 16 }}>
            Your project
          </div>
          <div className="selected-project">
            <div className="selected-logo" style={{ background: "linear-gradient(135deg,#6c5ce7,#4834d4)" }}>
              R
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: 16, color: "var(--ink)" }}>RankKit</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)" }}>
                Flowering · 80% health
              </div>
            </div>
            <div className="selected-check">
              <CheckIcon size={12} />
            </div>
          </div>

          <div className="field-label" style={{ marginTop: 16 }}>
            What will you demo?
          </div>
          <textarea
            className="faux-textarea"
            style={{ marginTop: 8, minHeight: 88 }}
            value={demoText}
            onChange={(e) => setDemoText(e.target.value)}
            rows={3}
          />

          <div className="field-label" style={{ marginTop: 16 }}>
            Pitch length
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            {["3 min", "5 min", "8 min"].map((l) => (
              <button
                key={l}
                className={`length-chip${length === l ? " active" : ""}`}
                onClick={() => setLength(l)}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="form-note">
            After the demo, the hosts and the chat ask questions — friendly Shark Tank rules.
          </div>
          <button
            className="btn-primary"
            style={{ marginTop: 14 }}
            onClick={() => setRequested(true)}
          >
            {requested ? "Spot requested ✓" : "Request my spot"}
          </button>
          <div className="form-microcopy">A keeper confirms your spot by DM before Thursday.</div>
        </div>

        <div className="card lineup-card">
          <div className="card-label">Thu Jul 9 · Lineup</div>
          <div className="lineup-list">
            {lineup.map((row) => (
              <div key={row.project} className={`lineup-row${"mine" in row && row.mine ? " mine" : ""}`}>
                <span className="time-pill">{row.time}</span>
                <div
                  className="lineup-logo"
                  style={{ background: row.gradient, borderRadius: row.radius }}
                >
                  {row.initial}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="lineup-name">{row.project}</div>
                  <div className="lineup-sub">{row.subtitle}</div>
                </div>
                <span className={`status-chip ${LINEUP_TONE[row.status]}`}>{row.status}</span>
              </div>
            ))}
          </div>
          <div className="lineup-footer">
            Hosts pick four pitches per stream — replays land on the project's garden page.
          </div>
        </div>
      </div>
    </main>
  );
}
