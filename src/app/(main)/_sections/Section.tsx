// Two-column section: the label sits in a narrow left column on wide
// screens and stacks above the content on phones.
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="grid gap-6 border-t border-rule py-14 md:grid-cols-[12rem_1fr] md:gap-10 md:py-20"
    >
      <h2 className="text-2xl md:text-[1.75rem] leading-tight">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
