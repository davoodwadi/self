const LINKS = [
  { name: "Research", href: "#research" },
  { name: "Teaching", href: "#teaching" },
  { name: "Service", href: "#service" },
  { name: "Contact", href: "#contact" },
];

export function Masthead() {
  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-8 gap-y-1 px-4 py-3 sm:px-6 lg:px-10">
        <a
          href="#top"
          className="font-serif text-lg text-ink hover:text-signal transition-colors"
        >
          Davood Wadi
        </a>
        <nav aria-label="Sections">
          <ul className="flex gap-5 text-sm">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-ink-2 hover:text-signal transition-colors"
                >
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
