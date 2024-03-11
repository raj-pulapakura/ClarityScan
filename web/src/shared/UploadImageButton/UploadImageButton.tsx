import { useImageHistoryStore } from "@/state/ImageHistory/store";
import { useNoiseRemovalInputsState } from "@/state/NoiseRemovalInputs/store";
import { useTumorDetectionInputsState } from "@/state/TumorDetectionInputs/store";
import { ImageDataItem } from "@/state/types";
import React, { useRef, useState } from "react";
import { v4 } from "uuid";
import PrimaryButton from "../buttons/PrimaryButton";
import UploadConfirmationModal from "./UploadConfirmationModal";

type FileState = {
  file: File | undefined;
  fileUrl: string | undefined;
};

export default function UploadImageButton({
  onUpload,
  className,
}: {
  onUpload?: VoidFunction;
  className?: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const [fileState, setFileState] = useState<FileState>({
    file: undefined,
    fileUrl: undefined,
  });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
      setLoading(true);
      const file = event.target.files[0];
      const newFileState = {
        file,
        fileUrl: URL.createObjectURL(file),
      };
      setFileState(newFileState);
      setShowModal(true);
      await convertImageToJpg(newFileState);
      setLoading(false);
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
    <>
      <input ref={inputRef} type="file" onChange={onFileInputChanged} hidden />
      <PrimaryButton
        className={`${className ? className : ""}`}
        onClick={onUploadButtonClicked}
      >
        Upload
      </PrimaryButton>
      {showModal && fileState.file && fileState.fileUrl && (
        <UploadConfirmationModal
          loading={loading}
          closeModal={resetState}
          onCancelClicked={resetState}
          onContinueClicked={() => {
            registerImage(fileState);
            resetState();
            if (onUpload) {
              onUpload();
            }
          }}
          onReUploadClicked={() => inputRef.current?.click()}
          imageUrl={fileState.fileUrl}
        />
      )}
    </>
  );
}
