import { LucideIcon, Trophy, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  type: "grant" | "award";
  className?: string;
}

export function ProjectCard({
  title,
  description,
  type,
  className,
}: ProjectCardProps) {
  const Icon = type === "grant" ? Coins : Trophy;

  return (
    <div
      className={cn(
        "glass-card p-8 rounded-xl relative overflow-hidden group h-full flex flex-col",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="icon-wrapper">
            <Icon size={24} className="text-accent-500" />
          </div>
          <span className="card-subtitle">
            {type === "grant" ? "Research Grant" : "Academic Award"}
          </span>
        </div>

        <h3 className="card-title">{title}</h3>

        <p className="text-body text-sm mb-6">{description}</p>
      </div>
    </div>
  );
}
