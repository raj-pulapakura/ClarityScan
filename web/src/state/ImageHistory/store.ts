import { create } from "zustand";
import { ImageHistoryData, ImageHistoryDataItem } from "./types";

interface ImageHistoryState {
  imageHistory: ImageHistoryData;
  currentIndex: number | undefined;
  addImageHistoryItem: (imageHistoryItem: ImageHistoryDataItem) => void;
  setCurrentIndex: (newIndex: number | undefined) => void;
}

export const useImageHistoryStore = create<ImageHistoryState>()((set) => ({
  imageHistory: [],
  currentIndex: undefined,
  addImageHistoryItem: (imageHistoryItem) =>
    set((state) => ({
      ...state,
      imageHistory: [imageHistoryItem, ...state.imageHistory],
    })),
  setCurrentIndex: (newIndex) =>
    set((state) => ({
      ...state,
      currentIndex: newIndex,
    })),
}));
