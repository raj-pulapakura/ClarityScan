import ImageUploadContainer from "./components/ImageUpload/ImageUploadContainer";
import TestImageSelector from "./components/TestImageSelector/TestImageSelector";

export default function Home() {
  return (
    <main className="mx-auto flex flex-col gap-10 items-stretch w-fit">
      <ImageUploadContainer />
      <h1 className="text-center">OR</h1>
      <TestImageSelector />
    </main>
  );
}
