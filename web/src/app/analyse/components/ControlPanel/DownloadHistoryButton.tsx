import NeutralButton from "@/shared/buttons/NeutralButton";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import React from "react";

export default function DownloadHistoryButton() {
  const imageHistory = useImageHistoryStore((state) => state.imageHistory);

  const onDownloadImageHistoryButtonClicked = async () => {
    if (!imageHistory.length) return;

    const zip = new JSZip();

    // Add each file to the zip
    imageHistory.forEach((imageDataItem) => {
      zip.file(
        `${imageDataItem.description} - ${imageDataItem.id}.jpg`,
        imageDataItem.file,
        {}
      );
    });

    // Generate the zip file
    const content = await zip.generateAsync({ type: "blob" });

    // Trigger download
    saveAs(content, "history.zip");
  };
  return (
    <NeutralButton
      onClick={onDownloadImageHistoryButtonClicked}
      disabled={!imageHistory.length}
      className="px-10"
    >
      Download Image History
    </NeutralButton>
  );
}
