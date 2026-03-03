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
          <span className="text-xs text-gray-500">{year}</span>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
        >
          <span className="sr-only">Read paper</span>
        </a>
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 font-light relative z-0">
          {description}
        </p>
      </div>
      <p className="text-xs text-gray-500 italic mt-auto pt-4 border-t border-white/5 relative z-0">
        {authors}
      </p>
    </FadeUp>
  );
}
