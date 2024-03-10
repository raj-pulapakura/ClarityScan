import React from "react";
import Button, { ButtonProps } from "./Button";

export default function DangerButton({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      className={`border-red-500 border-2 bg-red-500 bg-opacity-50 text-black ${
        className ? className : ""
      }`}
      {...props}
    >
      {children}
    </Button>
  );
}
