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
    <div className={`w-full flex flex-col items-center rounded-lg`}>
      <h1 className="py-3 font-semibold">{item.description}</h1>
      <img className="w-full" src={item.fileUrl} />
    </div>
  );
}
