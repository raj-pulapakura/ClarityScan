import React, { ReactNode } from "react";

export default function ContentBox({ children }: { children?: ReactNode }) {
  return <div className="p-10 ">{children}</div>;
}
