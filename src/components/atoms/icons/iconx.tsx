import * as HIcons from "@heroicons/react/24/outline";
import { FC } from "react";

interface IconxProps {
  icon: string;
  className?: string;
}

const Iconx: FC<IconxProps> = ({ icon, className }) => {
  const { ...icons }: any = HIcons;

  const TheIcon = icons[icon];
  return (
    <TheIcon
      className={`${className ? `${className}` : ""} w-7 h-7 shrink-0`}
      aria-hidden="true"
    />
  );
};
export default Iconx;
