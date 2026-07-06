"use client";

import { useState } from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, FlameIcon, FolderIcon } from "@/components/icons";
import { SeedSprout } from "@/components/plants";
import { G, submissions as seed, type Submission, type SubmissionStatus } from "@/lib/data";

type Filter = "all" | SubmissionStatus;

const STATUS_COLOR: Record<SubmissionStatus, string> = {
  considering: "#fbbf24",
  planned: "#2eb872",
  shipped: "#00cec9",
};

const STATUS_TONE: Record<SubmissionStatus, string> = {
  considering: "tone-amber",
  planned: "tone-emerald",
  shipped: "tone-teal",
};

const STARTERS = ["I would like to see…", "It would help if…", "It bugs me that…"];

export default function SubmissionsPage() {
  const [items, setItems] = useState<Submission[]>(seed);
  const [filter, setFilter] = useState<Filter>("all");
  const [draft, setDraft] = useState("");

  const counts: Record<SubmissionStatus, number> = {
    considering: items.filter((s) => s.status === "considering").length,
    planned: items.filter((s) => s.status === "planned").length,
    shipped: items.filter((s) => s.status === "shipped").length,
  };
  const totalVotes = items.reduce((n, s) => n + s.upvotes, 0);

  const FILTERS: { key: Filter; label: string; count: number; dot?: string }[] = [
    { key: "all", label: "All", count: items.length },
    { key: "considering", label: "Considering", count: counts.considering, dot: STATUS_COLOR.considering },
    { key: "planned", label: "Planned", count: counts.planned, dot: STATUS_COLOR.planned },
    { key: "shipped", label: "Shipped", count: counts.shipped, dot: STATUS_COLOR.shipped },
  ];

  const visible = filter === "all" ? items : items.filter((s) => s.status === filter);

  // The community's loudest open ask gets the spotlight (All view only)
  const spotlight =
    filter === "all"
      ? [...items].filter((s) => s.status !== "shipped").sort((a, b) => b.upvotes - a.upvotes)[0]
      : undefined;
  const listed = spotlight ? visible.filter((s) => s.id !== spotlight.id) : visible;

  const toggleVote = (id: number) => {
    setItems((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, viewerUpvoted: !s.viewerUpvoted, upvotes: s.upvotes + (s.viewerUpvoted ? -1 : 1) }
          : s,
      ),
    );
  };

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    setItems((prev) => [
      {
        id: Math.max(...prev.map((s) => s.id)) + 1,
        author: "You",
        initial: "M",
        gradient: G.purpleTeal,
        time: "just now",
        text,
        upvotes: 1,
        viewerUpvoted: true,
      },
      ...prev,
    ]);
    setDraft("");
  };

  const renderCard = (s: Submission, isSpotlight = false) => (
    <div
      key={s.id}
      className={`submission-card${isSpotlight ? " spotlight" : ""}${s.status ? " has-accent" : ""}`}
    >
      {s.status && <i className="sub-accent" style={{ background: STATUS_COLOR[s.status] }} />}
      <div className="ring-avatar" style={{ background: s.gradient, width: 42, height: 42, flex: "0 0 42px" }}>
        <i>{s.initial}</i>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span className="submission-author">{s.author}</span>
          <span className="submission-time">{s.time}</span>
          {isSpotlight && (
            <span className="most-wanted-chip">
              <FlameIcon size={11} />
              Most wanted
            </span>
          )}
        </div>
        <div className="submission-text">{s.text}</div>
        {s.founderReply && (
          <div className="founder-reply">
            <div
              className="mini-avatar"
              style={{ width: 20, height: 20, fontSize: 9, background: G.purpleTeal, borderColor: "transparent", flex: "0 0 20px" }}
            >
              {s.founderReply[0]}
            </div>
            <span>{s.founderReply}</span>
          </div>
        )}
      </div>
      <div className="submission-side">
        <button
          className={`vote-btn${s.viewerUpvoted ? " voted" : ""}`}
          aria-label={`Upvote — ${s.upvotes} votes`}
          onClick={() => toggleVote(s.id)}
        >
          <ChevronUpIcon size={12} />
          {s.upvotes}
        </button>
        {s.status && <span className={`status-chip ${STATUS_TONE[s.status]}`}>{s.status}</span>}
      </div>
    </div>
  );

  return (
    <>
      <main className="submissions-main page-scroll">
        <div className="directory-head">
          <div>
            <div className="micro-label">Submission folder</div>
            <h1 className="page-h1">RankKit submissions</h1>
            <p className="page-sub">
              Everything the community has asked for, in one place — founders read them all.
            </p>
            <div className="pulse-row">
              <span className="pulse-item">
                <FolderIcon size={14} style={{ color: "var(--chip-purple-text)" }} />
                {items.length} requests
              </span>
              <span className="pulse-item">
                <ChevronUpIcon size={13} style={{ color: "var(--chip-purple-text)" }} />
                {totalVotes} upvotes
              </span>
              <span className="pulse-item">
                <CheckIcon size={12} strokeWidth={3.4} style={{ color: "#0a9490" }} />
                {counts.shipped} shipped
              </span>
            </div>
          </div>
          <button className="project-switcher">
            <div className="switcher-logo" style={{ background: "linear-gradient(135deg,#6c5ce7,#4834d4)" }}>
              R
            </div>
            <span style={{ fontWeight: 800, fontSize: 14, color: "var(--ink)" }}>RankKit</span>
            <ChevronDownIcon size={13} style={{ color: "var(--muted)" }} />
          </button>
        </div>

        <div className="chip-row" style={{ marginTop: 16, paddingBottom: 0 }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-chip${filter === f.key ? " active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.dot && <i className="chip-dot" style={{ background: f.dot }} />}
              {f.label} · {f.count}
            </button>
          ))}
        </div>

        <div className="submission-list">
          {spotlight && renderCard(spotlight, true)}
          {listed.map((s) => renderCard(s))}
          {!spotlight && listed.length === 0 && (
            <div className="sub-empty">
              <SeedSprout size={44} />
              <div className="sub-empty-title">Nothing here yet</div>
              <div className="sub-empty-sub">Be the first — plant an idea in the folder.</div>
            </div>
          )}
        </div>
      </main>

      <aside className="rail-340" style={{ paddingTop: 40 }}>
        <div className="card composer-card">
          <div className="card-label">Add a submission</div>
          <div className="composer-as">
            <div
              className="mini-avatar"
              style={{ width: 22, height: 22, fontSize: 10, background: G.purpleTeal, borderColor: "transparent", flex: "0 0 22px" }}
            >
              M
            </div>
            <span>
              Posting as <b>you</b> — founders see your name
            </span>
          </div>
          <textarea
            className="faux-textarea"
            placeholder="I would like to see…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
          />
          <div className="teaser-chips" style={{ marginTop: 10 }}>
            {STARTERS.map((t) => (
              <button key={t} className="teaser-chip starter" onClick={() => setDraft(`${t.replace("…", "")} `)}>
                {t}
              </button>
            ))}
          </div>
          <button className="btn-primary" style={{ marginTop: 14, fontSize: 14 }} onClick={submit}>
            Submit to the folder
          </button>
          <div className="composer-note">Founders read every submission and set a status.</div>
        </div>
      </aside>
    </>
  );
}
