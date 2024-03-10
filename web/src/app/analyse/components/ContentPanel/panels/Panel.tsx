import React, { ReactNode } from "react";

export default function Panel({
  children,
  title,
}: {
  children?: ReactNode;
  title: string;
}) {
  return (
    <div>
      <h1 className="border-b-4 border-black text-3xl">{title}</h1>
      {children}
    </div>
  );
}
