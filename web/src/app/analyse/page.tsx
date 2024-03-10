"use client";

import React, { useState } from "react";
import ImageHistory from "./components/ImageHistory";
import ContentPanel from "./components/ContentPanel";

export default function AnalysePage() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-row">
      <ImageHistory currentIndex={currentIndex} />
      <ContentPanel currentIndex={currentIndex} />
    </div>
  );
}

AnalysePage.route = "/analyse";
