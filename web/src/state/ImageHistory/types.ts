export enum ImageHistoryDataItemStage {
  UPLOADED,
  NOISE_REMOVED,
  TUMOR_DETECTED_FROM_ORIGINAL,
  TUMOR_DETECTED_FROM_NOISE_REMOVED,
}

export interface ImageHistoryDataItem {
  id: string;
  file: File;
  fileUrl: string;
  stage: ImageHistoryDataItemStage;
}

export interface UploadedDataItem extends ImageHistoryDataItem {
  noiseRemovalResultId: string | null;
  tumorDetectionResultId: string | null;
}

export interface NoiseRemovedDataItem extends ImageHistoryDataItem {
  tumorDetectionResultId: string | null;
}

export interface TumorDetectedDataItem extends ImageHistoryDataItem {
  tumorOverlay: {
    file: File;
    fileUrl: string;
  };
  tumorMask: {
    file: File;
    fileUrl: string;
  };
}

export type ImageHistoryData = (
  | ImageHistoryDataItem
  | UploadedDataItem
  | NoiseRemovedDataItem
  | TumorDetectedDataItem
)[];
