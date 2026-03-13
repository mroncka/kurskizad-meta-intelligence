import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Cell } from "../components/Cell";
import { TextOverlay } from "../components/TextOverlay";

export const PowerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const powerGrow = spring({ frame: frame - 30, fps, config: { damping: 12, stiffness: 50, mass: 1.5 }, from: 0, to: 1 });
  const attractProgress = interpolate(frame, [150, 350], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const attracted = [
    { sx: 300, sy: 250, ex: 820, ey: 500 },
    { sx: 1600, sy: 200, ex: 1100, ey: 500 },
    { sx: 200, sy: 800, ex: 840, ey: 560 },
    { sx: 1700, sy: 850, ex: 1080, ey: 560 },
    { sx: 960, sy: 100, ex: 960, ey: 380 },
  ];

  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080">
        {attracted.map((c, i) => {
          const cx = interpolate(attractProgress, [0, 1], [c.sx, c.ex]);
          const cy = interpolate(attractProgress, [0, 1], [c.sy, c.ey]);
          const r = interpolate(attractProgress, [0.8, 1], [30, 8]);
          const op = interpolate(attractProgress, [0.85, 1], [1, 0]);
          return <g key={i} opacity={op}><Cell x={cx} y={cy} radius={r} color="#f59e0b" vitality={0.4} delay={i * 20} /></g>;
        })}
        <g transform={`scale(${powerGrow}) translate(${960 * (1 - powerGrow)}, ${500 * (1 - powerGrow)})`}>
          <Cell x={960} y={500} radius={150} color="#a855f7" spikes={12} vitality={1.0} delay={0} label="POWER" />
        </g>
      </svg>
      <TextOverlay text="Power reintroduces control." inFrame={0} outFrame={180} size="lg" position="top" color="#a855f7" />
      <TextOverlay text="As you navigate life, you search for greater cells." inFrame={190} outFrame={360} size="md" position="bottom" />
    </AbsoluteFill>
  );
};
