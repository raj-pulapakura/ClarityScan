import { ImageDataItem } from "@/state/types";
import React from "react";

export default function ImageItem({
  imageDataItem,
  selected = false,
  className,
  ...props
}: {
  imageDataItem: ImageDataItem;
  selected?: boolean;
} & JSX.IntrinsicElements["div"]) {
  const borderStyle = selected
    ? "border-blue-500 border-4"
    : "border-white border-4";

  return (
    <div
      className={`flex flex-row items-center rounded-lg ${borderStyle} ${className}`}
      {...props}
    >
      <div className="flex-col text-center">
        <h1 className="font-semibold mb-2">{imageDataItem.description}</h1>
        <p className="text-xs text-gray-700 text-wrap">{imageDataItem.id}</p>
      </div>
      <img className="w-2/5" src={imageDataItem.fileUrl} />
    </div>
  );
}
