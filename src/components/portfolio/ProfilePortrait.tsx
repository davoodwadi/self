import { cn } from "@/lib/utils";

type ProfilePortraitProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ProfilePortrait({ src, alt, className }: ProfilePortraitProps) {
  return (
    <div
      className={cn(
        "w-48 h-48 md:w-64 md:h-64 rounded-full relative mx-auto transition-shadow hover:shadow-[0_0_40px_rgba(140,115,73,0.4)] group",
        className,
      )}
    >
      <div className="absolute inset-0 rounded-full bg-accent-500/30 blur-2xl transition-opacity group-hover:bg-accent-500/40"></div>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-full grayscale relative z-10 border border-white/10"
      />
    </div>
  );
}
