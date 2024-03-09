import React from "react";

export default function Button({
  className,
  children,
  ...props
}: JSX.IntrinsicElements["button"]) {
  return (
    <button
      className={`p-3 rounded-lg ${className ? className : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
