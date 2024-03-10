import { useImageHistoryStore } from "@/state/ImageHistory/store";
import React from "react";
import ImageHistoryItem from "./ImageHistoryItem";

export default function ImageHistoryList() {
  const imageHistory = useImageHistoryStore((state) => state.imageHistory);
  const currentIndex = useImageHistoryStore((state) => state.currentIndex);

  if (currentIndex === undefined || currentIndex > imageHistory.length - 1) {
    alert("Invalid index");
    return;
  }

  return (
    <div className="flex flex-col gap-3">
      {imageHistory.map((item, index) => (
        <ImageHistoryItem
          isSelected={index === currentIndex}
          imageHistoryItem={item}
        />
      ))}
    </div>
  );
}
