import { v4 as uuidv4 } from "uuid";
import {
  ImageHistoryDataItemStage,
  NoiseRemovedDataItem,
  TumorDetectedDataItem,
  UploadedDataItem,
} from "./types";

export const createUploadedDataItem = (
  file: File,
  fileUrl: string
): UploadedDataItem => {
  return {
    id: uuidv4(),
    stage: ImageHistoryDataItemStage.UPLOADED,
    file,
    fileUrl,
    noiseRemovalResultId: null,
    tumorDetectionResultId: null,
  };
};

export const createNoiseRemovedDataItem = (
  file: File,
  fileUrl: string
): NoiseRemovedDataItem => {
  return {
    id: uuidv4(),
    stage: ImageHistoryDataItemStage.NOISE_REMOVED,
    file,
    fileUrl,
    tumorDetectionResultId: null,
  };
};

export const createTumorDetectedDataItem = (
  file: File,
  fileUrl: string,
  stage: ImageHistoryDataItemStage,
  tumorMask: TumorDetectedDataItem["tumorMask"],
  tumorOverlay: TumorDetectedDataItem["tumorOverlay"]
): TumorDetectedDataItem => {
  return {
    id: uuidv4(),
    stage: stage,
    file,
    fileUrl,
    tumorMask,
    tumorOverlay,
  };
};
