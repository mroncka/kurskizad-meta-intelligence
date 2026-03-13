import React from "react";
import { Composition } from "remotion";
import { MetaIntelligence } from "./MetaIntelligence";

// 90 seconds at 30fps = 2700 frames
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MetaIntelligence"
        component={MetaIntelligence}
        durationInFrames={2700}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
