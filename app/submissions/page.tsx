"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons";
import { G, submissions as seed, type Submission, type SubmissionStatus } from "@/lib/data";

type Filter = "all" | SubmissionStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "considering", label: "Considering" },
  { key: "planned", label: "Planned" },
  { key: "shipped", label: "Shipped" },
];

const STATUS_TONE: Record<SubmissionStatus, string> = {
  considering: "tone-amber",
  planned: "tone-emerald",
  shipped: "tone-teal",
};

export default function SubmissionsPage() {
  const [items, setItems] = useState<Submission[]>(seed);
  const [filter, setFilter] = useState<Filter>("all");
  const [draft, setDraft] = useState("");

  const visible = filter === "all" ? items : items.filter((s) => s.status === filter);

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
              {f.label}
              {f.key === "all" && ` · ${items.length}`}
            </button>
          ))}
        </div>

        <div className="submission-list">
          {visible.map((s) => (
            <div key={s.id} className="submission-card">
              <div className="submission-avatar" style={{ background: s.gradient }}>
                {s.initial}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="submission-author">{s.author}</span>
                  <span className="submission-time">{s.time}</span>
                </div>
                <div className="submission-text">{s.text}</div>
                {s.founderReply && <div className="founder-reply">{s.founderReply}</div>}
              </div>
              <div className="submission-side">
                <button
                  className={`upvote-pill${s.viewerUpvoted ? " voted" : ""}`}
                  onClick={() => toggleVote(s.id)}
                >
                  <ChevronUpIcon />
                  {s.upvotes}
                </button>
                {s.status && (
                  <span className={`status-chip ${STATUS_TONE[s.status]}`}>{s.status}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <aside className="rail-340" style={{ paddingTop: 40 }}>
        <div className="card composer-card">
          <div className="card-label">Add a submission</div>
          <textarea
            className="faux-textarea"
            placeholder="I would like to see…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
          />
          <button className="btn-primary" style={{ marginTop: 14, fontSize: 14 }} onClick={submit}>
            Submit to the folder
          </button>
          <div className="composer-note">Founders read every submission and set a status.</div>
        </div>
      </aside>
    </>
  );
}
