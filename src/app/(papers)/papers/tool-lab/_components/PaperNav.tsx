export default function PaperNav() {
  const links = [
    ["Gap", "#gap"],
    ["Framework", "#mdp"],
    ["Studies", "#studies"],
    ["Future research", "#future"],
    ["Questions", "#questions"],
  ];

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
        <span className="p-mono tl-nav-title">
          Tool<span style={{ color: "var(--cyan-light)" }}>-</span>Lab
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "1.6rem" }}>
          {links.map(([label, href]) => (
            <a key={label} href={href} className="p-nav-link">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
