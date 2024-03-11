import PrimaryButton from "@/shared/buttons/PrimaryButton";
import React, { useState } from "react";
import Panel from "./Panel";
import { useTumorDetectionInputsState } from "@/state/TumorDetectionInputs/store";
import ImageItem from "../ImageItem";
import { useTumorDetectionResultsStore } from "@/state/TumorDetectionResults/store";
import { ImageDataItem } from "@/state/types";
import { v4 } from "uuid";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import { extractFilesFromZipBlob } from "@/dataFetching/extractFilesFromZipBlob";

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
  const [loading, setLoading] = useState(false);

  const getTumorDetectionResults = async () => {
    const formData = new FormData();
    const modelInputFile = tumorDetectionInputs[currentIndex].file;
    formData.append(
      "file",
      new Blob([modelInputFile], { type: modelInputFile.type })
    );
    const response = await fetch("/api/segmentationModelService", {
      method: "POST",
      body: formData,
    });
    const zipBlob = await response.blob();
    const predictionFiles = await extractFilesFromZipBlob(zipBlob);
    const [overlayImage, maskImage] = predictionFiles;
    return [overlayImage, maskImage];
  };

  const onIdentifyButtonClicked = async () => {
    setLoading(true);
    const modelInputFile = tumorDetectionInputs[currentIndex];
    const [overlayImage, maskImage] = await getTumorDetectionResults();

    const inputDataItem = {
      id: v4(),
      file: modelInputFile.file,
      fileUrl: modelInputFile.fileUrl,
      description: "Input Image",
    };

    const tumorMaskDataItem = {
      id: v4(),
      file: maskImage,
      fileUrl: URL.createObjectURL(maskImage),
      description: "Glioma Mask",
    };

    const tumorOverlayDataItem = {
      id: v4(),
      file: overlayImage,
      fileUrl: URL.createObjectURL(overlayImage),
      description: "Glioma Mask Overlay",
    };

    setInputDataItem(inputDataItem);
    setTumorMaskDataItem(tumorMaskDataItem);
    setTumorOverlayDataItem(tumorOverlayDataItem);

    addImageHistoryItem(tumorMaskDataItem);
    addImageHistoryItem(tumorOverlayDataItem);

    setLoading(false);
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
            {loading && "Loading"} Identify Tumor
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
