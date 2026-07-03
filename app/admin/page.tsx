"use client";

// Project admin / editing panel.
//
// HANDOFF NOTE: this is the founder-facing editing surface. In the prototype
// it edits the signed-in founder's project (hardcoded to RankKit — there is
// no auth) and persists to localStorage via lib/overrides.ts. The Garden page
// reads the same overrides, so edits here show up there immediately.
// When the backend lands: replace the overrides store with PATCH calls, and
// gate the "Keeper zone" card behind a keeper/admin role.

import { useEffect, useState } from "react";
import {
  ArrowUpRightIcon,
  ChatIcon,
  CheckIcon,
  ChevronDownIcon,
  CodeIcon,
  GlobeIcon,
  PlayIcon,
  VideoCamIcon,
  XSocialIcon,
  YoutubeIcon,
} from "@/components/icons";
import { MiniPlant, SeedSprout, TIER_NAMES, type HeroStage } from "@/components/plants";
import {
  G,
  milestoneLabels,
  projects,
  type Founder,
  type LinkKind,
  type ProjectLink,
} from "@/lib/data";
import { loadOverrides, saveOverrides } from "@/lib/overrides";
import { parseYouTubeId, youTubeThumb, youTubeWatch } from "@/lib/video";

const SLUG = "rankkit"; // the signed-in founder's project (mock)

const AVATAR_GRADIENTS = [G.purpleTeal, G.amberPurple, G.tealGreen, G.indigoPurple];

const LINK_ICONS: Record<LinkKind, React.ComponentType<{ size?: number }>> = {
  website: GlobeIcon,
  x: XSocialIcon,
  github: CodeIcon,
  discord: ChatIcon,
  youtube: YoutubeIcon,
};

const LINK_KINDS: { key: LinkKind; label: string }[] = [
  { key: "website", label: "Website" },
  { key: "x", label: "X" },
  { key: "github", label: "GitHub" },
  { key: "discord", label: "Discord" },
  { key: "youtube", label: "YouTube" },
];

export default function AdminPage() {
  const project = projects.find((p) => p.slug === SLUG)!;

  const [name, setName] = useState(project.name);
  const [quote, setQuote] = useState(project.quote);
  const [links, setLinks] = useState<ProjectLink[]>(project.links);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoDraft, setVideoDraft] = useState("");
  const [videoEditing, setVideoEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [approved, setApproved] = useState(false);

  const [linkKind, setLinkKind] = useState<LinkKind>("website");
  const [linkLabel, setLinkLabel] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const [founders, setFounders] = useState<Founder[]>(project.founders);
  const [newFounder, setNewFounder] = useState("");
  const [stage, setStage] = useState<number>(typeof project.plant === "number" ? project.plant : 2);

  useEffect(() => {
    const o = loadOverrides(SLUG);
    if (o.name) setName(o.name);
    if (o.quote) setQuote(o.quote);
    if (o.links) setLinks(o.links);
    if (o.founders?.length) setFounders(o.founders);
    if (o.videoId) setVideoId(o.videoId);
    if (o.stage) setStage(o.stage);
  }, []);

  const saveDetails = () => {
    saveOverrides(SLUG, { name: name.trim() || project.name, quote: quote.trim() || project.quote });
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  const addLink = () => {
    const label = linkLabel.trim();
    let url = linkUrl.trim();
    if (!label || !url) return;
    if (!/^https?:\/\//.test(url)) url = `https://${url}`;
    const next = [...links, { kind: linkKind, label, url }];
    setLinks(next);
    saveOverrides(SLUG, { links: next });
    setLinkLabel("");
    setLinkUrl("");
  };

  const removeLink = (index: number) => {
    const next = links.filter((_, i) => i !== index);
    setLinks(next);
    saveOverrides(SLUG, { links: next });
  };

  const setVideo = () => {
    const id = parseYouTubeId(videoDraft);
    if (!id) return;
    setVideoId(id);
    saveOverrides(SLUG, { videoId: id });
    setVideoDraft("");
    setVideoEditing(false);
  };

  const removeVideo = () => {
    setVideoId(null);
    saveOverrides(SLUG, { videoId: null });
  };

  // Founders fill in milestones as the project grows; keepers verify.
  const setMilestone = (index: number) => {
    const s = index + 1; // milestone 1..7 maps onto growth tiers 1..7
    setStage(s);
    saveOverrides(SLUG, { stage: s });
  };

  const addFounder = () => {
    const fullName = newFounder.trim();
    if (!fullName) return;
    const founder: Founder = {
      name: fullName,
      initial: fullName[0].toUpperCase(),
      gradient: AVATAR_GRADIENTS[founders.length % AVATAR_GRADIENTS.length],
    };
    const next = [...founders, founder];
    setFounders(next);
    saveOverrides(SLUG, { founders: next });
    setNewFounder("");
  };

  const removeFounder = (index: number) => {
    if (founders.length <= 1) return; // a project always keeps at least one founder
    const next = founders.filter((_, i) => i !== index);
    setFounders(next);
    saveOverrides(SLUG, { founders: next });
  };

  return (
    <>
      <main className="admin-main page-scroll">
        <div className="directory-head">
          <div>
            <div className="micro-label">Founder tools</div>
            <h1 className="page-h1">Project admin</h1>
            <p className="page-sub">
              Edit how {name} shows up in the garden — changes apply to its Garden page right away.
            </p>
          </div>
          <button className="project-switcher">
            <div className="switcher-logo" style={{ background: project.logoGradient }}>
              {project.logoInitial}
            </div>
            <span style={{ fontWeight: 800, fontSize: 14, color: "var(--ink)" }}>{name}</span>
            <ChevronDownIcon size={13} style={{ color: "var(--muted)" }} />
          </button>
        </div>

        <div className="card admin-card">
          <div className="card-label">Project details</div>
          <div className="field-label" style={{ marginTop: 16 }}>
            Project name
          </div>
          <input
            className="text-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={32}
          />
          <div className="field-label" style={{ marginTop: 14 }}>
            One-line pitch
          </div>
          <input
            className="text-input"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            maxLength={80}
            placeholder="What are you growing?"
          />
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <button
              className={`btn-primary request-btn${saved ? " requested" : ""}`}
              style={{ width: "auto", padding: "12px 26px", fontSize: 14 }}
              onClick={saveDetails}
            >
              {saved && <CheckIcon size={14} strokeWidth={3.4} />}
              {saved ? "Saved" : "Save changes"}
            </button>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--faint)" }}>
              Shown on the hero and in All Projects.
            </span>
          </div>
        </div>

        <div className="card admin-card">
          <div className="card-label">
            Milestone path · <span style={{ color: "var(--stage-name-text)" }}>{TIER_NAMES[Math.min(stage, 8) as HeroStage]}</span>
          </div>
          <p className="page-sub" style={{ fontSize: 13, marginTop: 10 }}>
            Fill in milestones as you hit them — the plant on your Garden page grows to match.
          </p>
          <div className="rail-milestone-track" style={{ maxWidth: 340 }}>
            <div className="rail-milestone-line" />
            {milestoneLabels.map((label, i) => {
              const state = i < stage - 1 ? "done" : i === stage - 1 ? "current" : "upcoming";
              return (
                <button key={label} className="rail-milestone-row milestone-edit-row" onClick={() => setMilestone(i)}>
                  <div className={`milestone-node small ${state}`}>
                    {state === "done" && <CheckIcon size={11} />}
                    {state === "current" && <i />}
                  </div>
                  <span className={`rail-milestone-label ${state}`}>{label}</span>
                </button>
              );
            })}
          </div>
          <div className="composer-note" style={{ textAlign: "left", marginTop: 8 }}>
            Keepers verify big jumps — growth should be earned in the garden.
          </div>
        </div>

        <div className="card admin-card">
          <div className="card-label">Team</div>
          <p className="page-sub" style={{ fontSize: 13, marginTop: 10 }}>
            Everyone building this project — all founders show on the Garden page and project card.
          </p>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {founders.map((f, i) => (
              <div key={`${f.name}-${i}`} className="link-manage-row">
                <div
                  className="mini-avatar"
                  style={{ width: 30, height: 30, fontSize: 12, background: f.gradient, borderColor: "transparent" }}
                >
                  {f.initial}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="link-manage-label">{f.name}</div>
                  <div className="link-manage-url">Founder</div>
                </div>
                <button
                  className="row-icon-btn danger"
                  aria-label={`Remove ${f.name}`}
                  disabled={founders.length <= 1}
                  style={founders.length <= 1 ? { opacity: 0.35, cursor: "default" } : undefined}
                  onClick={() => removeFounder(i)}
                >
                  <XSocialIcon size={11} />
                </button>
              </div>
            ))}
          </div>
          <div className="field-label" style={{ marginTop: 18 }}>
            Add a founder
          </div>
          <div className="admin-link-form">
            <input
              className="text-input"
              placeholder="Full name (e.g. Priya Nair)"
              value={newFounder}
              onChange={(e) => setNewFounder(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addFounder()}
            />
            <button
              className="btn-lavender"
              style={{ whiteSpace: "nowrap", fontWeight: 900 }}
              onClick={addFounder}
            >
              Add founder
            </button>
          </div>
        </div>

        <div className="card admin-card">
          <div className="card-label">Links</div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {links.map((link, i) => {
              const Icon = LINK_ICONS[link.kind];
              return (
                <div key={`${link.url}-${i}`} className="link-manage-row">
                  <span className="link-icon">
                    <Icon size={15} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="link-manage-label">{link.label}</div>
                    <div className="link-manage-url">{link.url}</div>
                  </div>
                  <a
                    className="row-icon-btn"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${link.label}`}
                  >
                    <ArrowUpRightIcon size={12} />
                  </a>
                  <button
                    className="row-icon-btn danger"
                    aria-label={`Remove ${link.label}`}
                    onClick={() => removeLink(i)}
                  >
                    <XSocialIcon size={11} />
                  </button>
                </div>
              );
            })}
            {links.length === 0 && (
              <div className="admin-empty">No links yet — add your website below.</div>
            )}
          </div>
          <div className="field-label" style={{ marginTop: 18 }}>
            Add a link
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 7, flexWrap: "wrap" }}>
            {LINK_KINDS.map((k) => (
              <button
                key={k.key}
                className={`length-chip${linkKind === k.key ? " active" : ""}`}
                style={{ padding: "7px 14px", fontSize: 12 }}
                onClick={() => setLinkKind(k.key)}
              >
                {k.label}
              </button>
            ))}
          </div>
          <div className="admin-link-form">
            <input
              className="text-input"
              placeholder="Label (e.g. rankkit.dev)"
              value={linkLabel}
              onChange={(e) => setLinkLabel(e.target.value)}
            />
            <input
              className="text-input"
              placeholder="https://…"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addLink()}
            />
            <button
              className="btn-lavender"
              style={{ whiteSpace: "nowrap", fontWeight: 900 }}
              onClick={addLink}
            >
              Add link
            </button>
          </div>
        </div>

        <div className="card admin-card">
          <div className="card-label">Project video</div>
          <p className="page-sub" style={{ fontSize: 13, marginTop: 10 }}>
            The video block on your Garden page only appears once you&apos;ve added one.
          </p>
          {videoId && !videoEditing ? (
            <>
              <a
                className="video-thumb"
                style={{ maxWidth: 360 }}
                href={youTubeWatch(videoId)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={youTubeThumb(videoId)} alt="Project video" />
                <span className="video-thumb-play">
                  <PlayIcon size={18} fill="#6c5ce7" style={{ marginLeft: 2 }} />
                </span>
              </a>
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button className="btn-visit" onClick={() => setVideoEditing(true)}>
                  Replace
                </button>
                <button className="btn-visit danger" onClick={removeVideo}>
                  Remove
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="admin-link-form" style={{ marginTop: 12 }}>
                <input
                  className="text-input"
                  placeholder="Paste a YouTube link…"
                  value={videoDraft}
                  onChange={(e) => setVideoDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setVideo()}
                />
                <button
                  className="btn-lavender"
                  style={{ whiteSpace: "nowrap", fontWeight: 900 }}
                  onClick={setVideo}
                >
                  Add video
                </button>
                <button
                  className="btn-visit"
                  title="Recording lands with the real app"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  <VideoCamIcon size={14} />
                  Record
                </button>
              </div>
              {videoEditing && (
                <button
                  className="btn-visit"
                  style={{ marginTop: 10 }}
                  onClick={() => setVideoEditing(false)}
                >
                  Keep current video
                </button>
              )}
            </>
          )}
        </div>
      </main>

      <aside className="rail-340" style={{ paddingTop: 40 }}>
        <div className="card" style={{ padding: 22 }}>
          <div className="card-label">Keeper zone · Pending</div>
          <div className="link-manage-row" style={{ marginTop: 14 }}>
            <div
              style={{
                width: 38,
                height: 38,
                flex: "0 0 38px",
                borderRadius: 12,
                background: "linear-gradient(135deg,#fbbf24,#f2762e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: 900,
                fontSize: 16,
              }}
            >
              O
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="link-manage-label">Orbit Notes</div>
              <div className="link-manage-url">Jules Kim &amp; Dana Fox · 2h ago</div>
            </div>
            <div style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SeedSprout size={26} />
            </div>
          </div>
          {approved ? (
            <div className="status-chip tone-emerald" style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px" }}>
              <CheckIcon size={11} strokeWidth={3.6} />
              Planted — find it in All Projects
            </div>
          ) : (
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button className="btn-later" style={{ flex: 1, padding: "9px 14px" }}>
                Later
              </button>
              <button
                className="btn-approve"
                style={{ flex: 1.4, padding: "9px 14px" }}
                onClick={() => setApproved(true)}
              >
                Approve &amp; plant
              </button>
            </div>
          )}
          <div className="composer-note" style={{ textAlign: "left", marginTop: 10 }}>
            Keepers hand-approve every project before it joins the garden.
          </div>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <div className="card-label">Plant status</div>
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 14 }}>
            <div className="plant-tile" style={{ width: 64, height: 64, borderRadius: 16, background: "#f4f2ff" }}>
              <MiniPlant kind={Math.min(8, Math.max(1, stage)) as HeroStage} size={44} soil />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: 16, color: "var(--ink)" }}>
                {TIER_NAMES[Math.min(8, Math.max(1, stage)) as HeroStage]}
              </div>
              <div className="meter" style={{ height: 9, marginTop: 8 }}>
                <i style={{ width: `${project.health}%` }} />
              </div>
              <div className="level-caption">
                {project.health}/100 health · {project.waters} waters
              </div>
            </div>
          </div>
          <div className="composer-note" style={{ textAlign: "left", marginTop: 12 }}>
            Growth is community-driven — watering happens in the garden, not here.
          </div>
        </div>
      </aside>
    </>
  );
}
