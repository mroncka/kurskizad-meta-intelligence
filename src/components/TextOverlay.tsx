import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

interface TextOverlayProps {
  text: string;
  subtitle?: string;
  inFrame?: number;
  outFrame?: number;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  position?: "top" | "center" | "bottom";
  accent?: boolean;
}

const fontSizes = { sm: 36, md: 52, lg: 72, xl: 96 };

export const TextOverlay: React.FC<TextOverlayProps> = ({
  text, subtitle, inFrame = 0, outFrame, color = "#ffffff",
  size = "lg", position = "center", accent = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = spring({
    frame: frame - inFrame, fps,
    config: { damping: 16, stiffness: 100, mass: 0.8 },
    from: 0, to: 1,
  });

  const fadeOut = outFrame !== undefined
    ? interpolate(frame, [outFrame, outFrame + 15], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  const opacity = Math.min(fadeIn, fadeOut);
  const translateY = interpolate(fadeIn, [0, 1], [20, 0]);
  const fontSize = fontSizes[size];

  const justifyMap = { top: "flex-start", center: "center", bottom: "flex-end" };
  const paddingMap = { top: "80px 120px 0", center: "0 120px", bottom: "0 120px 80px" };

  return (
    <AbsoluteFill style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: justifyMap[position],
      padding: paddingMap[position], pointerEvents: "none",
    }}>
      <div style={{ opacity, transform: `translateY(${translateY}px)`, textAlign: "center" }}>
        <div style={{
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
          fontSize, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em",
          color: accent ? "#3b82f6" : color,
          textShadow: accent ? "0 0 40px rgba(59,130,246,0.6)" : "0 2px 20px rgba(0,0,0,0.8)",
        }}>{text}</div>
        {subtitle && (
          <div style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: fontSize * 0.45, fontWeight: 400,
            color: "rgba(255,255,255,0.65)", marginTop: 16, lineHeight: 1.5,
          }}>{subtitle}</div>
        )}
      </div>
    </AbsoluteFill>
  );
};
