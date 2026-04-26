import type { ReactNode } from "react";

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="tl-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function FigurePanel({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <div
      className="tl-figure"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          position: "relative",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
      {caption ? (
        <p className="tl-caption" style={{ marginTop: "1rem" }}>
          {caption}
        </p>
      ) : null}
    </div>
  );
}

export function ImageFigure({
  src,
  alt,
  caption,
  white = false,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  white?: boolean;
}) {
  return (
    <FigurePanel caption={caption}>
      <img
        className={white ? "tl-image-object" : undefined}
        src={src}
        alt={alt}
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </FigurePanel>
  );
}

export function CodePanel({ children }: { children: ReactNode }) {
  return <pre className="code-block">{children}</pre>;
}

export function MiniTable({
  columns,
  rows,
}: {
  columns: { label: string; align?: "left" | "right" }[];
  rows: ReactNode[][];
}) {
  return (
    <div className="tl-panel tl-panel-tight">
      <table className="tl-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.label} data-align={column.align}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} data-align={columns[cellIndex]?.align}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FlowNode({
  label,
  text,
  accent = "var(--cyan-light)",
}: {
  label: string;
  text: ReactNode;
  accent?: string;
}) {
  return (
    <div className="tl-node" style={{ borderTopColor: accent }}>
      <div className="tl-node-label" style={{ color: accent }}>
        {label}
      </div>
      <div className="tl-node-text">{text}</div>
    </div>
  );
}

export function StatGrid({
  stats,
}: {
  stats: { value: ReactNode; label: string }[];
}) {
  return (
    <div className="tl-stat-grid">
      {stats.map((stat) => (
        <div className="tl-stat" key={stat.label}>
          <div className="tl-stat-value">{stat.value}</div>
          <div className="tl-stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
