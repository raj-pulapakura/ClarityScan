import React from "react";
import Button, { ButtonProps } from "./Button";

export default function DangerButton({
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Button
      className={`border-red-400 border-2 bg-red-500 bg-opacity-30 text-black active:bg-opacity-40 ${
        disabled
          ? "bg-red-300 bg-opacity-60 border-2 border-red-300 border-opacity-60 text-gray-500 hover:cursor-auto active:bg-opacity-60"
          : ""
      } ${className ? className : ""}`}
      {...props}
    >
      {children}
    </Button>
  );
}
