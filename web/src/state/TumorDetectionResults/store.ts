import { create } from "zustand";
import { ImageDataItem, ImageDataItemList } from "../types";

interface TumorDetectionResultsState {
  inputDataItem: ImageDataItem | null;
  tumorMaskDataItem: ImageDataItem | null;
  tumorOverlayDataItem: ImageDataItem | null;
  setInputDataItem: (inputDataItem: ImageDataItem) => void;
  setTumorMaskDataItem: (tumorMaskDataItem: ImageDataItem) => void;
  setTumorOverlaykDataItem: (tumorOverlayDataItem: ImageDataItem) => void;
}

export const useTumorDetectionResultsStore =
  create<TumorDetectionResultsState>()((set) => ({
    inputDataItem: null,
    tumorMaskDataItem: null,
    tumorOverlayDataItem: null,
    setInputDataItem: (inputDataItem) =>
      set((state) => ({
        ...state,
        inputDataItem,
      })),
    setTumorMaskDataItem: (tumorMaskDataItem) =>
      set((state) => ({
        ...state,
        tumorMaskDataItem,
      })),
    setTumorOverlaykDataItem: (tumorOverlayDataItem) =>
      set((state) => ({
        ...state,
        tumorOverlayDataItem,
      })),
  }));
