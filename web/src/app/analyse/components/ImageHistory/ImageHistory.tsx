"use client";

import React, { useEffect } from "react";
import DownloadAllItemsButton from "./DownloadAllItemsButton";
import DownloadSelectedItemButton from "./DownloadSelectedItemButton";
import ImageHistoryList from "./ImageHistoryList";

export default function ImageHistory() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Image History</h1>
      <DownloadAllItemsButton>Download All</DownloadAllItemsButton>
      <DownloadSelectedItemButton>Download Selected</DownloadSelectedItemButton>
      <ImageHistoryList />
    </div>
  );
}
