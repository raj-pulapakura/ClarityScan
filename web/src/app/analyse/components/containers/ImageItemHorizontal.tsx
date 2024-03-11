import { ImageDataItem } from "@/state/types";
import React from "react";

export default function ImageItemHorizontal({
  imageDataItem,
  className,
  ...props
}: {
  imageDataItem: ImageDataItem;
  selected?: boolean;
} & JSX.IntrinsicElements["div"]) {
  return (
    <div
      className={`flex flex-col items-center rounded-lg  ${className}`}
      {...props}
    >
      <div className="flex-col text-center mb-6">
        <h1 className="font-semibold mb-2 text-xl">
          {imageDataItem.description}
        </h1>
        <p className="text-md text-gray-700 text-wrap">{imageDataItem.id}</p>
      </div>
      <img className="w-full" src={imageDataItem.fileUrl} />
    </div>
  );
}
