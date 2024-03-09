"use client";

import Button from "@/shared/Button";
import Modal from "@/shared/Modal";
import PrimaryButton from "@/shared/PrimaryButton";
import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

export default function UploadScan() {
  const [isShowingModal, setIsShowingModel] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <h1>Upload an MRI Scan in RGB format</h1>
      <PrimaryButton className="w-fit" onClick={() => setIsShowingModel(true)}>
        UPLOAD
      </PrimaryButton>
      {isShowingModal && (
        <ConfirmationModal closeModal={() => setIsShowingModel(false)} />
      )}
    </div>
  );
}
