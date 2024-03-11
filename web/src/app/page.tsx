import ImageUploadContainer from "./components/ImageUpload/ImageUploadContainer";
import TestImageSelector from "./components/TestImageSelector/TestImageSelector";

export default function Home() {
  return (
    <main className="mx-auto flex flex-row gap-10 items-stretch w-fit">
      <ImageUploadContainer />
      <TestImageSelector />
    </main>
  );
}
