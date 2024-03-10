import PrimaryButton from "@/shared/buttons/PrimaryButton";
import React, { useEffect, useState } from "react";
import Panel from "./Panel";
import { useNoiseRemovalInputsState } from "@/state/NoiseRemovalInputs/store";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import { useTumorDetectionInputsState } from "@/state/TumorDetectionInputs/store";
import { ImageDataItem } from "@/state/types";
import { v4 } from "uuid";
import ImageItem from "../ImageItem";

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

  useEffect(() => console.log(noiseRemovalInputs), [noiseRemovalInputs]);

  const [loading, setLoading] = useState(false);

  const onRemovedNoiseButtonClicked = () => {
    setLoading(true);
    const newItem: ImageDataItem = {
      id: v4(),
      file: noiseRemovalInputs[0].file, // change later
      fileUrl: noiseRemovalInputs[0].fileUrl, // change later
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
