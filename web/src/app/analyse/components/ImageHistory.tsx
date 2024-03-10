"use client";

import { useImageHistory } from "@/hooks/useImageHistory";
import React from "react";

export type ImageHistoryProps = {
  currentIndex: number | null;
};

export default function ImageHistory({ currentIndex }: ImageHistoryProps) {
  const [imageHistory, setImageHistory] = useImageHistory();

  return <div>ImageHistory</div>;
}
