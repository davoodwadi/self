import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/portfolio/primitives/FadeUp";

const expertiseCardVariants = cva("glass-card rounded-2xl", {
  variants: {
    size: {
      md: "p-8",
      sm: "p-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type ExpertiseCardProps = VariantProps<typeof expertiseCardVariants> & {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  className?: string;
};

export function ExpertiseCard({
  icon,
  title,
  description,
  items,
  size,
  className,
}: ExpertiseCardProps) {
  return (
    <FadeUp className={cn(expertiseCardVariants({ size }), className)}>
      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 mb-4 text-sm leading-relaxed font-light">
        {description}
      </p>
      <ul className="text-sm text-gray-500 space-y-2 font-light">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
            {item}
          </li>
        ))}
      </ul>
    </FadeUp>
  );
}
