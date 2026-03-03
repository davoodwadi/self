import { cn } from "@/lib/utils";
import { FadeUp } from "./FadeUp";

type SectionHeaderProps = {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  children,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <FadeUp
      className={cn(
        "mb-12",
        align === "center" ? "text-center mx-auto" : "text-left",
        className,
      )}
    >
      {children}
    </FadeUp>
  );
}
