import React from "react";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  loading?: boolean;
};

export default function Button({
  loading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`p-3 rounded-lg ${className ? className : ""}`}
      {...props}
    >
      {loading && "Loading..."}
      {children}
    </button>
  );
}
