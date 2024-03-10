import { useImageHistoryStore } from "@/state/ImageHistory/store";
import { ImageDataItem } from "@/state/types";
import React from "react";

type ImageHistoryItemProps = {
  imageHistoryItem: ImageDataItem;
};

export default function ImageHistoryItem({
  imageHistoryItem: item,
}: ImageHistoryItemProps) {
  return (
    <div className={`border-2 border-black flex flex-row gap-2`}>
      <img className="w-1/2" src={item.fileUrl} />
      <h1>{item.description}</h1>
    </div>
  );
}
