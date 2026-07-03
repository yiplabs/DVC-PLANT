"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckIcon, DropFillIcon, SproutIcon, StarIcon, XSocialIcon } from "@/components/icons";
import { MiniPlant, PotMascot, SeedSprout } from "@/components/plants";
import { G, keepers, pendingProject, projects, type Project } from "@/lib/data";

type Filter = "All" | "Thriving" | "Wilting" | "New";
type Sort = "waters" | "newest" | "health" | null;

const FILTERS: Filter[] = ["All", "Thriving", "Wilting", "New"];

const SORTS: { key: Exclude<Sort, null>; label: string }[] = [
  { key: "waters", label: "Most watered" },
  { key: "newest", label: "Newest" },
  { key: "health", label: "Healthiest" },
];

const SPARK_VECTORS = [
  [-52, -40],
  [48, -46],
  [-26, -62],
  [30, -32],
  [0, -66],
  [-58, -14],
  [60, -18],
];

// Orbit Notes as it lands in the garden the moment a keeper approves it
const ORBIT_NOTES: Project = {
  slug: "orbit-notes",
  name: "Orbit Notes",
  logoInitial: "O",
  logoGradient: "linear-gradient(135deg,#fbbf24,#f2762e)",
  logoRadius: "16px",
  plantTileBg: "#fef3c7",
  founders: [
    { name: "Jules Kim", initial: "J", gradient: G.amberPurple },
    { name: "Dana Fox", initial: "D", gradient: G.tealGreen },
  ],
  founderNames: "Jules Kim & Dana Fox",
  founderHandle: "@jules",
  planted: "Planted today",
  plantedAt: "2026-07-03",
  stageName: "Seed",
  badgeTone: "emerald",
  plant: 1,
  health: 5,
  waters: 0,
  streakDays: 0,
  level: 1,
  quote: "Notes that orbit around your ideas.",
  keeper: "Approved · You",
  isNew: true,
  links: [{ kind: "website", label: "orbitnotes.app", url: "https://orbitnotes.app" }],
};

function matches(filter: Filter, p: Project) {
  switch (filter) {
    case "All":
      return true;
    case "Thriving":
      return p.health >= 60;
    case "Wilting":
      return p.health < 40;
    case "New":
      return !!p.isNew;
  }
}

function sorted(list: Project[], sort: Sort) {
  if (!sort) return list;
  const copy = [...list];
  if (sort === "waters") copy.sort((a, b) => b.waters - a.waters);
  if (sort === "health") copy.sort((a, b) => b.health - a.health);
  if (sort === "newest") copy.sort((a, b) => b.plantedAt.localeCompare(a.plantedAt));
  return copy;
}

export default function AllProjectsPage() {
  const [items, setItems] = useState<Project[]>(projects);
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<Sort>(null);
  const [pending, setPending] = useState(true);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [justPlanted, setJustPlanted] = useState(false);

  const visible = sorted(
    items.filter((p) => matches(filter, p)),
    sort,
  );

  const approve = () => {
    setItems((prev) => [ORBIT_NOTES, ...prev]);
    setPending(false);
    setReviewOpen(false);
    setJustPlanted(true);
    setTimeout(() => setJustPlanted(false), 1000);
  };

  const totalWaters = items.reduce((s, p) => s + p.waters, 0);

  return (
    <>
      <main className="directory-main page-scroll">
        <div className="directory-head">
          <div>
            <div className="micro-label">Choose a plant</div>
            <h1 className="page-h1">All Projects</h1>
            <p className="page-sub">Every plant here was hand-approved by a garden keeper.</p>
            <div className="pulse-row">
              <span className="pulse-item">
                <span className="avatar-stack" style={{ paddingLeft: 6 }}>
                  <span className="mini-avatar" style={{ width: 18, height: 18, fontSize: 8, background: G.purpleTeal }}>M</span>
                  <span className="mini-avatar" style={{ width: 18, height: 18, fontSize: 8, background: G.amberPurple }}>L</span>
                  <span className="mini-avatar" style={{ width: 18, height: 18, fontSize: 8, background: G.tealGreen }}>A</span>
                </span>
                132 gardeners
              </span>
              <span className="pulse-item">
                <SproutIcon size={14} style={{ color: "#2eb872" }} />
                {items.length} plants growing
              </span>
              <span className="pulse-item">
                <DropFillIcon size={13} />
                {totalWaters.toLocaleString("en-US")} waters this week
              </span>
            </div>
          </div>
          <div>
            <div className="chip-row">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`filter-chip${filter === f ? " active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="sort-row">
              <span>Sort</span>
              {SORTS.map((s) => (
                <button
                  key={s.key}
                  className={`sort-pill${sort === s.key ? " active" : ""}`}
                  onClick={() => setSort(sort === s.key ? null : s.key)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {pending && (
          <div className="pending-banner">
            <div style={{ display: "flex", gap: 8, flex: "0 0 132px", alignItems: "center" }}>
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 16,
                  background: "linear-gradient(135deg,#fbbf24,#f2762e)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 18px rgba(251,191,36,0.3)",
                }}
              >
                <span style={{ color: "#ffffff", fontWeight: 900, fontSize: 26 }}>
                  {pendingProject.logoInitial}
                </span>
              </div>
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 16,
                  background: "#fef3c7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SeedSprout />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="name">{pendingProject.name}</span>
                <span className="pending-chip">PENDING</span>
              </div>
              <div className="founder-row" style={{ marginTop: 4 }}>
                <div className="avatar-stack">
                  <div className="mini-avatar" style={{ width: 22, height: 22, background: G.amberPurple }}>J</div>
                  <div className="mini-avatar" style={{ width: 22, height: 22, background: G.tealGreen }}>D</div>
                </div>
                <span className="founder-names">{pendingProject.founders}</span>
                <span style={{ fontWeight: 700, fontSize: 12, color: "#c9a24d" }}>{pendingProject.meta}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-later" onClick={() => setPending(false)}>
                Later
              </button>
              <button className="btn-approve" onClick={() => setReviewOpen(true)}>
                Review &amp; approve
              </button>
            </div>
          </div>
        )}

        <div className="project-grid">
          {visible.map((p) => (
            <div key={p.slug} className="project-card">
              {justPlanted && p.slug === "orbit-notes" && (
                <span className="card-sparks">
                  {SPARK_VECTORS.map(([dx, dy], s) => (
                    <span
                      key={s}
                      className="spark"
                      style={{ "--dx": `${dx}px`, "--dy": `${dy}px` } as React.CSSProperties}
                    >
                      <StarIcon size={13} />
                    </span>
                  ))}
                </span>
              )}
              <div className="project-tiles">
                <div
                  className="logo-tile-lg"
                  style={{ borderRadius: p.logoRadius, background: p.logoGradient }}
                >
                  {p.logoInitial}
                </div>
                <div className="plant-tile" style={{ background: p.plantTileBg }}>
                  <MiniPlant kind={p.plant} size={56} soil />
                </div>
              </div>
              <div className="project-card-body">
                <div className="project-title-row">
                  <span className="project-name">{p.name}</span>
                  <span className={`status-chip tone-${p.badgeTone}`}>{p.stageName}</span>
                  {p.slug === "orbit-notes" && (
                    <span className="status-chip tone-lavender">Just planted</span>
                  )}
                  <span className="keeper-chip">
                    <CheckIcon size={10} />
                    {p.keeper}
                  </span>
                </div>
                <div className="founder-row">
                  <div className="avatar-stack">
                    {p.founders.map((f) => (
                      <div key={f.name} className="mini-avatar" style={{ background: f.gradient }}>
                        {f.initial}
                      </div>
                    ))}
                  </div>
                  <span className="founder-names">{p.founderNames}</span>
                  <span className="planted">· {p.planted}</span>
                </div>
                <p className="pitch-quote">“{p.quote}”</p>
                <div className="project-card-footer">
                  <div className="health-mini">
                    <div className="meter">
                      <i style={{ width: `${p.health}%` }} />
                    </div>
                    <span className="health-caption">
                      {p.health}% health · {p.waters} waters
                    </span>
                  </div>
                  <Link href={`/garden/${p.slug}`} className="btn-visit">
                    Visit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <aside className="directory-rail">
        <div className="card submit-card">
          <PotMascot />
          <div className="card-label" style={{ marginTop: 12 }}>
            Submit your project
          </div>
          <p className="submit-copy">
            Plant a seed — add your logo and your team, and let the community help it grow.
          </p>
          <button className="btn-primary" style={{ marginTop: 16, borderRadius: 16 }}>
            Submit a project
          </button>
        </div>
        <div className="card keepers-card">
          <div className="card-label">Garden keepers</div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 13 }}>
            {keepers.map((k) => (
              <div key={k.name} className="keeper-row">
                <div className="keeper-avatar" style={{ background: k.gradient }}>
                  {k.initial}
                </div>
                <div>
                  <div className="keeper-name">{k.name}</div>
                  <div className="keeper-meta">{k.approvals}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {reviewOpen && (
        <div className="modal-overlay" onClick={() => setReviewOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="Close" onClick={() => setReviewOpen(false)}>
              <XSocialIcon size={12} />
            </button>
            <div className="card-label">Review submission</div>
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  background: "linear-gradient(135deg,#fbbf24,#f2762e)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontWeight: 900,
                  fontSize: 20,
                }}
              >
                O
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 900, fontSize: 19, color: "var(--ink)" }}>Orbit Notes</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--muted)" }}>
                  Submitted 2h ago · orbitnotes.app
                </div>
              </div>
              <span className="pending-chip">PENDING</span>
            </div>
            <div className="founder-reply" style={{ marginTop: 14, fontSize: 13.5 }}>
              “Notes that orbit around your ideas.”
            </div>
            <div className="founder-row" style={{ marginTop: 14 }}>
              <div className="avatar-stack">
                <div className="mini-avatar" style={{ background: G.amberPurple }}>J</div>
                <div className="mini-avatar" style={{ background: G.tealGreen }}>D</div>
              </div>
              <span className="founder-names">Jules Kim &amp; Dana Fox</span>
              <span className="planted">· first project in the garden</span>
            </div>
            <div className="review-plant-row">
              <div
                style={{
                  width: 46,
                  height: 46,
                  flex: "0 0 46px",
                  borderRadius: 14,
                  background: "#fef3c7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SeedSprout size={28} />
              </div>
              <span>
                Starts as a <b>Seed</b> — the community waters it from here.
              </span>
            </div>
            <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
              <button className="btn-later" style={{ flex: 1 }} onClick={() => setReviewOpen(false)}>
                Later
              </button>
              <button className="btn-approve" style={{ flex: 2 }} onClick={approve}>
                Approve &amp; plant
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
