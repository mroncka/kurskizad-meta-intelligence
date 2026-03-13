import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const hue = interpolate(frame, [0, 2700], [220, 260], { extrapolateRight: "clamp" });
  const pulse = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.95, 1.05]);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, hsl(${hue}, 30%, 8%) 0%, hsl(${hue}, 20%, 4%) 60%, #000000 100%)`,
        transform: `scale(${pulse})`,
      }}
    />
  );
};
