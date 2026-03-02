import { cn } from "@/lib/utils";

type ServiceListItemProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
};

export function ServiceListItem({
  title,
  children,
  className,
  bordered = true,
}: ServiceListItemProps) {
  return (
    <div
      className={cn(bordered ? "border-b border-white/10 pb-4" : "", className)}
    >
      <div className="font-semibold text-white mb-1">{title}</div>
      <div className="text-sm text-gray-400 font-light">{children}</div>
    </div>
  );
}
