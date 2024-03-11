"use client";

import React, { useEffect } from "react";
import DownloadAllItemsButton from "./DownloadAllItemsButton";
import DownloadSelectedItemButton from "./DownloadSelectedItemButton";
import ImageHistoryList from "./ImageHistoryList";
import Separator from "@/shared/Separator";

export default function ImageHistory({
  className,
  ...props
}: JSX.IntrinsicElements["div"]) {
  return (
    <div className={`flex flex-col ${className}`} {...props}>
      <h1 className="font-bold text-2xl">Image History</h1>
      <Separator className="mt-3 mb-4" />
      {/* <DownloadAllItemsButton>Download All</DownloadAllItemsButton>
      <DownloadSelectedItemButton>Download Selected</DownloadSelectedItemButton> */}
      <ImageHistoryList />
    </div>
  );
}
