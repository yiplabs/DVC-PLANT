"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { HeroPlant, MiniPlant } from "@/components/plants";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DropFillIcon,
  DropIcon,
  FlameIcon,
  StarIcon,
} from "@/components/icons";
import { activityFeed, milestoneLabels, projects, type PlantKind, type Project } from "@/lib/data";

const DOCK_STAGES: PlantKind[] = [1, 2, 3, 4, 5, 6, 7, 8];

function stageIndex(plant: PlantKind): number {
  if (plant === "wilted") return 2;
  if (plant === "regrowth") return 3;
  return plant;
}

export function GardenStage({ project }: { project: Project }) {
  const router = useRouter();
  const { theme, particles } = useTheme();
  const dark = theme === "dark";

  const [health, setHealth] = useState(project.health);
  const [waters, setWaters] = useState(project.waters);
  const [droplets, setDroplets] = useState<number[]>([]);
  const [backdrop, setBackdrop] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const dropletId = useRef(0);

  const currentMilestone = Math.min(stageIndex(project.plant) - 1, 6);

  const water = () => {
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

  const projectIdx = projects.findIndex((p) => p.slug === project.slug);
  const goTo = (offset: number) => {
    const next = projects[(projectIdx + offset + projects.length) % projects.length];
    router.push(`/garden/${next.slug}`);
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
          <h1 className="stage-hero-name">{project.name}</h1>
          <div className="founder-chip">
            <div
              className="mini-avatar"
              style={{ background: "linear-gradient(135deg,#6c5ce7,#00cec9)", border: "none", fontSize: 12 }}
            >
              {project.founders[0].initial}
            </div>
            <span>
              {project.founderHandle} · Founder
            </span>
          </div>
          <HeroPlant dark={dark} particles={particles} />
        </div>

        <div className="glass-card milestone-card">
          <div className="card-label">Milestone path</div>
          <div className="milestone-track">
            <div className="milestone-line" />
            {milestoneLabels.map((label, i) => {
              const state = i < currentMilestone ? "done" : i === currentMilestone ? "current" : "upcoming";
              return (
                <div key={label} className="milestone-row">
                  <div className={`milestone-node ${state}`}>
                    {state === "done" && <CheckIcon size={14} />}
                    {state === "current" && <i />}
                  </div>
                  <span className={`milestone-label ${state}`}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card health-card">
          <div className="card-label">Plant health</div>
          <div className="health-meter">
            <i style={{ width: `${health}%` }} />
          </div>
          <div className="health-readout">
            <span className="health-count">{health} / 100</span>
            <span className="health-stage">{project.stageName}</span>
          </div>
          <button className="btn-primary water-btn" onClick={water}>
            {droplets.map((id) => (
              <span key={id} className="droplet">
                <DropFillIcon size={16} fill="#7d6ef0" />
              </span>
            ))}
            <DropIcon />
            <span>Water</span>
          </button>
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
          <button className="dock-arrow" aria-label="Previous plant" onClick={() => goTo(-1)}>
            <ChevronLeftIcon />
          </button>
          {DOCK_STAGES.map((stage) => (
            <div
              key={stage}
              className={`dock-thumb${stageIndex(project.plant) === stage ? " active" : ""}`}
            >
              <MiniPlant kind={stage} />
            </div>
          ))}
          <button className="dock-arrow" aria-label="Next plant" onClick={() => goTo(1)}>
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
        <div className="card-label" style={{ marginBottom: 4 }}>
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
