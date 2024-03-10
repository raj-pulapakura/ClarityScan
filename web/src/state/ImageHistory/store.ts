import { create } from "zustand";
import { ImageDataItem, ImageDataItemList } from "../types";

interface ImageHistoryState {
  imageHistory: ImageDataItemList;
  addImageHistoryItem: (imageHistoryItem: ImageDataItem) => void;
}

export const useImageHistoryStore = create<ImageHistoryState>()((set) => ({
  imageHistory: [],
  addImageHistoryItem: (imageHistoryItem) =>
    set((state) => ({
      ...state,
      imageHistory: [imageHistoryItem, ...state.imageHistory],
    })),
}));
