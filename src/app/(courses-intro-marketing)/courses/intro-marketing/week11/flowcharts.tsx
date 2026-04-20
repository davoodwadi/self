export const digitalEcosystemFlow = {
  nodes: [
    {
      id: "center",
      type: "custom",
      position: { x: 400, y: 300 },
      data: {
        label: "Data Analytics",
        description: "Core Foundation",
        variant: "primary",
      },
    },
    {
      id: "owned",
      type: "custom",
      position: { x: 400, y: 100 },
      data: {
        label: "Owned Media",
        description: "Websites & Blogs",
        variant: "secondary",
      },
    },
    {
      id: "paid",
      type: "custom",
      position: { x: 150, y: 450 },
      data: {
        label: "Paid Media",
        description: "Ads & Sponsorships",
        variant: "accent",
      },
    },
    {
      id: "earned",
      type: "custom",
      position: { x: 650, y: 450 },
      data: {
        label: "Earned Media",
        description: "Shares & Reviews",
        variant: "default",
      },
    },
  ],
  edges: [
    {
      id: "e-center-owned",
      source: "center",
      target: "owned",
      animated: true,
      style: { stroke: "var(--accent1)", strokeWidth: 2 },
    },
    {
      id: "e-center-paid",
      source: "center",
      target: "paid",
      animated: true,
      style: { stroke: "var(--accent1)", strokeWidth: 2 },
    },
    {
      id: "e-center-earned",
      source: "center",
      target: "earned",
      animated: true,
      style: { stroke: "var(--accent1)", strokeWidth: 2 },
    },
    {
      id: "e-owned-paid",
      source: "owned",
      target: "paid",
      animated: true,
      style: { stroke: "var(--text-secondary)", strokeWidth: 1, strokeDasharray: "5, 5" },
    },
    {
      id: "e-owned-earned",
      source: "owned",
      target: "earned",
      animated: true,
      style: { stroke: "var(--text-secondary)", strokeWidth: 1, strokeDasharray: "5, 5" },
    },
    {
      id: "e-paid-earned",
      source: "paid",
      target: "earned",
      animated: true,
      style: { stroke: "var(--text-secondary)", strokeWidth: 1, strokeDasharray: "5, 5" },
    },
  ],
};
