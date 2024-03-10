"use client";

import { useImageHistoryStore } from "@/state/ImageHistory/store";
import React, { useEffect } from "react";
import DownloadAllItemsButton from "./DownloadAllItemsButton";
import DownloadSelectedItemButton from "./DownloadSelectedItemButton";
import ImageHistoryList from "./ImageHistoryList";

export default function ImageHistory() {
  return (
    <div className="flex flex-col gap-4">
      <DownloadAllItemsButton>Download All</DownloadAllItemsButton>
      <DownloadSelectedItemButton>Download Selected</DownloadSelectedItemButton>
      <ImageHistoryList />
    </div>
  );
}
