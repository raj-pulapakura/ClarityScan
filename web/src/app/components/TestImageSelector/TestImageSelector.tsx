"use client";

import React, { useState } from "react";
import TestImage from "./TestImage";
import PrimaryButton from "@/shared/buttons/PrimaryButton";
import { ImageDataItem } from "@/state/types";
import { v4 } from "uuid";

export default function TestImageSelector() {
  const samplePaths = ["/sampleScans/sample1.png", "/sampleScans/sample2.png"];
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const onContinueButtonClicked = () => {};

  return (
    <div className="flex flex-col gap-5 border-gray-500 bg-gray-400 bg-opacity-10  border-2 rounded-lg items-center p-7">
      <h1>Try a sample scan</h1>
      <div className="flex flex-row gap-5">
        {samplePaths.map((src, index) => (
          <TestImage
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
        CONTINUE
      </PrimaryButton>
    </div>
  );
}
