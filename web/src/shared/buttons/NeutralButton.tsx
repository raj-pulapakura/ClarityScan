import React from "react";
import Button, { ButtonProps } from "./Button";

export default function NeutralButton({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      className={`border-gray-500 border-2 bg-gray-500 bg-opacity-50 text-black ${
        className ? className : ""
      }`}
      {...props}
    >
      {children}
    </Button>
  );
}
