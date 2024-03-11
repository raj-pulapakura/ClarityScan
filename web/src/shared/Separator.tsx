import React from "react";

export default function Separator({
  className,
  ...props
}: JSX.IntrinsicElements["div"]) {
  return (
    <div
      className={`w-full h-[2px] bg-gray-400 ${className ? className : ""}`}
      {...props}
    ></div>
  );
}
