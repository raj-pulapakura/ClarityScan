import JSZip from "jszip";

export const extractFilesFromZipBlob = async (zipFileAsBlob: Blob) => {
  const zip = await JSZip.loadAsync(zipFileAsBlob);

  const filesPromises = Object.keys(zip.files).map(async (filename) => {
    const blob = await zip.files[filename].async("blob");
    const file = new File([blob], filename, { type: "image/png" });
    return file;
  });

  const files = await Promise.all(filesPromises);

  return files;
};
