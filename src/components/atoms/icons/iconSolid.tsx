import * as HIcons from "@heroicons/react/20/solid";
import { FC } from "react";

interface IconSolidProps {
  icon: string;
  className?: string;
}

const IconSolid: FC<IconSolidProps> = ({ icon, className }) => {
  const { ...icons } = HIcons;
  // @ts-ignore
  const TheIcon = icons[icon];
  return (
    <TheIcon
      className={`${className ? `${className}` : ""} w-7 h-7 shrink-0`}
      aria-hidden="true"
    />
  );
};
export default IconSolid;
