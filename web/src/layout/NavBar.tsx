import React from "react";

export default function NavBar() {
  return (
    <div
      style={{ boxShadow: "0 8px 6px -6px rgba(0, 0, 0, 0.3)" }}
      className="flex flex-row justify-between items-center gap-1 px-7 py-4"
    >
      <h1 className="font-bold text-2xl">ClarityScan</h1>
      <p>Diagnose Lower Grade Gliomas</p>
    </div>
  );
}
