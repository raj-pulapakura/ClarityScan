"use client";

import React, { useState } from "react";
import TestImage from "./TestImage";
import PrimaryButton from "@/shared/buttons/PrimaryButton";
import { ImageDataItem } from "@/state/types";
import { v4 } from "uuid";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import { useNoiseRemovalInputsState } from "@/state/NoiseRemovalInputs/store";
import { useTumorDetectionInputsState } from "@/state/TumorDetectionInputs/store";
import { useRouter } from "next/navigation";
import AnalysePage from "@/app/analyse/page";

export default function TestImageSelector() {
  const samplePaths = ["/sampleScans/test1.jpg", "/sampleScans/test2.jpg"];
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const router = useRouter();

  const addImageHistoryItem = useImageHistoryStore(
    (state) => state.addImageHistoryItem
  );
  const addNoiseRemovalInput = useNoiseRemovalInputsState(
    (state) => state.addNoiseRemovalInput
  );
  const addTumorDetectionInput = useTumorDetectionInputsState(
    (state) => state.addTumorDetectionInput
  );

  const onContinueButtonClicked = async () => {
    if (currentIndex == null) return;
    const samplePath = samplePaths[currentIndex];
    const response = await fetch(samplePath);

    const newFileBlob = await response.blob();
    const newImageFile = new File([newFileBlob], "image.jpg", {
      type: "image/jpeg",
    });
    const uploadedDataItem: ImageDataItem = {
      id: v4(),
      file: newImageFile,
      fileUrl: URL.createObjectURL(newImageFile),
      description: "Test Image",
    };
    addImageHistoryItem(uploadedDataItem);
    addNoiseRemovalInput(uploadedDataItem);
    addTumorDetectionInput(uploadedDataItem);
    router.push(AnalysePage.route);
  };

  return (
    <div className="flex flex-col gap-10 border-gray-500 bg-gray-400 bg-opacity-50  border-2 rounded-lg items-center p-7">
      <h1 className="text-xl text-left self-start font-semibold">
        Try a sample scan
      </h1>
      <div className="flex flex-row gap-5">
        {samplePaths.map((src, index) => (
          <TestImage
            key={src}
            selected={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
            src={src}
          />
        ))}
      </div>
      <PrimaryButton
        disabled={currentIndex === null}
        onClick={onContinueButtonClicked}
        className="w-full"
      >
        Continue
      </PrimaryButton>
    </div>
  );
}
