import UploadImageButton from "@/shared/UploadImageButton/UploadImageButton";
import NeutralButton from "@/shared/buttons/NeutralButton";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import JSZip from "jszip";
import React from "react";
import DownloadHistoryButton from "./DownloadHistoryButton";
import ClearButton from "./ClearButton";

export default function ControlPanel() {
  return (
    <div className="flex flex-row gap-5">
      <UploadImageButton className="px-10" />
      <DownloadHistoryButton />
      <ClearButton />
    </div>
  );
}
