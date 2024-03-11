import { create } from "zustand";
import { ImageDataItem, ImageDataItemList } from "../types";

interface ImageHistoryState {
  imageHistory: ImageDataItemList;
  addImageHistoryItem: (imageHistoryItem: ImageDataItem) => void;
  clear: () => void;
}

export const useImageHistoryStore = create<ImageHistoryState>()((set) => ({
  imageHistory: [],
  addImageHistoryItem: (imageHistoryItem) =>
    set((state) => ({
      ...state,
      imageHistory: [imageHistoryItem, ...state.imageHistory],
    })),
  clear: () => set((state) => ({ ...state, imageHistory: [] })),
}));
