"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckIcon } from "@/components/icons";
import { MiniPlant, PotMascot, SeedSprout } from "@/components/plants";
import { keepers, pendingProject, projects } from "@/lib/data";

type Filter = "All" | "Thriving" | "Wilting" | "New";

const FILTERS: Filter[] = ["All", "Thriving", "Wilting", "New"];

function matches(filter: Filter, p: (typeof projects)[number]) {
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

export default function AllProjectsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = projects.filter((p) => matches(filter, p));

  return (
    <>
      <main className="directory-main page-scroll">
        <div className="directory-head">
          <div>
            <div className="micro-label">Choose a plant</div>
            <h1 className="page-h1">All Projects</h1>
            <p className="page-sub">Every plant here was hand-approved by a garden keeper.</p>
          </div>
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
        </div>

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
                <div className="mini-avatar" style={{ width: 22, height: 22, background: "linear-gradient(135deg,#fbbf24,#6c5ce7)" }}>J</div>
                <div className="mini-avatar" style={{ width: 22, height: 22, background: "linear-gradient(135deg,#00cec9,#2eb872)" }}>D</div>
              </div>
              <span className="founder-names">{pendingProject.founders}</span>
              <span style={{ fontWeight: 700, fontSize: 12, color: "#c9a24d" }}>{pendingProject.meta}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-later">Later</button>
            <button className="btn-approve">Review &amp; approve</button>
          </div>
        </div>

        <div className="project-grid">
          {visible.map((p) => (
            <div key={p.slug} className="project-card">
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
    </>
  );
}
