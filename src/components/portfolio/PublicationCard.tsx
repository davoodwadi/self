import { PillBadge } from "@/components/portfolio/PillBadge";
import { FadeUp } from "@/components/portfolio/FadeUp";

type PublicationCardProps = {
  venue: string;
  year: string;
  title: string;
  description: string;
  authors: string;
  href: string;
};

export function PublicationCard({
  venue,
  year,
  title,
  description,
  authors,
  href,
}: PublicationCardProps) {
  return (
    <FadeUp className="glass-card p-6 rounded-xl flex flex-col justify-between group">
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <PillBadge variant="publication">{venue}</PillBadge>
          <span className="text-muted">{year}</span>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
        >
          <span className="sr-only">Read paper</span>
        </a>
        <h3 className="card-title group-hover:text-accent-400 transition-colors">
          {title}
        </h3>
        <p className="text-body text-sm mb-6 line-clamp-3 relative z-0">
          {description}
        </p>
      </div>
      <p className="text-muted italic mt-auto pt-4 divider relative z-0">
        {authors}
      </p>
    </FadeUp>
  );
}
