import { create } from "zustand";
import { SegmentationResultsData, SegmentationResultsDataItem } from "./types";

interface SegmentationResultsState {
  segmentationResults: SegmentationResultsData;
  setTumorMask: (itemData: SegmentationResultsDataItem) => void;
  setTumorOverlay: (itemData: SegmentationResultsDataItem) => void;
}

export const useSegmentationResultsStore = create<SegmentationResultsState>()(
  (set) => ({
    segmentationResults: {
      tumorMaskItem: undefined,
      tumorOverlayItem: undefined,
    },
    setTumorMask: (itemData) =>
      set((state) => ({
        ...state,
        segmentationResults: {
          ...state.segmentationResults,
          tumorMaskItem: itemData,
        },
      })),
    setTumorOverlay: (itemData) =>
      set((state) => ({
        ...state,
        segmentationResults: {
          ...state.segmentationResults,
          tumorOverlayItem: itemData,
        },
      })),
  })
);
