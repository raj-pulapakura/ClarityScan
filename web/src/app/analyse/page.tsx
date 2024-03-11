"use client";

import React, { useState } from "react";
import ImageHistory from "./components/ImageHistory/ImageHistory";
import ContentView from "./components/ContentPanel/ContentView";
import ControlPanel from "./components/ControlPanel/ControlPanel";

export default function AnalysePage() {
  return (
    <div className="w-full md:5/6 lg:4/5 2xl:w-3/4 mx-auto">
      <ControlPanel />
      <div className=" flex flex-col md:flex-row gap-16 mt-20 mb-20">
        <div className="w-full md:w-1/4">
          <ImageHistory />
        </div>
        <div className="w-full md:w-3/4">
          <ContentView />
        </div>
      </div>
    </div>
  );
}

AnalysePage.route = "/analyse";
