import YoutubeEmbed from "@/shared/ui/YouTubeEmbed";
import React from "react";

export default function ProjectDemoVideo() {
  return (
    <div className="w-full lg:w-1/4 flex flex-col gap-10 border-gray-500 bg-gray-400 bg-opacity-50  border-2 rounded-lg items-center p-7 h-fit">
      <h1 className="self-start font-bold text-xl">Project Demo</h1>
      <YoutubeEmbed src="https://www.youtube.com/embed/v9OmIxve9Zs" />
    </div>
  );
}
