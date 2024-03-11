import React from "react";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  loading?: boolean;
};

export default function Button({
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`p-3 rounded-xl ${
        disabled
          ? "bg-gray-300 bg-opacity-20 border-2 border-gray-300 text-gray-500 hover:cursor-auto"
          : ""
      } ${className ? className : ""}`}
      {...props}
    >
      {loading && "Loading..."}
      {children}
    </button>
  );
}
