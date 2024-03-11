import Separator from "@/shared/Separator";
import Chevron from "@/shared/icons/Chevron";
import React, { ReactNode, useState } from "react";

export default function Panel({
  children,
  title,
}: {
  children?: ReactNode;
  title: string;
}) {
  const [panelIsActive, setPanelIsActive] = useState(true);

  return (
    <div className="w-full ">
      <div
        className="relative hover:cursor-pointer"
        onClick={() => setPanelIsActive(!panelIsActive)}
      >
        <h1 className="text-2xl font-bold">{title}</h1>
        <Chevron
          className={`absolute top-1/2 -translate-y-1/2 right-0 hover:cursor-pointer ${
            panelIsActive ? "rotate-180 duration-500" : "rotate-0 duration-500"
          }`}
          width={40}
        />
      </div>
      <Separator className="mt-3 mb-4" />
      <div
        style={{ transition: "max-height .25s ease-in-out" }}
        className={`duration-500 w-full  ${
          panelIsActive ? "max-h-fit" : "max-h-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
