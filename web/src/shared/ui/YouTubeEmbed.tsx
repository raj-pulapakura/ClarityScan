import React from "react";

export default function YoutubeEmbed({ src }: { src: string }) {
  return <iframe className="w-full h-72" src={src} />;
}
