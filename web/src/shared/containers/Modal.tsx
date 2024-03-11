import React, { ReactNode } from "react";

export type ModalProps = {
  className?: string;
  children?: ReactNode;
  closeModal?: VoidFunction;
};

export default function Modal({ className, children, closeModal }: ModalProps) {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80"
        onClick={closeModal}
      ></div>
      <div
        className={`fixed bg-white p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          className ? className : ""
        }`}
      >
        {children}
      </div>
    </>
  );
}
