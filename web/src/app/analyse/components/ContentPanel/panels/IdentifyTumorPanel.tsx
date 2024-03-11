import PrimaryButton from "@/shared/buttons/PrimaryButton";
import React, { useState } from "react";
import Panel from "../containers/Panel";
import { useTumorDetectionInputsState } from "@/state/TumorDetectionInputs/store";
import ImageItem from "../../containers/ImageItem";
import { useTumorDetectionResultsStore } from "@/state/TumorDetectionResults/store";
import { ImageDataItem } from "@/state/types";
import { v4 } from "uuid";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import { extractFilesFromZipBlob } from "@/dataFetching/extractFilesFromZipBlob";
import NoImagesToShow from "../../containers/NoImagesToShow";
import AvailableImagesHeadline from "../../containers/AvailableImagesHeadline";
import PanelInnerContainer from "../containers/PanelInnerContainer";
import PanelActionContainer from "../containers/PanelActionContainer";

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
    if (!tumorDetectionInputs.length) return;

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
    <Panel title="Tumor Identification" loading={loading}>
      <PanelInnerContainer>
        <PanelActionContainer>
          <p className="text-md">
            Our ML model will attempt to identify if there is a lower-grade
            glioma in the given scan.
          </p>
          <PrimaryButton
            disabled={!tumorDetectionInputs.length}
            onClick={onIdentifyButtonClicked}
            loading={loading}
          >
            Identify Tumor
          </PrimaryButton>
        </PanelActionContainer>
        {tumorDetectionInputs.length ? (
          <div className="flex flex-col w-3/4">
            <AvailableImagesHeadline />
            <div className="grid grid-cols-2 gap-5 mt-4">
              {tumorDetectionInputs.map((dataItem, index) => (
                <ImageItem
                  key={dataItem.id}
                  selected={currentIndex === index}
                  onClick={() => setCurrentIndex(index)}
                  imageDataItem={dataItem}
                  className="hover:cursor-pointer"
                />
              ))}
            </div>
          </div>
        ) : (
          <NoImagesToShow />
        )}
      </PanelInnerContainer>
    </Panel>
  );
}
