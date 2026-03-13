import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Cell } from "../components/Cell";
import { TextOverlay } from "../components/TextOverlay";

export const FoodVsMemberScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const foodProgress = spring({ frame: frame - 60, fps, config: { damping: 20, stiffness: 30, mass: 2 }, from: 0, to: 1 });
  const foodX = interpolate(foodProgress, [0, 1], [400, 880]);
  const foodY = interpolate(foodProgress, [0, 1], [300, 490]);
  const foodScale = interpolate(foodProgress, [0.7, 1], [1, 0.05]);
  const foodOpacity = interpolate(foodProgress, [0.85, 1], [1, 0]);
  const metaScale = interpolate(foodProgress, [0.9, 1], [1, 1.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const memberOpacity = interpolate(frame, [150, 220], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080">
        <g transform={`scale(${metaScale}) translate(${960 * (1 - metaScale)}, ${500 * (1 - metaScale)})`}>
          <Cell x={960} y={500} radius={140} color="#3b82f6" spikes={10} vitality={0.8} consuming={foodProgress > 0.8} />
        </g>
        <g opacity={foodOpacity} transform={`scale(${foodScale}) translate(${foodX * (1 - foodScale)}, ${foodY * (1 - foodScale)})`}>
          <Cell x={foodX} y={foodY} radius={42} color="#ef4444" spikes={0} vitality={0.2} />
        </g>
        <g opacity={memberOpacity}>
          <Cell x={1450} y={400} radius={52} color="#22c55e" spikes={6} vitality={0.6} delay={150} label="YOU?" />
          <line x1={1450} y1={400} x2={1450} y2={550} stroke="#22c55e" strokeWidth={2} strokeDasharray="8 4" opacity={0.5} />
          <circle cx={1450} cy={560} r={8} fill="#22c55e" opacity={0.5} />
        </g>
      </svg>
      <TextOverlay text="Most are food, not members." inFrame={0} outFrame={200} size="lg" position="top" color="#ef4444" />
      <TextOverlay text="To truly belong, you need some form of control." inFrame={210} outFrame={370} size="md" position="bottom" color="#22c55e" />
    </AbsoluteFill>
  );
};
