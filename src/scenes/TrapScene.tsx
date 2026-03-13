import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Cell } from "../components/Cell";
import { TextOverlay } from "../components/TextOverlay";

export const TrapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({ frame: frame - 40, fps, config: { damping: 18, stiffness: 40, mass: 1.5 }, from: 0, to: 1 });
  const smallX = interpolate(enterProgress, [0, 1], [400, 870]);
  const smallY = interpolate(enterProgress, [0, 1], [400, 510]);
  const smallSpikes = Math.floor(interpolate(enterProgress, [0, 0.7], [7, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const smallColor = enterProgress < 0.5 ? "#22c55e" : `rgba(${Math.floor(interpolate(enterProgress, [0.5, 1], [34, 239]))}, ${Math.floor(interpolate(enterProgress, [0.5, 1], [197, 68]))}, ${Math.floor(interpolate(enterProgress, [0.5, 1], [94, 68]))}, 0.9)`;
  const warningOpacity = interpolate(Math.max(0, Math.sin((frame - 150) * 0.3)), [0, 1], [0, 0.6]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `rgba(239,68,68,${warningOpacity * 0.15})`, pointerEvents: "none" }} />
      <svg width="100%" height="100%" viewBox="0 0 1920 1080">
        <Cell x={960} y={520} radius={160} color="#ef4444" spikes={0} vitality={0.5} delay={0} label="EASY" />
        <Cell x={smallX} y={smallY} radius={45} color={smallColor} spikes={smallSpikes} vitality={0.6} delay={40} />
        {enterProgress > 0.85 && (
          <text x={960} y={530} textAnchor="middle" dominantBaseline="middle" fontSize={60}
            opacity={interpolate(enterProgress, [0.85, 1], [0, 0.8])}>🔒</text>
        )}
      </svg>
      <TextOverlay text="Easy cells come at a cost." inFrame={0} outFrame={140} size="lg" position="top" color="#ef4444" />
      <TextOverlay text="Enter the wrong cell and you become its food." inFrame={150} outFrame={280} size="md" position="bottom" color="#ef4444" />
    </AbsoluteFill>
  );
};
