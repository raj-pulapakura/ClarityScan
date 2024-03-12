import YoutubeEmbed from "@/shared/ui/YouTubeEmbed";
import ImageUploadContainer from "./components/ImageUpload/ImageUploadContainer";
import TestImageSelector from "./components/TestImageSelector/TestImageSelector";
import ProjectDemoVideo from "./components/ProjectDemoVideo/ProjectDemoVideo";

export default function Home() {
  return (
    <main className="mx-auto flex flex-col lg:flex-row gap-10 items-stretch w-fit">
      <ImageUploadContainer />
      <TestImageSelector />
      <ProjectDemoVideo />
    </main>
  );
}
