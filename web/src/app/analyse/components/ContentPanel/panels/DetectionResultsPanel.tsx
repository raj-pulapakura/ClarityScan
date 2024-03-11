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

  const showContent =
    inputDataItem && tumorMaskDataItem && tumorOverlayDataItem;

  return (
    <Panel title="Segmentation Results">
      <div className="grid grid-rows-1 grid-cols-3 w-full">
        {showContent ? (
          <>
            <ImageItem
              className="row-start-1 row-end-2 col-start-1 col-end-2 border-none"
              imageDataItem={inputDataItem}
            />
            <ImageItem
              className="row-start-1 row-end-2 col-start-2 col-end-3 border-none"
              imageDataItem={tumorMaskDataItem}
            />
            <ImageItem
              className="row-start-1 row-end-2 col-start-3 col-end-4 border-none"
              imageDataItem={tumorOverlayDataItem}
            />
          </>
        ) : (
          <div className="w-full p-5 mt-5 text-center border-2 rounded-lg border-gray-400 bg-gray-400 bg-opacity-50 ">
            <h1>You have not run tumor identification yet.</h1>
          </div>
        )}
      </div>
    </Panel>
  );
}
