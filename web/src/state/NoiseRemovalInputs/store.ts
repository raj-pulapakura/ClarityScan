import { create } from "zustand";
import { ImageDataItem, ImageDataItemList } from "../types";

interface NoiseRemovalInputsState {
  noiseRemovalInputs: ImageDataItemList;
  currentIndex: number;
  addNoiseRemovalInput: (noiseRemovalInput: ImageDataItem) => void;
  setCurrentIndex: (newIndex: number) => void;
}

export const useNoiseRemovalInputsState = create<NoiseRemovalInputsState>()(
  (set) => ({
    noiseRemovalInputs: [],
    currentIndex: 0,
    addNoiseRemovalInput: (noiseRemovalInput) =>
      set((state) => ({
        ...state,
        noiseRemovalInputs: [noiseRemovalInput, ...state.noiseRemovalInputs],
      })),
    setCurrentIndex: (newIndex) =>
      set((state) => ({ ...state, currentIndex: newIndex })),
  })
);
