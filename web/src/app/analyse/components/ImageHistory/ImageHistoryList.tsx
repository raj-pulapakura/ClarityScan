import { useImageHistoryStore } from "@/state/ImageHistory/store";
import React from "react";
import ImageHistoryItem from "./ImageHistoryItem";

export default function ImageHistoryList() {
  const imageHistory = useImageHistoryStore((state) => state.imageHistory);

  return (
    <div className="flex flex-col gap-3">
      {imageHistory.map((item, index) => (
        <ImageHistoryItem imageHistoryItem={item} />
      ))}
    </div>
  );
}
