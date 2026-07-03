import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { GardenStage } from "./GardenStage";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function GardenPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <GardenStage project={project} />;
}
