import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const portfolioButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
  {
    variants: {
      variant: {
        primary:
          "bg-white text-dark-900 hover:bg-gray-200 transform hover:scale-105",
        secondary:
          "border border-gray-600 text-white hover:border-gray-400 hover:bg-white/5",
      },
      size: {
        md: "px-8 py-4",
        lg: "px-10 py-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type PortfolioButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof portfolioButtonVariants> & {
    href: string;
  };

export function PortfolioButton({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: PortfolioButtonProps) {
  return (
    <a
      href={href}
      className={cn(portfolioButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </a>
  );
}
