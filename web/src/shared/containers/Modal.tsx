import React, { ReactNode } from "react";

export type ModalProps = {
  children?: ReactNode;
  closeModal?: VoidFunction;
};

export default function Modal({ children, closeModal }: ModalProps) {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75"
        onClick={closeModal}
      ></div>
      <div className="fixed bg-white p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </>
  );
}
