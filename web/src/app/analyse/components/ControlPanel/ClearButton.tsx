import DangerButton from "@/shared/buttons/DangerButton";
import NeutralButton from "@/shared/buttons/NeutralButton";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import { useNoiseRemovalInputsState } from "@/state/NoiseRemovalInputs/store";
import { useTumorDetectionInputsState } from "@/state/TumorDetectionInputs/store";
import { useTumorDetectionResultsStore } from "@/state/TumorDetectionResults/store";
import React from "react";

export default function ClearButton() {
  const imageHistory = useImageHistoryStore((state) => state.imageHistory);

  const clearImageHistory = useImageHistoryStore((state) => state.clear);
  const clearNoiseRemovalInputs = useNoiseRemovalInputsState(
    (state) => state.clear
  );
  const clearTumorDetectionInputs = useTumorDetectionInputsState(
    (state) => state.clear
  );
  const clearTumorDetectionResults = useTumorDetectionResultsStore(
    (state) => state.clear
  );

  const onClearButtonClicked = async () => {
    if (!imageHistory.length) return;

    clearImageHistory();
    clearNoiseRemovalInputs();
    clearTumorDetectionInputs();
    clearTumorDetectionResults();
  };

  return (
    <DangerButton
      onClick={onClearButtonClicked}
      disabled={!imageHistory.length}
      className="px-10"
    >
      Clear
    </DangerButton>
  );
}
