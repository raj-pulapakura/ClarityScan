import Modal, { ModalProps } from "@/shared/containers/Modal";
import PrimaryButton from "@/shared/buttons/PrimaryButton";
import React from "react";
import Image from "next/image";
import DangerButton from "@/shared/buttons/DangerButton";
import NeutralButton from "@/shared/buttons/NeutralButton";
import { Grid } from "react-loader-spinner";

export type ConfirmationModalProps = ModalProps & {
  imageUrl: string;
  onContinueClicked: VoidFunction;
  onCancelClicked: VoidFunction;
  onReUploadClicked: VoidFunction;
  loading: boolean;
};

export default function UploadConfirmationModal({
  onCancelClicked,
  onContinueClicked,
  onReUploadClicked,
  loading,
  imageUrl,
  ...props
}: ConfirmationModalProps) {
  return (
    <Modal className="rounded-lg w-10/12 md:w-fit" {...props}>
      {loading ? (
        <Grid width={50} height={50} color="black" />
      ) : (
        <div className="flex gap-10 flex-col items-center">
          <h1 className="text-2xl font-bold">Upload Image</h1>
          <div>
            <Image
              src={imageUrl}
              alt="Uploaded image"
              width={300}
              height={100}
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-3 w-full">
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
      )}
    </Modal>
  );
}
