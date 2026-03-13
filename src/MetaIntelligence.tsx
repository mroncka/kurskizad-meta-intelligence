import React from "react";
import { AbsoluteFill, Sequence, Audio } from "remotion";
import { Background } from "./components/Background";
import { HookScene } from "./scenes/Hook";
import { MetaIntroScene } from "./scenes/MetaIntroScene";
import { FoodVsMemberScene } from "./scenes/FoodVsMember";
import { FamilyControlScene } from "./scenes/FamilyControl";
import { PowerScene } from "./scenes/PowerScene";
import { TrapScene } from "./scenes/TrapScene";
import { BuildYourCellScene } from "./scenes/BuildYourCell";

// Scene timing (30fps)
// 0–10s   = 0–300     Hook
// 10–25s  = 300–750   Meta-Intelligence Intro
// 25–38s  = 750–1140  Food vs Member
// 38–55s  = 1140–1650 Family Control
// 55–68s  = 1650–2040 Power Reintroduced
// 68–78s  = 2040–2340 The Trap
// 78–90s  = 2340–2700 Build Your Cell

export const MetaIntelligence: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <Background />

      {/* Uncomment after adding public/voiceover.mp3 */}
      {/* <Audio src={staticFile("voiceover.mp3")} /> */}

      <Sequence from={0} durationInFrames={300}>
        <HookScene />
      </Sequence>

      <Sequence from={300} durationInFrames={450}>
        <MetaIntroScene />
      </Sequence>

      <Sequence from={750} durationInFrames={390}>
        <FoodVsMemberScene />
      </Sequence>

      <Sequence from={1140} durationInFrames={510}>
        <FamilyControlScene />
      </Sequence>

      <Sequence from={1650} durationInFrames={390}>
        <PowerScene />
      </Sequence>

      <Sequence from={2040} durationInFrames={300}>
        <TrapScene />
      </Sequence>

      <Sequence from={2340} durationInFrames={360}>
        <BuildYourCellScene />
      </Sequence>
    </AbsoluteFill>
  );
};
