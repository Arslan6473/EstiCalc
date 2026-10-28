import { ImageResponse } from "next/og";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };

export function ogImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #0f766e 0%, #115e59 55%, #134e4a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f766e",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            E
          </div>
          <div style={{ fontSize: 36, fontWeight: 800, display: "flex" }}>
            Esti<span style={{ color: "#fbbf24" }}>Calc</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#99f6e4", fontWeight: 600, textTransform: "uppercase", letterSpacing: 2 }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: title.length > 48 ? 60 : 76, fontWeight: 800, lineHeight: 1.05, marginTop: 16 }}>
            {title}
          </div>
          {subtitle && <div style={{ fontSize: 30, color: "#ccfbf1", marginTop: 24, lineHeight: 1.3 }}>{subtitle}</div>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#ccfbf1" }}>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
          <span>Free · No sign-up · Feet or metres</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
