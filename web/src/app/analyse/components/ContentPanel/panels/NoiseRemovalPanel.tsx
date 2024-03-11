import PrimaryButton from "@/shared/buttons/PrimaryButton";
import React, { useEffect, useState } from "react";
import Panel from "./Panel";
import { useNoiseRemovalInputsState } from "@/state/NoiseRemovalInputs/store";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import { useTumorDetectionInputsState } from "@/state/TumorDetectionInputs/store";
import { ImageDataItem } from "@/state/types";
import { v4 } from "uuid";
import ImageItem from "../ImageItem";
import { extractFilesFromZipBlob } from "@/dataFetching/extractFilesFromZipBlob";

export default function NoiseRemovalAction() {
  const noiseRemovalInputs = useNoiseRemovalInputsState(
    (state) => state.noiseRemovalInputs
  );
  const currentIndex = useNoiseRemovalInputsState(
    (state) => state.currentIndex
  );
  const setCurrentIndex = useNoiseRemovalInputsState(
    (state) => state.setCurrentIndex
  );
  const addImageHistoryItem = useImageHistoryStore(
    (state) => state.addImageHistoryItem
  );
  const addTumorDetectionInput = useTumorDetectionInputsState(
    (state) => state.addTumorDetectionInput
  );
  const [loading, setLoading] = useState(false);

  const getDenoisedImageFile = async () => {
    const formData = new FormData();
    const modelInputFile = noiseRemovalInputs[currentIndex].file;
    formData.append(
      "file",
      new Blob([modelInputFile], { type: modelInputFile.type })
    );
    const response = await fetch("/api/denoisingModelService", {
      method: "POST",
      body: formData,
    });
    const zipBlob = await response.blob();
    const predictionFiles = await extractFilesFromZipBlob(zipBlob);
    const denoisedImage = predictionFiles[0];
    return denoisedImage;
  };

  const onRemovedNoiseButtonClicked = async () => {
    setLoading(true);
    const denoisedImageFile = await getDenoisedImageFile();
    const newItem: ImageDataItem = {
      id: v4(),
      file: denoisedImageFile,
      fileUrl: URL.createObjectURL(denoisedImageFile),
      description: "Noise Removed",
    };
    addImageHistoryItem(newItem);
    addTumorDetectionInput(newItem);
    setLoading(false);
  };

  return (
    <Panel title="Noise Removal">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <p>
            Before identifying the tumor, it may be helpful to remove any noise
            which is present in the scan.
          </p>
          <PrimaryButton onClick={onRemovedNoiseButtonClicked}>
            {loading && "Loading..."}
            Remove Noise
          </PrimaryButton>
        </div>
        <div className="flex flex-row">
          {noiseRemovalInputs.map((dataItem, index) => (
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
