export interface SegmentationResultsDataItem {
  file: File;
  fileUrl: string;
}

export interface SegmentationResultsData {
  tumorMaskItem: SegmentationResultsDataItem | undefined;
  tumorOverlayItem: SegmentationResultsDataItem | undefined;
}
