import NeutralButton from "@/shared/buttons/NeutralButton";
import PrimaryButton from "@/shared/buttons/PrimaryButton";
import { createNoiseRemovedDataItem } from "@/state/ImageHistory/creators";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import { UploadedDataItem } from "@/state/ImageHistory/types";
import React, { useState } from "react";

export type NoiseRemovalActionProps = {
  uploadedDataItem: UploadedDataItem;
};

export default function NoiseRemovalAction({
  uploadedDataItem,
}: NoiseRemovalActionProps) {
  const imageHistory = useImageHistoryStore((state) => state.imageHistory);
  const addImageHistoryItem = useImageHistoryStore(
    (state) => state.addImageHistoryItem
  );
  const updateImageHistoryItem = useImageHistoryStore(
    (state) => state.updateImageHistoryItem
  );
  const setCurrentIndex = useImageHistoryStore(
    (state) => state.setCurrentIndex
  );

  const [loading, setLoading] = useState(false);

  const onRemovedNoiseButtonClicked = () => {
    console.log(imageHistory);
    setLoading(true);
    console.log("Requesting noise corrected image");
    setLoading(false);

    // change this
    const noiseRemovedDataItem = createNoiseRemovedDataItem(
      uploadedDataItem.file,
      uploadedDataItem.fileUrl
    );
    // add noise removed image
    addImageHistoryItem(noiseRemovedDataItem);
    // update uploaded image with reference to noise removed image
    updateImageHistoryItem(uploadedDataItem.id, {
      noiseRemovalResultId: noiseRemovedDataItem.id,
    });
    setCurrentIndex(0);
  };

  const onGoToNoiseRemovalResultButtonClicked = () => {
    const noiseRemovalResultId = uploadedDataItem.noiseRemovalResultId;
    const noiseRemovalResultHistoryIndex = imageHistory.findIndex(
      (item) => item.id === noiseRemovalResultId
    );
    setCurrentIndex(noiseRemovalResultHistoryIndex);
  };

  return (
    <section>
      <h1>Noise Removal</h1>
      <p>
        Before identifying the tumor, it may be helpful to remove any noise
        which is present in the scan.
      </p>
      {uploadedDataItem.noiseRemovalResultId ? (
        <NeutralButton onClick={onGoToNoiseRemovalResultButtonClicked}>
          Go to Noise Removal Result
        </NeutralButton>
      ) : (
        <PrimaryButton onClick={onRemovedNoiseButtonClicked}>
          Remove Noise
        </PrimaryButton>
      )}
      <p>
        Please keep in mind that AI-enhanced images should be given appropriate
        review.
      </p>
    </section>
  );
}
