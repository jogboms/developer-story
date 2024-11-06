"use client"

import type { Application } from "@/lib/data";
import dayjs from "dayjs";
import { Tags } from "./Tags";
import { IconListItem } from "./IconListItem";
import { ViewMoreBuilder } from "./ViewMoreBuilder";
import Image from "next/image";
import { dateFormat, iconSize } from "@/lib/constants";

export const Applications = ({ items }: { items: Application[] }) => (
  <ViewMoreBuilder
    items={items}
    label="applications"
    builder={(application) => (
      <IconListItem key={application.name} icon={application.icon}>
        <div className="flex flex-row my-0.5 items-center">
          <span className="text-lg lg:text-xl mr-2 grow">
            {application.name}
          </span>
          <span className="flex flex-row space-x-2 items-center">
            {application.links.ios && (
              <IconButton icon="apple" url={application.links.ios} />
            )}
            {application.links.android && (
              <IconButton icon="android" url={application.links.android} />
            )}
            {application.links.web && (
              <IconButton icon="internet" url={application.links.web} />
            )}
            {application.links.source && (
              <IconButton icon="link" url={application.links.source} />
            )}
          </span>
        </div>
        <p className="text-xs my-0.5 text-slate-700">
          {dayjs(application.date).format(dateFormat)}
        </p>
        <div className="my-2.5">
          <Tags items={application.technologies} />
        </div>
        {application.description && (
          <p className="text-sm mt-1.5 text-slate-700">
            {application.description}
          </p>
        )}
      </IconListItem>
    )}
  />
);

const IconButton = ({
  icon,
  url,
}: {
  icon: "internet" | "link" | "apple" | "android";
  url: string;
}) => (
  <a
    target="_blank"
    rel="noreferrer"
    className="flex items-center bg-slate-100 p-1"
    href={url}
  >
    <Image
      src={`/svg/${icon}.svg`}
      alt={icon}
      width={iconSize}
      height={iconSize}
    />
  </a>
);
