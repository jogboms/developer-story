import type { ReactNode } from "react";
import Image from "next/image";
import { itemImageSize } from "../lib/constants";

export const IconListItem = ({
  icon,
  children,
  fadedIcon = false,
}: {
  icon: string;
  children: ReactNode[];
  fadedIcon?: boolean;
}) => (
  <div className="flex flex-row gap-x-3 md:gap-x-4 lg:gap-x-5">
    <div className="min-w-fit">
      <Image
        className={`rounded-lg ${fadedIcon ? "opacity-25" : ""}`}
        src={`/icons/${icon}.png`}
        alt={`${icon} icon`}
        width={itemImageSize}
        height={itemImageSize}
      />
    </div>
    <div className="flex flex-col grow">{children}</div>
  </div>
);
