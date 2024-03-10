"use client";

import PrimaryButton from "@/shared/PrimaryButton";
import React, { useRef, useState } from "react";
import UploadConfirmationModal from "./UploadConfirmationModal";
import { useRouter } from "next/navigation";
import {
  ImageHistoryItem,
  ImageHistoryItemType,
  useImageHistory,
} from "@/hooks/useImageHistory";
import AnalysePage from "../analyse/page";

export default function UploadScanInput() {
  const [showModal, setShowModal] = useState(false);
  const [fileState, setFileState] = useState<{
    file: File | undefined;
    fileUrl: string | undefined;
  }>({
    file: undefined,
    fileUrl: undefined,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [imageHistory, setImageHistory] = useImageHistory();

  const onUploadClicked = () => inputRef.current?.click();

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

  const addImageToHistory = () => {
    if (fileState.file && fileState.fileUrl) {
      const newHistoryItem: ImageHistoryItem = {
        file: fileState.file,
        fileUrl: fileState.fileUrl,
        type: ImageHistoryItemType.ORIGINAL,
      };
      setImageHistory([...imageHistory, newHistoryItem]);
    }
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
            addImageToHistory();
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
