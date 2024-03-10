import PrimaryButton from "@/shared/buttons/PrimaryButton";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import {
  ImageHistoryDataItem,
  ImageHistoryDataItemStage,
} from "@/state/ImageHistory/types";
import React, { useState } from "react";

export default function NoiseRemovalAction() {
  const imageHistory = useImageHistoryStore((state) => state.imageHistory);
  const currentHistoryLength = imageHistory.length;
  const addImageHistoryItem = useImageHistoryStore(
    (state) => state.addImageHistoryItem
  );
  const setCurrentIndex = useImageHistoryStore(
    (state) => state.setCurrentIndex
  );

  const [loading, setLoading] = useState(false);

  const onButtonClicked = () => {
    console.log(imageHistory);
    setLoading(true);
    console.log("Requesting noise corrected image");
    setLoading(false);

    const newHistoryItem: ImageHistoryDataItem = {
      file: imageHistory[currentHistoryLength - 1].file,
      fileUrl: imageHistory[currentHistoryLength - 1].fileUrl,
      stage: ImageHistoryDataItemStage.NOISE_REMOVED,
    };

    addImageHistoryItem(newHistoryItem);
    setCurrentIndex(0);
  };

  return (
    <section>
      <h1>Noise Removal</h1>
      <p>
        Before identifying the tumor, it may be helpful to remove any noise
        which is present in the scan.
      </p>
      <PrimaryButton loading={loading} onClick={onButtonClicked}>
        REMOVE NOISE
      </PrimaryButton>
      <p>
        Please keep in mind that AI-enhanced images should be given appropriate
        review.
      </p>
    </section>
  );
}
