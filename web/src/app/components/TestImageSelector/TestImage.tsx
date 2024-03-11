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
        selected ? "outline outline-8 outline-gray-500 rounded-lg" : ""
      } hover:cursor-pointer hover:outline hover:outline-8 hover:outline-gray-500 hover:rounded-lg`}
      src={src}
    />
  );
}
