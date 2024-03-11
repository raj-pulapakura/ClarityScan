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
    <div
      className={`w-full flex flex-col items-center rounded-lg border-4 border-gray-400 border-opacity-80`}
    >
      <div className="py-3 text-center">
        <h1 className=" font-semibold mb-2">{item.description}</h1>
        <p className="text-sm text-gray-900">{item.id}</p>
      </div>
      <img className="w-full rounded-b-md" src={item.fileUrl} />
    </div>
  );
}
