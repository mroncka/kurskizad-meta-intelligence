import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";

interface CellProps {
  x: number;
  y: number;
  radius: number;
  color: string;
  spikes?: number;
  vitality?: number;
  delay?: number;
  label?: string;
  consuming?: boolean;
}

export const Cell: React.FC<CellProps> = ({
  x, y, radius, color,
  spikes = 0, vitality = 0.5, delay = 0, label, consuming = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay, fps,
    config: { damping: 12, stiffness: 80, mass: 1 },
    from: 0, to: 1,
  });

  const pulse = interpolate(Math.sin((frame - delay) * 0.08 * vitality), [-1, 1], [0.95, 1.05]);
  const consumePulse = consuming ? interpolate(Math.sin(frame * 0.2), [-1, 1], [1.0, 1.15]) : 1;
  const r = radius * appear * pulse * consumePulse;

  const buildSpikedPath = (cx: number, cy: number, outerR: number, innerR: number, numSpikes: number) => {
    let path = "";
    for (let i = 0; i < numSpikes * 2; i++) {
      const angle = (i * Math.PI) / numSpikes - Math.PI / 2;
      const currentR = i % 2 === 0 ? outerR : innerR;
      const px = cx + Math.cos(angle) * currentR;
      const py = cy + Math.sin(angle) * currentR;
      path += i === 0 ? `M ${px} ${py}` : ` L ${px} ${py}`;
    }
    return path + " Z";
  };

  const glowOpacity = interpolate(appear, [0, 1], [0, 0.4]);

  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r={r * 1.4} fill={color} opacity={glowOpacity * vitality} style={{ filter: `blur(${radius * 0.4}px)` }} />
      {spikes > 0 ? (
        <path d={buildSpikedPath(0, 0, r, r * 0.65, spikes)} fill={color} opacity={0.9} />
      ) : (
        <circle r={r} fill={color} opacity={0.9} />
      )}
      <circle r={r * 0.35} fill="rgba(255,255,255,0.15)" opacity={appear} />
      {label && appear > 0.5 && (
        <text
          textAnchor="middle" dominantBaseline="middle"
          fill="white" fontSize={radius * 0.3}
          fontFamily="Inter, sans-serif" fontWeight="600"
          opacity={interpolate(appear, [0.5, 1], [0, 1])}
        >{label}</text>
      )}
    </g>
  );
};
