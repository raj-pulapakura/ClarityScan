import React from "react";
import Button, { ButtonProps } from "./Button";

export default function PrimaryButton({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      className={`border-primary border-2 bg-primary bg-opacity-50 text-black ${
        className ? className : ""
      }`}
      {...props}
    >
      {children}
    </Button>
  );
}
