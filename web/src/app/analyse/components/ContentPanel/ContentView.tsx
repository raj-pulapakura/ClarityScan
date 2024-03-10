"use client";

import React from "react";
import NoiseRemovalAction from "./panels/NoiseRemovalPanel";
import IdentifyTumorPanel from "./panels/IdentifyTumorPanel";
import DetectionResultsPanel from "./panels/DetectionResultsPanel";

export default function ContentPanel() {
  return (
    <div className="flex flex-col gap-5">
      <NoiseRemovalAction />
      <IdentifyTumorPanel />
      <DetectionResultsPanel />
    </div>
  );
}
