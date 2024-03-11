import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function IconLink({
  icon,
  link,
  color,
  hoverColor,
}: {
  icon: FontAwesomeIconProps["icon"];
  link: string;
  color: string;
  hoverColor: string;
}) {
  const [iconColor, setIconColor] = useState(color);

  return (
    <a target="_blank" href={link} rel="noopener noreferrer">
      <FontAwesomeIcon
        onMouseEnter={() => setIconColor(hoverColor)}
        onMouseLeave={() => setIconColor(color)}
        icon={icon}
        size="xl"
        color={iconColor}
      />
    </a>
  );
}
