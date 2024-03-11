"use client";

import React from "react";
import NoiseRemovalAction from "./panels/NoiseRemovalPanel";
import IdentifyTumorPanel from "./panels/IdentifyTumorPanel";
import DetectionResultsPanel from "./panels/DetectionResultsPanel";

export default function ContentView({
  className,
  ...props
}: JSX.IntrinsicElements["div"]) {
  return (
    <div className={`flex flex-col gap-12 w-full ${className}`}>
      <NoiseRemovalAction />
      <IdentifyTumorPanel />
      <DetectionResultsPanel />
    </div>
  );
}
