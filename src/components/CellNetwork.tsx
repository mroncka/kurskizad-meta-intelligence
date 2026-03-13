import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface CellNetworkProps {
  cells: Array<{ x: number; y: number; radius: number; color: string; delay?: number }>;
  showConnections?: boolean;
  connectionColor?: string;
}

export const CellNetwork: React.FC<CellNetworkProps> = ({
  cells, showConnections = true, connectionColor = "rgba(59, 130, 246, 0.3)",
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080">
        {showConnections && cells.map((a, i) =>
          cells.slice(i + 1).map((b, j) => {
            const dist = Math.hypot(b.x - a.x, b.y - a.y);
            if (dist > 600) return null;
            const opacity = interpolate(dist, [0, 600], [0.5, 0.05]);
            const pulse = interpolate(Math.sin(frame * 0.04 + i * 0.5), [-1, 1], [0.4, 1]);
            return (
              <line key={`${i}-${j}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={connectionColor} strokeWidth={1.5}
                opacity={opacity * pulse}
              />
            );
          })
        )}
      </svg>
    </AbsoluteFill>
  );
};
