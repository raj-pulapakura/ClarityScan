import { create } from "zustand";
import { ImageDataItem, ImageDataItemList } from "../types";

interface TumorDetectionInputsState {
  tumorDetectionInputs: ImageDataItemList;
  currentIndex: number;
  addTumorDetectionInput: (tumorDetectionInput: ImageDataItem) => void;
  setCurrentIndex: (newIndex: number) => void;
  clear: () => void;
}

export const useTumorDetectionInputsState = create<TumorDetectionInputsState>()(
  (set) => ({
    tumorDetectionInputs: [],
    currentIndex: 0,
    addTumorDetectionInput: (tumorDetectionInput) =>
      set((state) => ({
        ...state,
        tumorDetectionInputs: [
          tumorDetectionInput,
          ...state.tumorDetectionInputs,
        ],
      })),
    setCurrentIndex: (newIndex) =>
      set((state) => ({ ...state, currentIndex: newIndex })),
    clear: () =>
      set((state) => ({ ...state, tumorDetectionInputs: [], currentIndex: 0 })),
  })
);
