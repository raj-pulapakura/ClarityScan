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
        selected ? "outline outline-4 outline-primary rounded-lg" : ""
      } hover:cursor-pointer hover:outline hover:outline-4 hover:outline-primary hover:rounded-lg`}
      src={src}
    />
  );
}
