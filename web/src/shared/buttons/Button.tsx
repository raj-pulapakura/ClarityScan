import React from "react";
import { Circles, DNA, MutatingDots, Grid } from "react-loader-spinner";

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
      className={`p-3 rounded-xl flex items-center gap-5 justify-center ${
        className ? className : ""
      }`}
      {...props}
    >
      {loading && <Grid width={20} height={20} color="black" />}
      {children}
    </button>
  );
}
