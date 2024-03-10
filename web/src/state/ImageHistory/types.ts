export enum ImageHistoryDataItemStage {
  ORIGINAL,
  NOISE_REMOVED,
  TUMOR_DETECTED,
}

export interface ImageHistoryDataItem {
  file: File;
  fileUrl: string;
  stage: ImageHistoryDataItemStage;
}

export type ImageHistoryData = ImageHistoryDataItem[];
