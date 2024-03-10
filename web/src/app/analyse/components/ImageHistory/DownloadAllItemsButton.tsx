import NeutralButton from "@/shared/buttons/NeutralButton";
import React from "react";

export default function DownloadAllItemsButton({
  children,
}: JSX.IntrinsicElements["button"]) {
  const onButtonClicked = () => {};

  return <NeutralButton onClick={onButtonClicked}>{children}</NeutralButton>;
}
