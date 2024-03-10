import { Dispatch, SetStateAction, useState } from "react";

export enum ImageHistoryItemType {
  ORIGINAL,
  NOISE_REMOVED,
  TUMOR_DETECTED,
}

export interface ImageHistoryItem {
  file: File;
  fileUrl: string;
  type: ImageHistoryItemType;
}

export type ImageHistoryData = ImageHistoryItem[];

export const useImageHistory = (): [
  ImageHistoryData,
  Dispatch<SetStateAction<ImageHistoryData>>
] => {
  const [imageHistory, setImageHistory] = useState<ImageHistoryData>([]);

  return [imageHistory, setImageHistory];
};
