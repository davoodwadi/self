import { cn } from "@/lib/utils";

type SectionContainerProps = React.ComponentPropsWithoutRef<"section"> & {
  contentClassName?: string;
};

export function SectionContainer({
  className,
  contentClassName,
  children,
  ...props
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        "min-h-screen flex items-center justify-center px-6 relative",
        className,
      )}
      {...props}
    >
      <div className={cn("mx-auto w-full", contentClassName)}>{children}</div>
    </section>
  );
}
