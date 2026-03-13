import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Cell } from "../components/Cell";
import { TextOverlay } from "../components/TextOverlay";

export const FamilyControlScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const child1Grow = spring({ frame: frame - 140, fps, config: { damping: 14, stiffness: 60 }, from: 20, to: 55 });
  const child2Grow = spring({ frame: frame - 170, fps, config: { damping: 14, stiffness: 60 }, from: 20, to: 50 });
  const child3Grow = spring({ frame: frame - 190, fps, config: { damping: 14, stiffness: 60 }, from: 20, to: 45 });

  const expandProgress = interpolate(frame, [380, 510], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const c1x = interpolate(expandProgress, [0, 1], [780, 500]);
  const c2x = interpolate(expandProgress, [0, 1], [960, 960]);
  const c2y = interpolate(expandProgress, [0, 1], [380, 220]);
  const c3x = interpolate(expandProgress, [0, 1], [1140, 1420]);

  const societyCells = [
    { x: 350, y: 650, r: 25, delay: 400 }, { x: 580, y: 720, r: 20, delay: 420 },
    { x: 960, y: 180, r: 30, delay: 400 }, { x: 1150, y: 170, r: 22, delay: 430 },
    { x: 1600, y: 600, r: 28, delay: 410 }, { x: 1750, y: 750, r: 18, delay: 440 },
  ];

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080">
        <Cell x={960} y={600} radius={110} color="#f59e0b" spikes={10} vitality={0.9} delay={0} label="PARENT" />
        {frame > 120 && (
          <>
            <Cell x={c1x} y={520} radius={child1Grow} color="#3b82f6" spikes={4} vitality={0.5} delay={140} label="CHILD" />
            <Cell x={c2x} y={c2y} radius={child2Grow} color="#3b82f6" spikes={4} vitality={0.5} delay={170} label="CHILD" />
            <Cell x={c3x} y={520} radius={child3Grow} color="#3b82f6" spikes={4} vitality={0.5} delay={190} label="CHILD" />
          </>
        )}
        {frame > 400 && societyCells.map((c, i) => (
          <Cell key={i} x={c.x} y={c.y} radius={c.r} color="rgba(59,130,246,0.5)" spikes={3} vitality={0.3} delay={c.delay} />
        ))}
        {frame > 130 && frame < 400 && (
          <>
            <line x1={960} y1={600} x2={c1x} y2={520} stroke="#f59e0b" strokeWidth={2} opacity={0.3} strokeDasharray="6 4" />
            <line x1={960} y1={600} x2={c2x} y2={c2y} stroke="#f59e0b" strokeWidth={2} opacity={0.3} strokeDasharray="6 4" />
            <line x1={960} y1={600} x2={c3x} y2={520} stroke="#f59e0b" strokeWidth={2} opacity={0.3} strokeDasharray="6 4" />
          </>
        )}
      </svg>
      <TextOverlay text="A family starts with absolute control." inFrame={0} outFrame={200} size="md" position="top" color="#f59e0b" />
      <TextOverlay text="As children grow, they take on responsibility." inFrame={200} outFrame={360} size="md" position="top" />
      <TextOverlay text="They expand — and become part of society." inFrame={380} outFrame={490} size="md" position="top" color="#3b82f6" accent />
    </AbsoluteFill>
  );
};
