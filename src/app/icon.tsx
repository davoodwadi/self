// app/icon.tsx
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000", // Change this to match your nav/background color
        color: "white",
        padding: "4px",
        fontSize: 16,
        fontFamily: "serif",
        letterSpacing: "0.1em", // mimics tracking-wider
        borderRadius: "6px", // Optional: slightly rounded corners
      }}
    >
      DW
    </div>,
    { ...size },
  );
}
