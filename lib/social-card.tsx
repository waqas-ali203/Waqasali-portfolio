import { ImageResponse } from "next/og";
import { site } from "@/content/site";
export const dynamic = "force-static";
export const alt = "Muhammad Usman / Orbital Engineering Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#090b0a",
        color: "#f2f0e8",
        padding: "66px 76px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          color: "#bcc3b8",
        }}
      >
        <span>MU / {site.name.toUpperCase()}</span>
        <span>ORBITAL ENGINEERING STUDIO</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 102,
          lineHeight: 1.02,
          letterSpacing: -6,
        }}
      >
        <span>I engineer</span>
        <span style={{ display: "flex" }}>
          what’s <span style={{ color: "#c5ff67", marginLeft: 20 }}>next.</span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #34402d",
          paddingTop: 24,
          fontSize: 18,
          color: "#bcc3b8",
        }}
      >
        <span>{site.title.toUpperCase()}</span>
        <span>WEB / MOBILE / AI INTEGRATIONS</span>
      </div>
    </div>,
    size,
  );
}
