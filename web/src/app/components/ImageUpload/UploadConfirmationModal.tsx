import Modal, { ModalProps } from "@/shared/containers/Modal";
import PrimaryButton from "@/shared/buttons/PrimaryButton";
import React from "react";
import Image from "next/image";
import DangerButton from "@/shared/buttons/DangerButton";
import NeutralButton from "@/shared/buttons/NeutralButton";

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
    <Modal className="rounded-lg" {...props}>
      <div className="flex gap-10 flex-col">
        <div>
          <Image src={imageUrl} alt="Uploaded image" width={300} height={100} />
        </div>
        <div className="flex flex-col justify-between">
          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            <PrimaryButton
              onClick={onContinueClicked}
              className="row-start-1 row-end-2 col-start-1 col-end-3"
            >
              Continue
            </PrimaryButton>
            <DangerButton
              onClick={onCancelClicked}
              className="row-start-2 row-end-3 col-start-1 col-end-2"
            >
              Cancel
            </DangerButton>
            <NeutralButton
              onClick={onReUploadClicked}
              className="row-start-2 row-end-3 col-start-2 col-end-3"
            >
              Re-upload
            </NeutralButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}
