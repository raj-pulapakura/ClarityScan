import Modal, { ModalProps } from "@/shared/containers/Modal";
import PrimaryButton from "@/shared/buttons/PrimaryButton";
import React from "react";
import Image from "next/image";

export type ConfirmationModalProps = ModalProps & {
  imageUrl: string;
  onContinueClicked: VoidFunction;
  onCancelClicked: VoidFunction;
  onReUploadClicked: VoidFunction;
};

export default function UploadConfirmationModal({
  onCancelClicked,
  onContinueClicked,
  onReUploadClicked,
  imageUrl,
  ...props
}: ConfirmationModalProps) {
  return (
    <Modal {...props}>
      <div className="flex">
        <div>
          <Image src={imageUrl} alt="Uploaded image" width={200} height={100} />
        </div>
        <div className="flex flex-col">
          <h1>This is the image you have selected.</h1>
          <div className="grid grid-cols-2 grid-rows-2">
            <PrimaryButton
              onClick={onContinueClicked}
              className="row-start-1 row-end-2 col-start-1 col-end-3"
            >
              Continue
            </PrimaryButton>
            <PrimaryButton
              onClick={onCancelClicked}
              className="row-start-2 row-end-3 col-start-1 col-end-2"
            >
              Cancel
            </PrimaryButton>
            <PrimaryButton
              onClick={onReUploadClicked}
              className="row-start-2 row-end-3 col-start-2 col-end-3"
            >
              Re-upload
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}
