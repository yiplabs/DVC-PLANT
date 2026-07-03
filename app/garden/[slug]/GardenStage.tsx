"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { HeroPlant, MiniPlant, TIER_NAMES, type HeroStage } from "@/components/plants";
import {
  ArrowUpRightIcon,
  ChatIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeIcon,
  DropFillIcon,
  DropIcon,
  FlameIcon,
  GlobeIcon,
  PlayIcon,
  StarIcon,
  XSocialIcon,
  YoutubeIcon,
} from "@/components/icons";
import {
  activityFeed,
  milestoneLabels,
  type Founder,
  type LinkKind,
  type PlantKind,
  type Project,
  type ProjectLink,
} from "@/lib/data";
import { loadOverrides } from "@/lib/overrides";
import { youTubeThumb, youTubeWatch } from "@/lib/video";

const DOCK_STAGES: HeroStage[] = [1, 2, 3, 4, 5, 6, 7, 8];

const LINK_ICONS: Record<LinkKind, React.ComponentType<{ size?: number }>> = {
  website: GlobeIcon,
  x: XSocialIcon,
  github: CodeIcon,
  discord: ChatIcon,
  youtube: YoutubeIcon,
};

function stageIndex(plant: PlantKind): HeroStage {
  if (plant === "wilted") return 2;
  if (plant === "regrowth") return 3;
  return plant;
}

function joinFirstNames(founders: Founder[]): string {
  const names = founders.map((f) => f.name.split(" ")[0]);
  if (names.length <= 1) return names[0] ?? "";
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
}

export function GardenStage({ project }: { project: Project }) {
  const { theme, particles } = useTheme();
  const dark = theme === "dark";

  // Every growth tier is built — the dock switches between them.
  const [stage, setStage] = useState<HeroStage>(stageIndex(project.plant));
  const [health, setHealth] = useState(project.health);
  const [waters, setWaters] = useState(project.waters);
  const [watered, setWatered] = useState(false);
  const [droplets, setDroplets] = useState<number[]>([]);
  const [backdrop, setBackdrop] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  // Founder-editable presentation (name, links, video) — edited in /admin.
  // HANDOFF NOTE: these come from localStorage overrides in the prototype;
  // in production they're just fields on the Project entity.
  const [name, setName] = useState(project.name);
  const [links, setLinks] = useState<ProjectLink[]>(project.links);
  const [founders, setFounders] = useState<Founder[]>(project.founders);
  const [videoId, setVideoId] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const dropletId = useRef(0);

  useEffect(() => {
    const o = loadOverrides(project.slug);
    if (o.name) setName(o.name);
    if (o.links) setLinks(o.links);
    if (o.founders?.length) setFounders(o.founders);
    if (o.videoId) setVideoId(o.videoId);
    if (o.stage) setStage(Math.min(8, Math.max(1, Math.round(o.stage))) as HeroStage);
  }, [project.slug]);

  const currentMilestone = Math.min(stage - 1, 6);

  // Watering is the community's vote — one water per gardener per day.
  const water = () => {
    if (watered) {
      setWatered(false);
      setWaters((w) => w - 1);
      setHealth((h) => Math.max(0, h - 1));
      return;
    }
    setWatered(true);
    setWaters((w) => w + 1);
    setHealth((h) => Math.min(100, h + 1));
    const id = ++dropletId.current;
    setDroplets((d) => [...d, id]);
    setTimeout(() => setDroplets((d) => d.filter((x) => x !== id)), 750);
  };

  const loadImage = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setBackdrop(reader.result as string);
    reader.readAsDataURL(file);
  };

  const stepStage = (offset: number) => {
    setStage((s) => (((s - 1 + offset + 8) % 8) + 1) as HeroStage);
  };

  return (
    <div className="garden-layout">
      <main
        className="garden-stage"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          loadImage(e.dataTransfer.files?.[0]);
        }}
      >
        {backdrop && (
          <div className="stage-backdrop">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={backdrop} alt="" />
          </div>
        )}
        <div className="stage-veil" />

        <div className="stage-center">
          <div className="micro-label">Project</div>
          <h1 className="stage-hero-name">{name}</h1>
          {/* Every founder on the team is shown — the roster is edited in /admin */}
          <div className="founder-chip">
            <div className="avatar-stack">
              {founders.slice(0, 4).map((f) => (
                <div
                  key={f.name}
                  className="mini-avatar"
                  style={{ background: f.gradient, fontSize: 11 }}
                >
                  {f.initial}
                </div>
              ))}
            </div>
            <span>
              {joinFirstNames(founders)} · {founders.length > 1 ? "Founders" : "Founder"}
            </span>
          </div>
          <HeroPlant stage={stage} dark={dark} particles={particles} />
        </div>

        <div className="glass-card links-card">
          <div className="card-label">Links</div>
          <div className="links-list">
            {links.map((link) => {
              const Icon = LINK_ICONS[link.kind];
              return (
                <a
                  key={link.url}
                  className="link-row"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="link-icon">
                    <Icon size={15} />
                  </span>
                  <span className="link-label">{link.label}</span>
                  <ArrowUpRightIcon size={12} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Only rendered once the founder has added a video (via /admin) */}
        {videoId && (
          <div className="glass-card video-card">
            <div className="card-label">Project video</div>
            <a
              className="video-thumb"
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
          </div>
        )}

        <div className="glass-card health-card">
          <div className="card-label">Plant health</div>
          <div className="health-meter">
            <i style={{ width: `${health}%` }} />
          </div>
          <div className="health-readout">
            <span className="health-count">{health} / 100</span>
            <span className="health-stage">{TIER_NAMES[stage]}</span>
          </div>
          <button className={`btn-primary water-btn${watered ? " voted" : ""}`} onClick={water}>
            {droplets.map((id) => (
              <span key={id} className="droplet">
                <DropFillIcon size={16} fill="#7d6ef0" />
              </span>
            ))}
            {watered ? <CheckIcon size={17} strokeWidth={3.4} /> : <DropIcon />}
            <span>{watered ? "Watered today" : "Water"}</span>
          </button>
          <div className="water-voters">
            <div className="avatar-stack">
              <div className="mini-avatar" style={{ width: 20, height: 20, fontSize: 9, background: "linear-gradient(135deg,#6c5ce7,#00cec9)" }}>M</div>
              <div className="mini-avatar" style={{ width: 20, height: 20, fontSize: 9, background: "linear-gradient(135deg,#fbbf24,#6c5ce7)" }}>L</div>
              <div className="mini-avatar" style={{ width: 20, height: 20, fontSize: 9, background: "linear-gradient(135deg,#00cec9,#2eb872)" }}>A</div>
            </div>
            <span>{watered ? "You + 46 others" : "47 gardeners"} watered today</span>
          </div>
          <div className="water-note">
            Watering is the community&apos;s vote — the more waters, the faster it grows.
          </div>
          <div className="stat-chips">
            <span className="stat-chip">
              <FlameIcon />
              {project.streakDays}-day streak
            </span>
            <span className="stat-chip">
              <DropFillIcon fill={dark ? "#8b7cf7" : "#6c5ce7"} />
              {waters} waters
            </span>
            <span className="stat-chip">
              <StarIcon />
              Level {project.level}
            </span>
          </div>
        </div>

        <div className="dock">
          <button className="dock-arrow" aria-label="Previous growth tier" onClick={() => stepStage(-1)}>
            <ChevronLeftIcon />
          </button>
          {DOCK_STAGES.map((s) => (
            <button
              key={s}
              className={`dock-thumb${stage === s ? " active" : ""}`}
              aria-label={`Preview tier ${s}: ${TIER_NAMES[s]}`}
              onClick={() => setStage(s)}
            >
              <MiniPlant kind={s} />
            </button>
          ))}
          <button className="dock-arrow" aria-label="Next growth tier" onClick={() => stepStage(1)}>
            <ChevronRightIcon />
          </button>
        </div>

        <button
          className={`backdrop-hint${dragging ? " dragging" : ""}`}
          onClick={() => fileInput.current?.click()}
        >
          {backdrop ? "Replace backdrop" : "Drop a screenshot — your website becomes the backdrop"}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => loadImage(e.target.files?.[0])}
        />
      </main>

      <aside className="activity-rail">
        <div className="card rail-milestones">
          <div className="card-label">
            Milestones · <span style={{ color: "var(--stage-name-text)" }}>{TIER_NAMES[stage]}</span>
          </div>
          <div className="rail-milestone-track">
            <div className="rail-milestone-line" />
            {milestoneLabels.map((label, i) => {
              const state = i < currentMilestone ? "done" : i === currentMilestone ? "current" : "upcoming";
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
        </div>

        <div className="card-label" style={{ marginBottom: 4, marginTop: 8 }}>
          Activity
        </div>
        {activityFeed.map((f) => (
          <div key={`${f.name}-${f.time}`} className="activity-tile">
            <div className="ring-avatar" style={{ background: f.gradient }}>
              <i>{f.initial}</i>
            </div>
            <div className="activity-text">
              <b>{f.name}</b> {f.action}
            </div>
            <span className="activity-time">{f.time}</span>
          </div>
        ))}
      </aside>
    </div>
  );
}
