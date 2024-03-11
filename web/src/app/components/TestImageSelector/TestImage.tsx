import React from "react";

export default function TestImage({
  src,
  selected,
  onClick,
}: {
  src: string;
  selected: boolean;
  onClick: VoidFunction;
}) {
  return (
    <img
      onClick={onClick}
      className={`${
        selected
          ? "outline outline-8 outline-blue-500 rounded-lg"
          : "hover:outline-8 hover:outline-blue-300 hover:rounded-lg"
      } hover:cursor-pointer hover:outline `}
      src={src}
    />
  );
}
