import PrimaryButton from "@/shared/buttons/PrimaryButton";
import React, { useEffect, useState } from "react";
import Panel from "../containers/Panel";
import { useNoiseRemovalInputsState } from "@/state/NoiseRemovalInputs/store";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import { useTumorDetectionInputsState } from "@/state/TumorDetectionInputs/store";
import { ImageDataItem } from "@/state/types";
import { v4 } from "uuid";
import ImageItem from "../../containers/ImageItem";
import { extractFilesFromZipBlob } from "@/dataFetching/extractFilesFromZipBlob";
import NoImagesToShow from "../../containers/NoImagesToShow";
import AvailableImagesHeadline from "../../containers/AvailableImagesHeadline";
import PanelInnerContainer from "../containers/PanelInnerContainer";
import PanelActionContainer from "../containers/PanelActionContainer";

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
    if (!noiseRemovalInputs.length) return;

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
    <Panel title="Noise Removal" loading={loading}>
      <PanelInnerContainer>
        <PanelActionContainer>
          <p className="text-md">
            Remove noise from your MRI Scans to enhance their quality. This can
            potentially increase the accuracy of the glioma segmentation.
          </p>
          <PrimaryButton
            disabled={!noiseRemovalInputs.length}
            onClick={onRemovedNoiseButtonClicked}
            loading={loading}
          >
            Remove Noise
          </PrimaryButton>
        </PanelActionContainer>
        {noiseRemovalInputs.length ? (
          <div className="flex flex-col w-3/4">
            <AvailableImagesHeadline />
            <div className="grid grid-cols-2 gap-5 mt-4">
              {noiseRemovalInputs.map((dataItem, index) => (
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
