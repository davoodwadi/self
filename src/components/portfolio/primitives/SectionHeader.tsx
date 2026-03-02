import { cn } from "@/lib/utils";
import { FadeUp } from "./FadeUp";

type SectionHeaderProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <FadeUp
      className={cn(
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
        {title}
      </h2>
      {description ? (
        <p className="text-gray-400 font-light max-w-2xl">{description}</p>
      ) : null}
    </FadeUp>
  );
}
