import { useImageHistoryStore } from "@/state/ImageHistory/store";
import React from "react";
import ImageHistoryItem from "./ImageHistoryItem";
import NoImagesToShow from "../NoImagesToShow";

export default function ImageHistoryList() {
  const imageHistory = useImageHistoryStore((state) => state.imageHistory);

  return (
    <div className="flex flex-col gap-3 h-full">
      {imageHistory.length ? (
        imageHistory.map((item) => (
          <ImageHistoryItem key={item.id} imageHistoryItem={item} />
        ))
      ) : (
        <NoImagesToShow />
      )}
    </div>
  );
}
