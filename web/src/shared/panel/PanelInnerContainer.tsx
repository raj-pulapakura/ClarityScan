import React, { ReactNode } from "react";

export default function PanelInnerContainer({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-10 justify-between mt-6 border-2 border-gray-400 bg-gray-400 bg-opacity-45 rounded-lg p-10">
      {children}
    </div>
  );
}
