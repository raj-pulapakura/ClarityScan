import PrimaryButton from "@/shared/buttons/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import Panel from "../../../../../shared/panel/Panel";
import { useNoiseRemovalInputsState } from "@/state/NoiseRemovalInputs/store";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import { useTumorDetectionInputsState } from "@/state/TumorDetectionInputs/store";
import { ImageDataItem } from "@/state/types";
import { v4 } from "uuid";
import ImageItem from "../../containers/ImageItemVertical";
import { extractFilesFromZipBlob } from "@/dataFetching/extractFilesFromZipBlob";
import NoImagesToShow from "../../containers/NoImagesToShow";
import AvailableImagesHeadline from "../../containers/AvailableImagesHeadline";
import PanelInnerContainer from "../../../../../shared/panel/PanelInnerContainer";
import PanelActionContainer from "../../../../../shared/panel/PanelActionContainer";

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
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getDenoisedImageFile = async () => {
    const formData = new FormData();
    const modelInputFile = noiseRemovalInputs[currentIndex].file;
    formData.append(
      "file",
      new Blob([modelInputFile], { type: modelInputFile.type })
    );
    let response;
    response = await fetch("/api/denoisingModelService", {
      method: "POST",
      body: formData,
    });
    if (response.status == 504) {
      const timeout = 60 * 1000;
      console.log(`error, retrying in ${timeout} ms`);
      setTimeout(async () => {
        response = await fetch("/api/denoisingModelService", {
          method: "POST",
          body: formData,
        });
      }, timeout);
    }
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
            ref={buttonRef}
            disabled={!noiseRemovalInputs.length}
            onClick={onRemovedNoiseButtonClicked}
            loading={loading}
          >
            Remove Noise
          </PrimaryButton>
        </PanelActionContainer>
        {noiseRemovalInputs.length ? (
          <div className="flex flex-col w-full md:w-3/4">
            <AvailableImagesHeadline />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
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
