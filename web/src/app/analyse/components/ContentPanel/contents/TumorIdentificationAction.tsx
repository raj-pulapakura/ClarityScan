import PrimaryButton from "@/shared/buttons/PrimaryButton";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import {
  ImageHistoryDataItem,
  ImageHistoryDataItemStage,
} from "@/state/ImageHistory/types";
import React, { useState } from "react";

export default function TumorIdentificationAction() {
  const imageHistory = useImageHistoryStore((state) => state.imageHistory);
  const currentHistoryLength = imageHistory.length;
  const addImageHistoryItem = useImageHistoryStore(
    (state) => state.addImageHistoryItem
  );
  const setCurrentIndex = useImageHistoryStore(
    (state) => state.setCurrentIndex
  );

  const [loading, setLoading] = useState(false);

  // const updateImageHistory = () => {
  //   const newHistoryItem: ImageHistoryDataItem = {
  //     file: imageHistory[currentHistoryLength - 1].file,
  //     fileUrl: imageHistory[currentHistoryLength - 1].fileUrl,
  //     stage: ImageHistoryDataItemStage.TUMOR_DETECTED,
  //   };

  //   addImageHistoryItem(newHistoryItem);
  //   setCurrentIndex(0);
  // };

  // const updateSegmentationResults = () => {
  //   const tumorMaskData: SegmentationResultsDataItem = {
  //     file: imageHistory[currentHistoryLength - 1].file,
  //     fileUrl: imageHistory[currentHistoryLength - 1].fileUrl,
  //   };
  //   const tumorOverlayData: SegmentationResultsDataItem = {
  //     file: imageHistory[currentHistoryLength - 1].file,
  //     fileUrl: imageHistory[currentHistoryLength - 1].fileUrl,
  //   };
  //   setTumorMask(tumorMaskData);
  //   setTumorOverlay(tumorOverlayData);
  //   setInputItem(props.inputItem);
  // };

  const onButtonClicked = () => {
    setLoading(true);
    // updateImageHistory();
    // updateSegmentationResults();
    setLoading(false);
  };

  return (
    <section>
      <h1>Tumor Identification</h1>
      <p>
        Our ML model will attempt to identify if there is a lower-grade glioma
        in the given scan.
      </p>
      <PrimaryButton loading={loading} onClick={onButtonClicked}>
        IDENTIFY TUMOR
      </PrimaryButton>
      <p>
        Please keep in mind that AI-enhanced images should be given appropriate
        review.
      </p>
    </section>
  );
}
