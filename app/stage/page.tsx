"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StageMascot } from "@/components/plants";
import {
  ArrowUpRightIcon,
  BellIcon,
  ChatIcon,
  CheckIcon,
  ChevronRightIcon,
  PlayIcon,
  SendIcon,
  StarIcon,
  VideoCamIcon,
} from "@/components/icons";
import { lineup, streamChannel } from "@/lib/data";

const LINEUP_TONE = {
  confirmed: "tone-emerald",
  waitlist: "tone-amber",
  pending: "tone-amber",
} as const;

const STREAM_AT = new Date("2026-07-09T17:00:00Z").getTime(); // Thu Jul 9 · 7 PM CET

const CHAT_ASKS = ["How do you make money?", "What's hardest right now?", "Demo the mobile view!"];

const SPARK_VECTORS = [
  [-46, -38],
  [42, -44],
  [-22, -58],
  [26, -30],
  [0, -62],
];

function useCountdown(target: number) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now === null) return null;
  const diff = target - now;
  if (diff <= 0) return "We're live!";
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return `Starts in ${d}d ${h}h ${m}m ${s}s`;
}

export default function StagePage() {
  const [length, setLength] = useState("3 min");
  const [reminded, setReminded] = useState(false);
  const [requested, setRequested] = useState(false);
  const [sparks, setSparks] = useState<number[]>([]);
  const [demoText, setDemoText] = useState(
    "The new ranking table, live — plus where I'm stuck on pricing.",
  );
  const countdown = useCountdown(STREAM_AT);

  const confirmedSpots = lineup.filter((r) => r.status === "confirmed").length + 1; // + your pending slot
  const request = () => {
    if (requested) return;
    setRequested(true);
    setSparks(SPARK_VECTORS.map((_, i) => i));
    setTimeout(() => setSparks([]), 750);
  };

  return (
    <main className="stage-main page-scroll">
      <div className="micro-label">Live showcase</div>
      <h1 className="page-h1">Pitch on stream</h1>
      <p className="page-sub">
        Demo your project live on the garden stream — the hosts and the chat ask you questions.
      </p>

      <div className="stream-hero2">
        <div className="date-tile on-gradient">
          <span className="date-month">JUL</span>
          <span className="date-day">9</span>
          <span className="date-dow">THU</span>
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div className="hero2-badge">
            <i />
            Next stream
          </div>
          <div className="stream-title2">Community pitch night #14</div>
          <div className="stream-meta2">
            <div className="avatar-stack">
              <div className="mini-avatar" style={{ background: "linear-gradient(135deg,#4834d4,#6c5ce7)", borderColor: "rgba(255,255,255,0.6)" }}>I</div>
              <div className="mini-avatar" style={{ background: "linear-gradient(135deg,#00cec9,#2eb872)", borderColor: "rgba(255,255,255,0.6)" }}>T</div>
            </div>
            <span>Hosted by keepers Ines &amp; Tom · 7:00 PM CET · streamed live to the garden</span>
          </div>
          <div className="hero2-chips">
            <span className="countdown-chip">{countdown ?? "…"}</span>
            <span className="hero2-chip">3 pitch spots left</span>
          </div>
        </div>
        <div className="hero2-mascot">
          <StageMascot />
        </div>
        <button className="btn-remind" onClick={() => setReminded(true)}>
          {reminded ? "Reminder set ✓" : "Remind me"}
        </button>
      </div>

      <div className="hiw">
        <div className="hiw-step">
          <div className="hiw-icon">
            <SendIcon size={17} />
          </div>
          <div>
            <div className="hiw-title">1 · Request a spot</div>
            <div className="hiw-sub">Tell us what you&apos;ll demo.</div>
          </div>
        </div>
        <ChevronRightIcon size={15} style={{ color: "var(--faint)", flex: "0 0 auto" }} />
        <div className="hiw-step">
          <div className="hiw-icon">
            <BellIcon size={17} />
          </div>
          <div>
            <div className="hiw-title">2 · Keeper confirms</div>
            <div className="hiw-sub">You&apos;ll get a DM before Thursday.</div>
          </div>
        </div>
        <ChevronRightIcon size={15} style={{ color: "var(--faint)", flex: "0 0 auto" }} />
        <div className="hiw-step">
          <div className="hiw-icon">
            <VideoCamIcon size={17} />
          </div>
          <div>
            <div className="hiw-title">3 · Pitch live + Q&amp;A</div>
            <div className="hiw-sub">Friendly Shark-Tank rules.</div>
          </div>
        </div>
      </div>

      <div className="stage-grid">
        {/* HANDOFF NOTE: founders only — this whole card should be hidden for
            gardeners without a project of their own. */}
        <div className="card request-card">
          <div className="card-label">Request a spot</div>
          <p className="page-sub" style={{ fontSize: 12.5, marginTop: 8 }}>
            For founders — you pitch your own plant.
          </p>

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

          <div className="field-label" style={{ marginTop: 16 }}>
            The chat usually asks
          </div>
          <div className="teaser-chips">
            {CHAT_ASKS.map((q) => (
              <span key={q} className="teaser-chip">
                <ChatIcon size={12} />
                {q}
              </span>
            ))}
          </div>

          <button
            className={`btn-primary request-btn${requested ? " requested" : ""}`}
            style={{ marginTop: 16 }}
            onClick={request}
          >
            {sparks.map((i) => (
              <span
                key={i}
                className="spark"
                style={{ "--dx": `${SPARK_VECTORS[i][0]}px`, "--dy": `${SPARK_VECTORS[i][1]}px` } as React.CSSProperties}
              >
                <StarIcon size={11} />
              </span>
            ))}
            {requested && <CheckIcon size={15} strokeWidth={3.4} />}
            {requested ? "Spot requested" : "Request my spot"}
          </button>
          <div className="form-microcopy">A keeper confirms your spot by DM before Thursday.</div>
        </div>

        <div className="card lineup-card">
          <div className="card-label">Thu Jul 9 · Lineup</div>
          <div className="spots-meter">
            <div className="meter" style={{ height: 9, flex: 1 }}>
              <i style={{ width: `${(confirmedSpots / 4) * 100}%` }} />
            </div>
            <span>{confirmedSpots} of 4 spots filled</span>
          </div>
          <div className="lineup-list">
            {lineup.map((row) => (
              <Link
                key={row.project}
                href={`/garden/${row.slug}`}
                className={`lineup-row${"mine" in row && row.mine ? " mine" : ""}${
                  "mine" in row && row.mine && requested ? " pulse" : ""
                }`}
              >
                <span className="time-pill">{row.time}</span>
                <div
                  className="lineup-logo"
                  style={{ background: row.gradient, borderRadius: row.radius }}
                >
                  {row.initial}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="lineup-name">{row.project}</div>
                  <div className="lineup-sub-row">
                    <div
                      className="mini-avatar"
                      style={{ width: 17, height: 17, fontSize: 8, background: row.founder.gradient, borderWidth: 1.5 }}
                    >
                      {row.founder.initial}
                    </div>
                    <span className="lineup-sub">{row.subtitle}</span>
                  </div>
                </div>
                <span className={`status-chip ${LINEUP_TONE[row.status]}`}>{row.status}</span>
              </Link>
            ))}
          </div>
          <div className="lineup-footer">
            Hosts pick four pitches per stream — tap a project to visit its garden.
          </div>
        </div>
      </div>

      <div className="card-label" style={{ marginTop: 28 }}>
        Past pitch nights
      </div>
      {/* Streams aren't recorded per project — one big door to the channel */}
      <a className="stream-cta" href={streamChannel.url} target="_blank" rel="noopener noreferrer">
        <span className="stream-cta-play">
          <PlayIcon size={20} fill="#6c5ce7" style={{ marginLeft: 2 }} />
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span className="stream-cta-title">Watch past pitch nights on the stream</span>
          <span className="stream-cta-sub">
            Every pitch night is streamed live and lives on our channel — replays, Q&amp;As, all of it.
          </span>
        </span>
        <span className="stream-cta-chip">
          {streamChannel.handle}
          <ArrowUpRightIcon size={12} />
        </span>
      </a>
    </main>
  );
}
