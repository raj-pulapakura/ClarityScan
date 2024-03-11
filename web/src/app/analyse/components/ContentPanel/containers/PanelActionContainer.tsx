import React, { ReactNode } from "react";

export default function PanelActionContainer({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col h-fit w-1/4 gap-5 border-2 border-gray-400 bg-gray-400 bg-opacity-10 p-5 rounded-lg">
      {children}
    </div>
  );
}
