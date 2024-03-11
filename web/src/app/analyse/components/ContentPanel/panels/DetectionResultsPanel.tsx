import React from "react";
import Panel from "../../../../../shared/panel/Panel";
import { useTumorDetectionResultsStore } from "@/state/TumorDetectionResults/store";
import ImageItemHorizontal from "../../containers/ImageItemHorizontal";

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
      {showContent ? (
        <div className="grid grid-rows-3 grid-cols-1 md:grid-rows-1 md:grid-cols-3 gap-20 mt-10 w-full">
          <ImageItemHorizontal
            className="border-none"
            imageDataItem={inputDataItem}
          />
          <ImageItemHorizontal
            className="border-none"
            imageDataItem={tumorMaskDataItem}
          />
          <ImageItemHorizontal
            className="border-none"
            imageDataItem={tumorOverlayDataItem}
          />
        </div>
      ) : (
        <div className="w-full p-5 py-16 mt-5 text-center border-2 rounded-lg border-gray-400 bg-gray-400 bg-opacity-50 ">
          <h1 className="font-semibold">
            You have not run tumor identification yet.
          </h1>
        </div>
      )}
    </Panel>
  );
}
