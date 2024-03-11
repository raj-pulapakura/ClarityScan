"use client";

import React, { useState } from "react";
import ImageHistory from "./components/ImageHistory/ImageHistory";
import ContentView from "./components/ContentPanel/ContentView";
import ControlPanel from "./components/ControlPanel/ControlPanel";

export default function AnalysePage() {
  return (
    <div className="mt-16 w-3/4 mx-auto">
      <ControlPanel />
      <div className=" flex flex-row gap-16 mt-20 mb-20">
        <ImageHistory className="w-1/5" />
        <ContentView className="w-4/5" />
      </div>
    </div>
  );
}

AnalysePage.route = "/analyse";
