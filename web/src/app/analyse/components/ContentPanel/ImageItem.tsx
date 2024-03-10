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
    ? "border-primary border-4"
    : "border-black border-2";

  return (
    <div className={`flex flex-col ${borderStyle} ${className}`} {...props}>
      <h1>{imageDataItem.description}</h1>
      <img src={imageDataItem.fileUrl} />
    </div>
  );
}
