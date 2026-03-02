import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillBadgeVariants = cva(
  "inline-flex items-center rounded-full text-xs font-semibold",
  {
    variants: {
      variant: {
        hero: "px-3 py-1 border border-accent-500/30 bg-accent-500/10 text-accent-400 tracking-widest uppercase",
        publication: "px-2 py-1 bg-white/10 rounded text-gray-300",
      },
    },
    defaultVariants: {
      variant: "hero",
    },
  },
);

type PillBadgeProps = VariantProps<typeof pillBadgeVariants> & {
  children: React.ReactNode;
  className?: string;
};

export function PillBadge({ children, className, variant }: PillBadgeProps) {
  return (
    <span className={cn(pillBadgeVariants({ variant }), className)}>
      {children}
    </span>
  );
}
