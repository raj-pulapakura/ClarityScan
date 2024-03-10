"use client";

import React, { useState } from "react";
import ImageHistory from "./components/ImageHistory/ImageHistory";
import ContentPanel from "./components/ContentPanel/ContentView";

export default function AnalysePage() {
  return (
    <div className="flex flex-row">
      <ImageHistory />
      <ContentPanel />
    </div>
  );
}

AnalysePage.route = "/analyse";
