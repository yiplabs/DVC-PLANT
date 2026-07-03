"use client";

import {
  CheckIcon,
  DocIcon,
  DownloadIcon,
  LockIcon,
  PlayIcon,
  TargetIcon,
} from "@/components/icons";
import { quests } from "@/lib/data";

export default function QuestsPage() {
  return (
    <>
      <main className="quests-main page-scroll">
        <div style={{ maxWidth: 980 }}>
          <div className="micro-label">Quests</div>
          <h1 className="page-h1">Grow your project</h1>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--secondary)" }}>
              Three quests to get RankKit out the door — each one comes with a mini course and a PDF guide.
            </p>
            <span className="status-chip tone-lavender" style={{ fontSize: 12, padding: "6px 13px", textTransform: "none", letterSpacing: 0 }}>
              1 of 3 complete
            </span>
            <span className="status-chip tone-amber" style={{ fontSize: 12, padding: "6px 13px", textTransform: "none", letterSpacing: 0 }}>
              +40 XP earned
            </span>
          </div>

          <div className="quest-path">
            {quests.map((q) => (
              <div key={q.order} className="quest-row">
                <div className="quest-node-col">
                  <div className={`quest-node ${q.state}`}>
                    {q.state === "done" && <CheckIcon size={24} strokeWidth={3.4} />}
                    {q.state === "active" && <TargetIcon size={24} />}
                    {q.state === "locked" && <LockIcon size={22} />}
                  </div>
                </div>
                <div className={`quest-card ${q.state}`}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className={`quest-kicker ${q.state}`}>
                      Quest {q.order}
                      {q.state === "active" && " · In progress"}
                    </div>
                    <div className={`quest-title ${q.state}`}>{q.title}</div>
                    <p className={`quest-desc ${q.state}`}>{q.description}</p>
                    <div className="quest-chips">
                      <span className={`quest-chip ${q.state === "locked" ? "locked" : "course"}`}>
                        <PlayIcon size={11} />
                        {q.courseMinutes}-min course
                      </span>
                      {q.state === "locked" ? (
                        <span className="quest-chip locked">
                          <DocIcon size={12} />
                          {q.pdfName}
                        </span>
                      ) : (
                        <a
                          className="quest-chip pdf"
                          href={`/guides/${q.pdfName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <DocIcon size={12} />
                          {q.pdfName}
                        </a>
                      )}
                      <span className={`quest-chip ${q.state === "locked" ? "locked" : "xp"}`}>
                        +{q.xp} XP
                      </span>
                    </div>
                  </div>
                  {q.state === "done" && <span className="quest-done-chip">Completed</span>}
                  {q.state === "active" && <button className="quest-cta">Continue quest</button>}
                  {q.state === "locked" && (
                    <span className="quest-locked-chip">
                      <LockIcon size={13} />
                      Finish quest 2 first
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <aside className="rail-340">
        <div className="card learning-card">
          <div className="card-label">Continue learning</div>
          <div className="video-tile">
            <div className="video-play">
              <PlayIcon size={20} fill="#6c5ce7" style={{ marginLeft: 2 }} />
            </div>
            <span className="video-duration">8:24</span>
          </div>
          <div className="lesson-title">Naming &amp; domains</div>
          <div className="lesson-meta">Lesson 1 of 3 · with keeper Ines</div>
          <div className="meter lesson-progress">
            <i style={{ width: "35%" }} />
          </div>
          <button className="btn-primary" style={{ marginTop: 14, fontSize: 14, padding: 12 }}>
            Resume course
          </button>
        </div>
        <a
          className="card pdf-row"
          href="/guides/domain-checklist.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="pdf-tile">
            <DocIcon size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="pdf-name">domain-checklist.pdf</div>
            <div className="pdf-meta">2 pages · updated May 2026</div>
          </div>
          <span className="pdf-download" aria-label="Open PDF">
            <DownloadIcon />
          </span>
        </a>
      </aside>
    </>
  );
}
