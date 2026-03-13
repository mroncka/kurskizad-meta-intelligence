import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Cell } from "../components/Cell";
import { CellNetwork } from "../components/CellNetwork";
import { TextOverlay } from "../components/TextOverlay";

export const MetaIntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const orbitRadius = 260;
  const orbiterCount = 8;
  const orbiters = Array.from({ length: orbiterCount }, (_, i) => {
    const angle = (i / orbiterCount) * Math.PI * 2 + frame * 0.008;
    return {
      x: 960 + Math.cos(angle) * orbitRadius,
      y: 480 + Math.sin(angle) * orbitRadius * 0.6,
      radius: 28 + (i % 3) * 8,
      color: i % 3 === 0 ? "#f59e0b" : "rgba(255,255,255,0.4)",
      delay: i * 15,
    };
  });

  const allCells = [{ x: 960, y: 480, radius: 130, color: "#3b82f6", delay: 0 }, ...orbiters];

  return (
    <AbsoluteFill>
      <CellNetwork cells={allCells} connectionColor="rgba(59,130,246,0.15)" />
      <svg width="100%" height="100%" viewBox="0 0 1920 1080">
        {orbiters.map((c, i) => <Cell key={i} {...c} vitality={0.4} spikes={i % 4 === 0 ? 5 : 0} />)}
        <Cell x={960} y={480} radius={130} color="#3b82f6" spikes={8} vitality={0.7} delay={0} label="META" />
      </svg>
      <TextOverlay text="Meta-Intelligence" subtitle="A system smarter than the sum of its parts" inFrame={20} outFrame={320} size="xl" position="top" accent />
      <TextOverlay text="Some people seem to belong to a greater whole." inFrame={200} outFrame={420} size="md" position="bottom" />
    </AbsoluteFill>
  );
};
