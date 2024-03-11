"use client";

import PrimaryButton from "@/shared/buttons/PrimaryButton";
import React, { useRef, useState } from "react";
import UploadConfirmationModal from "./UploadConfirmationModal";
import { useRouter } from "next/navigation";
import AnalysePage from "../../analyse/page";
import { useImageHistoryStore } from "@/state/ImageHistory/store";
import { ImageDataItem } from "@/state/types";
import { v4 } from "uuid";
import { useNoiseRemovalInputsState } from "@/state/NoiseRemovalInputs/store";
import { useTumorDetectionInputsState } from "@/state/TumorDetectionInputs/store";

type FileState = {
  file: File | undefined;
  fileUrl: string | undefined;
};

export default function ImageUploadContainer() {
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
  const addNoiseRemovalInput = useNoiseRemovalInputsState(
    (state) => state.addNoiseRemovalInput
  );
  const addTumorDetectionInput = useTumorDetectionInputsState(
    (state) => state.addTumorDetectionInput
  );

  const onUploadButtonClicked = () => inputRef.current?.click();

  const registerImage = (fileState: FileState) => {
    if (fileState.file && fileState.fileUrl) {
      const uploadedDataItem: ImageDataItem = {
        id: v4(),
        file: fileState.file,
        fileUrl: fileState.fileUrl,
        description: "Uploaded Image",
      };
      addImageHistoryItem(uploadedDataItem);
      addNoiseRemovalInput(uploadedDataItem);
      addTumorDetectionInput(uploadedDataItem);
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

  const resetState = () => {
    setShowModal(false);
    setFileState({
      file: undefined,
      fileUrl: undefined,
    });
    // clear files from input
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-5 border-gray-500 bg-gray-400 bg-opacity-10  border-2 rounded-lg items-center p-7">
      <h1>Upload an MRI Scan in RGB format</h1>
      <PrimaryButton className="w-full" onClick={onUploadButtonClicked}>
        UPLOAD
      </PrimaryButton>
      <input ref={inputRef} type="file" onChange={onFileInputChanged} hidden />
      {showModal && fileState.file && fileState.fileUrl && (
        <UploadConfirmationModal
          closeModal={resetState}
          onCancelClicked={resetState}
          onContinueClicked={() => {
            registerImage(fileState);
            router.push(AnalysePage.route);
          }}
          onReUploadClicked={() => inputRef.current?.click()}
          imageUrl={fileState.fileUrl}
        />
      )}
    </div>
  );
}
