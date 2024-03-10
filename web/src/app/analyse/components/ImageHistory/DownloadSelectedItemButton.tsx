import NeutralButton from "@/shared/buttons/NeutralButton";
import React from "react";

export default function DownloadSelectedItemButton({
  children,
}: JSX.IntrinsicElements["button"]) {
  const onButtonClicked = () => {};

  return <NeutralButton onClick={onButtonClicked}>{children}</NeutralButton>;
}
