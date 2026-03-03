import { BookOpen, MoveRight } from "lucide-react";
import Link from "next/link";

interface CourseCardProps {
  label: string;
  title: string;
  description: string;
  link?: {
    href: string;
    label: string;
  };
}

export function CourseCard({
  label,
  title,
  description,
  link,
}: CourseCardProps) {
  return (
    <div className="glass-card p-8 rounded-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="card-subtitle block">{label}</span>
          <BookOpen size={20} className="text-accent-400" />
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="text-body mb-6">{description}</p>
        {link?.label && (
          <Link
            href={link.href}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-accent-500 hover:text-accent-400 transition-colors"
          >
            {link.label}
            <span className="group-hover:translate-x-1 transition-transform inline-flex">
              <MoveRight size={16} />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
