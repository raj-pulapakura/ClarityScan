"use client";

import React from "react";
import ImageHistoryList from "./ImageHistoryList";
import Panel from "@/shared/panel/Panel";

export default function ImageHistory() {
  return (
    <Panel title="Image History">
      <ImageHistoryList />
    </Panel>
  );
}
