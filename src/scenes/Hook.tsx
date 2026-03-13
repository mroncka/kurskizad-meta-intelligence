import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Cell } from "../components/Cell";
import { TextOverlay } from "../components/TextOverlay";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const questionScale = spring({ frame, fps, config: { damping: 10, stiffness: 60, mass: 1.2 }, from: 0, to: 1 });
  const questionOpacity = interpolate(frame, [200, 280], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080">
        <Cell x={960} y={580} radius={55} color="#3b82f6" spikes={0} vitality={0.3} delay={60} />
      </svg>
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{
          transform: `scale(${questionScale})`, opacity: questionOpacity,
          fontFamily: "Inter, sans-serif", fontSize: 180, fontWeight: 900,
          color: "#3b82f6", textShadow: "0 0 80px rgba(59,130,246,0.8)",
          lineHeight: 1, marginBottom: -40,
        }}>?</div>
      </AbsoluteFill>
      <TextOverlay text="Are you part of something greater than yourself?" inFrame={100} outFrame={260} size="lg" position="bottom" />
    </AbsoluteFill>
  );
};
