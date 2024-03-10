import React from "react";
import Panel from "./Panel";
import { useTumorDetectionResultsStore } from "@/state/TumorDetectionResults/store";
import ImageItem from "../ImageItem";

export default function DetectionResultsPanel() {
  const inputDataItem = useTumorDetectionResultsStore(
    (state) => state.inputDataItem
  );

  const tumorMaskDataItem = useTumorDetectionResultsStore(
    (state) => state.tumorMaskDataItem
  );

  const tumorOverlayDataItem = useTumorDetectionResultsStore(
    (state) => state.tumorOverlayDataItem
  );

  if (!inputDataItem || !tumorMaskDataItem || !tumorOverlayDataItem) {
    return;
  }

  return (
    <Panel title="Segmentation Results">
      <div className="grid grid-rows-2 grid-cols-2">
        <ImageItem
          className="row-start-1 row-end-2 col-start-1 col-end-2 border-none"
          imageDataItem={inputDataItem}
        />
        <ImageItem
          className="row-start-1 row-end-2 col-start-2 col-end-3 border-none"
          imageDataItem={tumorMaskDataItem}
        />
        <ImageItem
          className="row-start-2 row-end-3 col-start-1 col-end-2 border-none"
          imageDataItem={tumorOverlayDataItem}
        />
      </div>
    </Panel>
  );
}
