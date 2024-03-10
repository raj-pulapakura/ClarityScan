"use client";

import React from "react";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import {
  ImageHistoryDataItemStage,
  UploadedDataItem,
} from "@/state/ImageHistory/types";
import NoiseRemovalAction from "./contents/NoiseRemovalAction";
import TumorIdentificationAction from "./contents/TumorIdentificationAction";
import TumorSegmentationView from "./contents/TumorSegmentationView";

export default function ContentPanel() {
  const imageHistory = useImageHistoryStore((state) => state.imageHistory);
  const currentIndex = useImageHistoryStore((state) => state.currentIndex);

  if (currentIndex === undefined || currentIndex > imageHistory.length - 1) {
    alert("Invalid index");
    return;
  }

  const currentImageItem = imageHistory[currentIndex];

  let content;

  switch (currentImageItem.stage) {
    case ImageHistoryDataItemStage.UPLOADED:
      content = (
        <>
          <NoiseRemovalAction
            uploadedDataItem={currentImageItem as UploadedDataItem}
          />
          <TumorIdentificationAction />
        </>
      );
      break;
    case ImageHistoryDataItemStage.NOISE_REMOVED:
      content = <TumorIdentificationAction />;
      break;
    case ImageHistoryDataItemStage.TUMOR_DETECTED_FROM_ORIGINAL:
      content = <TumorSegmentationView />;
      break;
    case ImageHistoryDataItemStage.TUMOR_DETECTED_FROM_NOISE_REMOVED:
      content = <TumorSegmentationView />;
      break;
  }

  return <div className="flex flex-col gap-5">{content}</div>;
}
