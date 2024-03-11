import Separator from "@/shared/containers/Separator";
import Chevron from "@/shared/icons/Chevron";
import React, { ReactNode, useState } from "react";
import { Grid } from "react-loader-spinner";

export default function Panel({
  children,
  title,
  loading = false,
}: {
  children?: ReactNode;
  title: string;
  loading?: boolean;
}) {
  const [panelIsActive, setPanelIsActive] = useState(true);

  return (
    <div className="w-full ">
      <div
        className="relative hover:cursor-pointer"
        onClick={() => setPanelIsActive(!panelIsActive)}
      >
        <div className="flex flex-row gap-7 items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          {loading && <Grid width={20} height={20} color="black" />}
        </div>
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
        className={`duration-500 w-full   ${
          panelIsActive ? "max-h-fit" : "max-h-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
