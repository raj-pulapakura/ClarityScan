import { useImageHistoryStore } from "@/state/ImageHistory/store";
import {
  ImageHistoryDataItem,
  ImageHistoryDataItemStage,
} from "@/state/ImageHistory/types";
import React from "react";

type ImageHistoryItemProps = {
  imageHistoryItem: ImageHistoryDataItem;
  index: number;
};

export default function ImageHistoryItem({
  imageHistoryItem: item,
  index,
}: ImageHistoryItemProps) {
  const currentIndex = useImageHistoryStore((state) => state.currentIndex);
  const setCurrentIndex = useImageHistoryStore(
    (state) => state.setCurrentIndex
  );

  let description = "";

  switch (item.stage) {
    case ImageHistoryDataItemStage.UPLOADED:
      description = "Uploaded Image";
      break;
    case ImageHistoryDataItemStage.NOISE_REMOVED:
      description = "Noise Removed";
      break;
    case ImageHistoryDataItemStage.TUMOR_DETECTED_FROM_ORIGINAL:
      description = "Tumor Detected from Uploaded Image";
      break;
    case ImageHistoryDataItemStage.TUMOR_DETECTED_FROM_NOISE_REMOVED:
      description = "Tumor Detected from Noise Removed Image";
      break;
  }

  const borderColor = index === currentIndex ? "primary" : "black";

  const onItemClicked = () => setCurrentIndex(index);

  return (
    <div
      onClick={onItemClicked}
      className={`border-2 border-${borderColor} flex flex-row gap-2`}
    >
      <img className="w-1/2" src={item.fileUrl} />
      <h1>{description}</h1>
    </div>
  );
}
