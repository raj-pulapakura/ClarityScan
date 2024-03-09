import React, { ReactNode } from "react";
import NavBar from "./NavBar";

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div>
      <NavBar />
      <div className="p-10">{children}</div>
    </div>
  );
}
