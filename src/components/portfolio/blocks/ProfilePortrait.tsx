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
        "w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-accent-500/20 p-2 relative mx-auto transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(59,130,246,0.22)]",
        className,
      )}
    >
      <div className="absolute inset-0 rounded-full bg-accent-500/20 blur-xl"></div>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-full grayscale relative z-10"
      />
    </div>
  );
}
