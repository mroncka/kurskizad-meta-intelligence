import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Cell } from "../components/Cell";
import { CellNetwork } from "../components/CellNetwork";
import { TextOverlay } from "../components/TextOverlay";

export const BuildYourCellScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const playerGrow = spring({ frame, fps, config: { damping: 12, stiffness: 70, mass: 1 }, from: 0, to: 80 });
  const coopDelays = [60, 100, 140, 180, 220, 260];
  const coopPositions = [
    { x: 680, y: 380 }, { x: 1240, y: 380 },
    { x: 650, y: 640 }, { x: 1270, y: 640 },
    { x: 960, y: 260 }, { x: 960, y: 760 },
  ];
  const networkActivate = interpolate(frame, [280, 360], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const allCells = [
    { x: 960, y: 510, radius: playerGrow, color: "#22c55e", delay: 0 },
    ...coopPositions.map((p, i) => ({ ...p, radius: 38, color: "#3b82f6", delay: coopDelays[i] })),
  ];

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(34,197,94,${networkActivate * 0.12}) 0%, transparent 70%)`, pointerEvents: "none" }} />
      <CellNetwork cells={allCells} connectionColor={`rgba(34,197,94,${0.1 + networkActivate * 0.4})`} />
      <svg width="100%" height="100%" viewBox="0 0 1920 1080">
        {coopPositions.map((p, i) => (
          <Cell key={i} x={p.x} y={p.y} radius={38} color="#3b82f6" spikes={5} vitality={0.6} delay={coopDelays[i]} />
        ))}
        <Cell x={960} y={510} radius={playerGrow} color="#22c55e" spikes={14} vitality={1.0} delay={0} label="YOU" />
      </svg>
      <TextOverlay text="Or build your own." inFrame={0} outFrame={180} size="xl" position="top" accent />
      <TextOverlay text="Cooperate. Grow. Start the big game." inFrame={190} outFrame={330} size="lg" position="bottom" color="#22c55e" />
    </AbsoluteFill>
  );
};
