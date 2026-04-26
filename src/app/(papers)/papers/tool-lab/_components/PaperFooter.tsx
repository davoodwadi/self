export default function PaperFooter() {
  return (
    <footer
      style={{
        padding: "3rem 2rem",
        borderTop: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "76rem", margin: "0 auto" }}>
        <p
          className="p-mono"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-faint)",
          }}
        >
          Tool-Lab &middot; Davood Wadi.
        </p>
      </div>
    </footer>
  );
}
