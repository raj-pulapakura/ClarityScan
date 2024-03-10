"use client";

import PrimaryButton from "@/shared/buttons/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import UploadConfirmationModal from "./UploadConfirmationModal";
import { useRouter } from "next/navigation";
import AnalysePage from "../analyse/page";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import {
  ImageHistoryDataItem,
  ImageHistoryDataItemStage,
} from "@/state/ImageHistory/types";

type FileState = {
  file: File | undefined;
  fileUrl: string | undefined;
};

export default function UploadScanInput() {
  const [showModal, setShowModal] = useState(false);
  const [fileState, setFileState] = useState<FileState>({
    file: undefined,
    fileUrl: undefined,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const addImageHistoryItem = useImageHistoryStore(
    (state) => state.addImageHistoryItem
  );
  const setCurrentIndex = useImageHistoryStore(
    (state) => state.setCurrentIndex
  );

  const onUploadClicked = () => inputRef.current?.click();

  const addImageToHistory = (fileState: FileState) => {
    if (fileState.file && fileState.fileUrl) {
      const newHistoryItem: ImageHistoryDataItem = {
        file: fileState.file,
        fileUrl: fileState.fileUrl,
        stage: ImageHistoryDataItemStage.ORIGINAL,
      };
      addImageHistoryItem(newHistoryItem);
      setCurrentIndex(0);
    }
  };

  const onFileInputChanged = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const newFileState = {
        file,
        fileUrl: URL.createObjectURL(file),
      };
      setFileState(newFileState);
      setShowModal(true);
      await convertImageToJpg(newFileState);
    } else {
      alert("Error uploading file. Please try again.");
    }
  };

  const convertImageToJpg = async (info: typeof fileState) => {
    if (!info.file || !info.fileUrl) {
      return;
    }
    const formData = new FormData();
    const fileBlob = new Blob([info.file], { type: info.file.type });
    formData.append("file", fileBlob);
    const response = await fetch("/api/convert", {
      body: formData,
      method: "POST",
    });
    const newFileBlob = await response.blob();
    const newImageFile = new File([newFileBlob], "image.jpg", {
      type: "image/jpeg",
    });
    const newFileState = {
      file: newImageFile,
      fileUrl: URL.createObjectURL(newImageFile),
    };
    setFileState(newFileState);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1>Upload an MRI Scan in RGB format</h1>
      <PrimaryButton className="w-fit" onClick={onUploadClicked}>
        UPLOAD
      </PrimaryButton>
      <input ref={inputRef} type="file" onChange={onFileInputChanged} hidden />
      {showModal && fileState.file && fileState.fileUrl && (
        <UploadConfirmationModal
          onCancelClicked={() => {
            setShowModal(false);
            setFileState({
              file: undefined,
              fileUrl: undefined,
            });
          }}
          onContinueClicked={() => {
            addImageToHistory(fileState);
            router.push(AnalysePage.route);
          }}
          onReUploadClicked={() => inputRef.current?.click()}
          imageUrl={fileState.fileUrl}
          closeModal={() => {
            setShowModal(false);
            setFileState({
              file: undefined,
              fileUrl: undefined,
            });
          }}
        />
      )}
    </div>
  );
}
