"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function NavBar() {
  const router = useRouter();

  const onLogoClicked = () => {
    router.push("/");
  };

  return (
    <div
      style={{ boxShadow: "0 8px 6px -6px rgba(0, 0, 0, 0.3)" }}
      className="flex flex-row justify-between items-center gap-1 px-7 py-4"
    >
      <h1
        className="font-bold text-2xl hover:cursor-pointer"
        onClick={onLogoClicked}
      >
        ClarityScan
      </h1>
      <p>Diagnose Lower Grade Gliomas</p>
    </div>
  );
}
