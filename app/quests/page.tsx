"use client";

// Quests = the project's roadmap.
//
// HANDOFF NOTE: the three curated quests come with a course + PDF; founders
// can append their own roadmap quests (persisted as overrides.customQuests).
// Completing any quest advances the plant one milestone (overrides.stage), so
// the roadmap and the garden plant stay visibly linked. Milestones can also
// be set by hand in /admin. Founder-only bits (adding/removing quests) need
// role gating once auth exists.

import { useEffect, useState } from "react";
import Link from "next/link";
import { PotMascot, TIER_NAMES, type HeroStage } from "@/components/plants";
import {
  CheckIcon,
  DocIcon,
  DownloadIcon,
  LockIcon,
  PlayIcon,
  PlusIcon,
  StarIcon,
  TargetIcon,
  XSocialIcon,
} from "@/components/icons";
import { milestoneLabels, quests, type QuestState } from "@/lib/data";
import { loadOverrides, saveOverrides } from "@/lib/overrides";

const SLUG = "rankkit"; // the signed-in founder's project (mock)
const XP_PER_LEVEL = 120;
const BASE_LEVEL = 5;
const CUSTOM_QUEST_XP = 40;

type RoadmapQuest = {
  title: string;
  description?: string;
  courseMinutes?: number;
  pdfName?: string;
  xp: number;
  /** curated quests carry their course/lesson id; founder quests don't */
  courseId?: number;
  custom?: boolean;
};

type RoadmapItem = { quest: RoadmapQuest; state: QuestState };

const BASE_ITEMS: RoadmapItem[] = quests.map((q) => ({
  quest: {
    title: q.title,
    description: q.description,
    courseMinutes: q.courseMinutes,
    pdfName: q.pdfName,
    xp: q.xp,
    courseId: q.order,
  },
  state: q.state,
}));

const LESSONS: Record<number, { name: string; dur: string; progress: number }[]> = {
  1: [
    { name: "Pick your one-pager stack", dur: "3:12", progress: 100 },
    { name: "Write the hero line", dur: "4:05", progress: 100 },
    { name: "Ship it in an afternoon", dur: "4:43", progress: 100 },
  ],
  2: [
    { name: "Why names stick", dur: "2:41", progress: 35 },
    { name: "The radio test", dur: "3:05", progress: 0 },
    { name: "Claim it everywhere", dur: "2:38", progress: 0 },
  ],
  3: [
    { name: "Find where your users hang out", dur: "5:00", progress: 0 },
    { name: "Write the launch post", dur: "5:20", progress: 0 },
    { name: "Invite the garden", dur: "4:40", progress: 0 },
  ],
};

const SPARK_VECTORS = [
  [-46, -38],
  [42, -44],
  [-22, -58],
  [26, -30],
  [0, -62],
  [-52, -12],
  [54, -16],
];

/** Keep the chain honest: done stays done, first open quest is active, rest locked */
function normalize(items: RoadmapItem[]): RoadmapItem[] {
  let activeAssigned = false;
  return items.map((it) => {
    if (it.state === "done") return it;
    if (!activeAssigned) {
      activeAssigned = true;
      return { ...it, state: "active" as QuestState };
    }
    return { ...it, state: "locked" as QuestState };
  });
}

function LevelRing({ level, progress }: { level: number; progress: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="levelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6c5ce7" />
          <stop offset="1" stopColor="#00cec9" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r={r} fill="none" stroke="var(--lavender)" strokeWidth="7" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="url(#levelGrad)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - progress)}
        transform="rotate(-90 32 32)"
        style={{ transition: "stroke-dashoffset 500ms ease-out" }}
      />
      <text
        x="32"
        y="39"
        textAnchor="middle"
        fontSize="20"
        fontWeight="900"
        fill="var(--ink)"
        fontFamily="inherit"
      >
        {level}
      </text>
    </svg>
  );
}

export default function QuestsPage() {
  const [items, setItems] = useState<RoadmapItem[]>(BASE_ITEMS);
  const [plantStage, setPlantStage] = useState<number>(5);
  const [sparkQuest, setSparkQuest] = useState<number | null>(null);
  const [lessonQuest, setLessonQuest] = useState<number | null>(null);
  const [newQuest, setNewQuest] = useState("");

  useEffect(() => {
    const o = loadOverrides(SLUG);
    if (o.stage) setPlantStage(Math.min(8, Math.max(1, Math.round(o.stage))));
    if (o.customQuests?.length) {
      setItems(
        normalize([
          ...BASE_ITEMS,
          ...o.customQuests.map((c) => ({
            quest: { title: c.title, xp: c.xp, custom: true },
            state: "locked" as QuestState,
          })),
        ]),
      );
    }
  }, []);

  const done = items.filter((it) => it.state === "done").length;
  const xpEarned = items.reduce((sum, it) => (it.state === "done" ? sum + it.quest.xp : sum), 0);
  const level = BASE_LEVEL + Math.floor(xpEarned / XP_PER_LEVEL);
  const xpInto = xpEarned % XP_PER_LEVEL;
  const remaining = items.length - done;

  const cheer =
    remaining === 0
      ? "The roadmap is done — RankKit is launch-ready, go pitch it on stream!"
      : remaining === 1
        ? "One more quest and RankKit is launch-ready!"
        : `${remaining} quests between RankKit and launch day — steady grows it.`;

  const persistCustoms = (next: RoadmapItem[]) => {
    saveOverrides(SLUG, {
      customQuests: next
        .filter((it) => it.quest.custom)
        .map((it) => ({ title: it.quest.title, xp: it.quest.xp })),
    });
  };

  const completeQuest = (index: number) => {
    setItems((prev) =>
      normalize(prev.map((it, i) => (i === index ? { ...it, state: "done" as QuestState } : it))),
    );
    // Completing a roadmap quest grows the plant one milestone
    setPlantStage((s) => {
      const next = Math.min(7, s + 1);
      saveOverrides(SLUG, { stage: next });
      return next;
    });
    setSparkQuest(index);
    setTimeout(() => setSparkQuest(null), 800);
  };

  const addQuest = () => {
    const title = newQuest.trim();
    if (!title) return;
    setItems((prev) => {
      const next = normalize([
        ...prev,
        { quest: { title, xp: CUSTOM_QUEST_XP, custom: true }, state: "locked" as QuestState },
      ]);
      persistCustoms(next);
      return next;
    });
    setNewQuest("");
  };

  const removeQuest = (index: number) => {
    setItems((prev) => {
      const next = normalize(prev.filter((_, i) => i !== index));
      persistCustoms(next);
      return next;
    });
  };

  const openItem = lessonQuest !== null ? items[lessonQuest] : null;
  const openLessons = openItem?.quest.courseId ? LESSONS[openItem.quest.courseId] : [];
  const courseProgress = openLessons.length
    ? Math.round(openLessons.reduce((s, l) => s + l.progress, 0) / openLessons.length)
    : 0;

  return (
    <>
      <main className="quests-main page-scroll">
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          <div style={{ maxWidth: 980, flex: 1 }}>
            <div className="micro-label">Quests</div>
            <h1 className="page-h1">Grow your project</h1>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--secondary)" }}>
                Your roadmap to launch — every quest you finish grows the plant one milestone.
              </p>
              <span className="status-chip tone-lavender" style={{ fontSize: 12, padding: "6px 13px", textTransform: "none", letterSpacing: 0 }}>
                {done} of {items.length} complete
              </span>
              <span className="status-chip tone-amber" style={{ fontSize: 12, padding: "6px 13px", textTransform: "none", letterSpacing: 0 }}>
                +{xpEarned} XP earned
              </span>
            </div>

            <div className="quest-path">
              {items.map((it, i) => {
                const q = it.quest;
                const state = it.state;
                return (
                  <div key={`${q.title}-${i}`} className="quest-row">
                    <div className="quest-node-col">
                      <div className={`quest-node ${state}`}>
                        {state === "done" && <CheckIcon size={24} strokeWidth={3.4} />}
                        {state === "active" && <TargetIcon size={24} />}
                        {state === "locked" && <LockIcon size={22} />}
                      </div>
                    </div>
                    <div className={`quest-card ${state}`}>
                      {sparkQuest === i && (
                        <span className="quest-sparks">
                          {SPARK_VECTORS.map(([dx, dy], s) => (
                            <span
                              key={s}
                              className="spark"
                              style={{ "--dx": `${dx}px`, "--dy": `${dy}px` } as React.CSSProperties}
                            >
                              <StarIcon size={12} />
                            </span>
                          ))}
                        </span>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className={`quest-kicker ${state}`}>
                          Quest {i + 1}
                          {q.custom && " · Yours"}
                          {state === "active" && " · In progress"}
                        </div>
                        <div className={`quest-title ${state}`}>{q.title}</div>
                        {q.description && <p className={`quest-desc ${state}`}>{q.description}</p>}
                        <div className="quest-chips">
                          {q.courseId && (
                            state === "locked" ? (
                              <span className="quest-chip locked">
                                <PlayIcon size={11} />
                                {q.courseMinutes}-min course
                              </span>
                            ) : (
                              <button className="quest-chip course" onClick={() => setLessonQuest(i)}>
                                <PlayIcon size={11} />
                                {q.courseMinutes}-min course
                              </button>
                            )
                          )}
                          {q.pdfName &&
                            (state === "locked" ? (
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
                            ))}
                          {q.custom && (
                            <span className={`quest-chip ${state === "locked" ? "locked" : "course"}`}>
                              Your roadmap
                            </span>
                          )}
                          <span className={`quest-chip ${state === "locked" ? "locked" : "xp"}`}>
                            +{q.xp} XP
                          </span>
                        </div>
                      </div>
                      {state === "done" && <span className="quest-done-chip">Completed</span>}
                      {state === "active" && (
                        <button className="quest-cta" onClick={() => completeQuest(i)}>
                          Complete quest
                        </button>
                      )}
                      {state === "locked" && (
                        <span className="quest-locked-chip">
                          <LockIcon size={13} />
                          Finish quest {i} first
                        </span>
                      )}
                      {q.custom && (
                        <button
                          className="row-icon-btn danger"
                          aria-label={`Remove ${q.title}`}
                          onClick={() => removeQuest(i)}
                        >
                          <XSocialIcon size={11} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Founders extend the roadmap with their own quests */}
              <div className="quest-row">
                <div className="quest-node-col">
                  <div className="quest-node add">
                    <PlusIcon size={20} />
                  </div>
                </div>
                <div className="quest-card add-quest">
                  <input
                    className="text-input"
                    style={{ marginTop: 0 }}
                    placeholder="Add to your roadmap — e.g. Interview five gardeners"
                    value={newQuest}
                    onChange={(e) => setNewQuest(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addQuest()}
                  />
                  <button className="btn-lavender" style={{ whiteSpace: "nowrap", fontWeight: 900 }} onClick={addQuest}>
                    Add quest
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="cheer">
            <div className="cheer-bubble">{cheer}</div>
            <PotMascot width={150} height={120} />
          </div>
        </div>
      </main>

      <aside className="rail-340">
        <div className="card level-card">
          <LevelRing level={level} progress={xpInto / XP_PER_LEVEL} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="card-label">Your level</div>
            <div className="level-title">Level {level}</div>
            <div className="meter" style={{ height: 9, marginTop: 8 }}>
              <i style={{ width: `${(xpInto / XP_PER_LEVEL) * 100}%` }} />
            </div>
            <div className="level-caption">
              {XP_PER_LEVEL - xpInto} XP to Level {level + 1}
            </div>
          </div>
        </div>

        <div className="card rail-milestones">
          <div className="card-label">
            Plant milestones · <span style={{ color: "var(--stage-name-text)" }}>{TIER_NAMES[Math.min(8, plantStage) as HeroStage]}</span>
          </div>
          <div className="rail-milestone-track">
            <div className="rail-milestone-line" />
            {milestoneLabels.map((label, i) => {
              const state = i < plantStage - 1 ? "done" : i === plantStage - 1 ? "current" : "upcoming";
              return (
                <div key={label} className="rail-milestone-row">
                  <div className={`milestone-node small ${state}`}>
                    {state === "done" && <CheckIcon size={11} />}
                    {state === "current" && <i />}
                  </div>
                  <span className={`rail-milestone-label ${state}`}>{label}</span>
                </div>
              );
            })}
          </div>
          <div className="composer-note" style={{ textAlign: "left", marginTop: 8 }}>
            Each finished quest grows the plant one milestone.
          </div>
          <Link href="/admin" className="btn-visit" style={{ display: "inline-block", marginTop: 10 }}>
            Adjust in Admin panel
          </Link>
        </div>

        <div className="card learning-card">
          <div className="card-label">Continue learning</div>
          <button className="video-tile" onClick={() => setLessonQuest(1)} style={{ width: "100%" }}>
            <div className="video-play">
              <PlayIcon size={20} fill="#6c5ce7" style={{ marginLeft: 2 }} />
            </div>
            <span className="video-duration">8:24</span>
          </button>
          <div className="lesson-title">Naming &amp; domains</div>
          <div className="lesson-meta">Lesson 1 of 3 · with keeper Ines</div>
          <div className="meter lesson-progress">
            <i style={{ width: "35%" }} />
          </div>
          <button
            className="btn-primary"
            style={{ marginTop: 14, fontSize: 14, padding: 12 }}
            onClick={() => setLessonQuest(1)}
          >
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

      {openItem && openItem.quest.courseId && (
        <div className="modal-overlay" onClick={() => setLessonQuest(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="Close" onClick={() => setLessonQuest(null)}>
              <XSocialIcon size={12} />
            </button>
            <div className="card-label">
              {openItem.quest.courseMinutes}-min course
            </div>
            <div style={{ marginTop: 4, fontWeight: 900, fontSize: 20, color: "var(--ink)" }}>
              {openItem.quest.title}
            </div>
            <div className="lesson-meta">with keeper Ines</div>
            <div className="video-tile" style={{ height: 180 }}>
              <div className="video-play">
                <PlayIcon size={20} fill="#6c5ce7" style={{ marginLeft: 2 }} />
              </div>
              <span className="video-duration">{openLessons[0]?.dur}</span>
            </div>
            <div className="lesson-list">
              {openLessons.map((l, i) => {
                const state = l.progress >= 100 ? "done" : l.progress > 0 ? "active" : "todo";
                return (
                  <div key={l.name} className={`lesson-row ${state}`}>
                    <div className={`lesson-index ${state}`}>
                      {state === "done" ? <CheckIcon size={11} strokeWidth={3.6} /> : i + 1}
                    </div>
                    <span className="lesson-name">{l.name}</span>
                    <span className="lesson-dur">{l.dur}</span>
                  </div>
                );
              })}
            </div>
            <div className="meter" style={{ height: 9, marginTop: 14 }}>
              <i style={{ width: `${courseProgress}%` }} />
            </div>
            <button className="btn-primary" style={{ marginTop: 14, fontSize: 14, padding: 12 }}>
              {courseProgress > 0 && courseProgress < 100 ? "Resume course" : courseProgress === 100 ? "Rewatch course" : "Start course"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
