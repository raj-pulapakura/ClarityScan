import React from "react";
import Button, { ButtonProps } from "./Button";

export default function NeutralButton({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      className={`border-gray-400 border-2 bg-gray-500 bg-opacity-30 text-black active:bg-opacity-40 ${
        className ? className : ""
      }`}
      {...props}
    >
      {children}
    </Button>
  );
}
