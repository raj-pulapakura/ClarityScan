"use client";

import React from "react";
import { useRouter } from "next/navigation";
import UploadImageButton from "@/shared/UploadImageButton/UploadImageButton";
import AnalysePage from "@/app/analyse/page";

export default function ImageUploadContainer() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-10 border-gray-500 bg-gray-400 bg-opacity-10  border-2 rounded-lg items-center p-7">
      <h1 className="text-xl font-semibold">
        Upload an MRI Scan in RGB format
      </h1>

      <UploadImageButton
        className="w-full"
        onUpload={() => router.push(AnalysePage.route)}
      />
    </div>
  );
}
