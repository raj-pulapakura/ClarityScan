"use client";

import IconLink from "@/shared/ui/IconLink";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import React from "react";

export default function NavBar() {
  const router = useRouter();

  const onLogoClicked = () => {
    router.push("/");
  };

  const iconColor = "#242424";
  const hoverColor = "#121212";

  return (
    <div
      style={{ boxShadow: "0 8px 6px -6px rgba(0, 0, 0, 0.7)" }}
      className="flex flex-row bg-white z-40 fixed top-0 w-full justify-between items-center gap-1 px-7 py-4"
    >
      <div>
        <h1
          className="font-bold text-2xl hover:cursor-pointer"
          onClick={onLogoClicked}
        >
          ClarityScan
        </h1>
        <p>Identify Lower Grade Gliomas</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-8 items-center">
          <IconLink
            icon={faGithub}
            color={iconColor}
            hoverColor={hoverColor}
            link="https://github.com/raj-pulapakura"
          />
          <IconLink
            icon={faLinkedin}
            color={iconColor}
            hoverColor={hoverColor}
            link="https://www.linkedin.com/in/rajpulapakura/"
          />
          <IconLink
            icon={faYoutube}
            color={iconColor}
            hoverColor={hoverColor}
            link="https://www.youtube.com/@rajpulapakura9119"
          />
          <IconLink
            icon={faMedium}
            color={iconColor}
            hoverColor={hoverColor}
            link="https://medium.com/@raj.pulapakura"
          />
        </div>
      </div>
    </div>
  );
}
