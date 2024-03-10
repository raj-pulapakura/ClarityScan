import {
  ImageHistoryDataItem,
  ImageHistoryDataItemStage,
} from "@/state/ImageHistory/types";
import React from "react";

type ImageHistoryItemProps = {
  imageHistoryItem: ImageHistoryDataItem;
  isSelected: boolean;
};

export default function ImageHistoryItem({
  imageHistoryItem: item,
  isSelected,
}: ImageHistoryItemProps) {
  let description = "";

  switch (item.stage) {
    case ImageHistoryDataItemStage.ORIGINAL:
      description = "Original Image";
      break;
    case ImageHistoryDataItemStage.NOISE_REMOVED:
      description = "Noise Removed";
      break;
    case ImageHistoryDataItemStage.TUMOR_DETECTED:
      description = "Tumor Detected";
      break;
  }

  const borderColor = isSelected ? "primary" : "black";

  return (
    <div className={`border-2 border-${borderColor} flex flex-row gap-2`}>
      <img className="w-1/2" src={item.fileUrl} />
      <h1>{description}</h1>
    </div>
  );
}
