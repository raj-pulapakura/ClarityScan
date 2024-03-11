"use client";

import React from "react";
import { useRouter } from "next/navigation";
import UploadImageButton from "@/shared/UploadImageButton/UploadImageButton";
import AnalysePage from "@/app/analyse/page";

export default function ImageUploadContainer() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-10 h-fit w-1/4 border-gray-500 bg-gray-400 bg-opacity-50  border-2 rounded-lg items-center p-7">
      <h1 className="text-xl text-left self-start font-semibold">
        Upload an MRI Scan
      </h1>
      <p className="text-wrap">
        Enhance MRI Scans through denoising and easily identify lower-grade
        gliomas, powered by Deep Learning.
      </p>

      <UploadImageButton
        className="w-full"
        onUpload={() => router.push(AnalysePage.route)}
      />
    </div>
  );
}
