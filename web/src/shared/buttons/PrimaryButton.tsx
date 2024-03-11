import React from "react";
import Button, { ButtonProps } from "./Button";

export default function PrimaryButton({
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Button
      className={`border-primary border-2 bg-primary bg-opacity-50 text-black active:bg-opacity-60  ${
        disabled
          ? "bg-gray-500 bg-opacity-40 border-2 border-gray-400 text-gray-500 hover:cursor-auto active:bg-opacity-40"
          : ""
      }  ${className ? className : ""}`}
      {...props}
    >
      {children}
    </Button>
  );
}
