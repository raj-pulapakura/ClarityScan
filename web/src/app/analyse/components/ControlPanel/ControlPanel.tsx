import UploadImageButton from "@/shared/UploadImageButton/UploadImageButton";
import React from "react";
import DownloadHistoryButton from "./DownloadHistoryButton";
import ClearButton from "./ClearButton";

export default function ControlPanel() {
  return (
    <div className="flex flex-row gap-5 flex-wrap">
      <UploadImageButton className="px-10" />
      <DownloadHistoryButton />
      <ClearButton />
    </div>
  );
}
