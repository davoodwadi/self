export default function PaperNav() {
  return (
    <nav className="p-nav">
      <div
        style={{
          maxWidth: "76rem",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "56px",
        }}
      >
        <span className="p-mono" style={{ color: "var(--text-muted)", letterSpacing: "0.08em" }}>
          research<span style={{ color: "var(--violet-light)" }}>{" "}paper</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {[
            ["Question", "#question"],
            ["Barriers", "#barriers"],
            ["Framework", "#framework"],
            ["Results", "#results"],
            ["Cite", "#cite"],
          ].map(([label, href]) => (
            <a key={label} href={href} className="p-nav-link">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
