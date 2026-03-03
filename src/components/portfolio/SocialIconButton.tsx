import { cn } from "@/lib/utils";

type SocialIconButtonProps = {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function SocialIconButton({
  href,
  label,
  children,
  className,
}: SocialIconButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "w-12 h-12 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-400 transition-all",
        className,
      )}
    >
      <span className="sr-only">{label}</span>
      {children}
    </a>
  );
}
