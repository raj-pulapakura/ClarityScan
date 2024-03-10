import PrimaryButton from "@/shared/buttons/PrimaryButton";
import React, { useState } from "react";
import Panel from "./Panel";
import { useTumorDetectionInputsState } from "@/state/TumorDetectionInputs/store";
import ImageItem from "../ImageItem";
import { useTumorDetectionResultsStore } from "@/state/TumorDetectionResults/store";
import { ImageDataItem } from "@/state/types";
import { v4 } from "uuid";
import { useImageHistoryStore } from "@/state/ImageHistory/store";

export default function IdentifyTumorPanel() {
  const tumorDetectionInputs = useTumorDetectionInputsState(
    (state) => state.tumorDetectionInputs
  );
  const currentIndex = useTumorDetectionInputsState(
    (state) => state.currentIndex
  );
  const setCurrentIndex = useTumorDetectionInputsState(
    (state) => state.setCurrentIndex
  );
  const setInputDataItem = useTumorDetectionResultsStore(
    (state) => state.setInputDataItem
  );
  const setTumorMaskDataItem = useTumorDetectionResultsStore(
    (state) => state.setTumorMaskDataItem
  );
  const setTumorOverlayDataItem = useTumorDetectionResultsStore(
    (state) => state.setTumorOverlaykDataItem
  );
  const addImageHistoryItem = useImageHistoryStore(
    (state) => state.addImageHistoryItem
  );

  const onIdentifyButtonClicked = () => {
    const selectedTumorDetectionInput = tumorDetectionInputs[currentIndex];

    const inputDataItem = {
      id: v4(),
      file: selectedTumorDetectionInput.file, // change
      fileUrl: selectedTumorDetectionInput.fileUrl, // change
      description: "Input Image",
    };

    const tumorMaskDataItem = {
      id: v4(),
      file: selectedTumorDetectionInput.file, // change
      fileUrl: selectedTumorDetectionInput.fileUrl, // change
      description: "Glioma Mask",
    };

    const tumorOverlayDataItem = {
      id: v4(),
      file: selectedTumorDetectionInput.file, // change
      fileUrl: selectedTumorDetectionInput.fileUrl, // change
      description: "Glioma Mask Overlay",
    };

    setInputDataItem(inputDataItem);
    setTumorMaskDataItem(tumorMaskDataItem);
    setTumorOverlayDataItem(tumorOverlayDataItem);

    addImageHistoryItem(tumorMaskDataItem);
    addImageHistoryItem(tumorOverlayDataItem);
  };

  return (
    <Panel title="Tumor Identification">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <p>
            Our ML model will attempt to identify if there is a lower-grade
            glioma in the given scan.
          </p>
          <PrimaryButton onClick={onIdentifyButtonClicked}>
            Identify Tumor
          </PrimaryButton>
        </div>
        <div className="flex flex-row">
          {tumorDetectionInputs.map((dataItem, index) => (
            <ImageItem
              selected={currentIndex === index}
              onClick={() => setCurrentIndex(index)}
              imageDataItem={dataItem}
            />
          ))}
        </div>
      </div>
    </Panel>
  );
}
