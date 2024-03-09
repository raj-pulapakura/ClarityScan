import Modal, { ModalProps } from "@/shared/Modal";
import PrimaryButton from "@/shared/PrimaryButton";
import React from "react";

export default function ConfirmationModal(props: ModalProps) {
  return (
    <Modal {...props}>
      <div className="flex">
        <div></div>
        <div className="flex flex-col">
          <h1>This is the image you have selected.</h1>
          <div className="grid grid-cols-2 grid-rows-2">
            <PrimaryButton className="row-start-1 row-end-2 col-start-1 col-end-3">
              Continue
            </PrimaryButton>
            <PrimaryButton className="row-start-2 row-end-3 col-start-1 col-end-2">
              Cancel
            </PrimaryButton>
            <PrimaryButton className="row-start-2 row-end-3 col-start-2 col-end-3">
              Re-upload
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}
