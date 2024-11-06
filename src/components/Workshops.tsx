"use client";

import type { Workshop } from "@/lib/data";
import { Tags } from "./Tags";
import { IconListItem } from "./IconListItem";
import { ViewMoreBuilder } from "./ViewMoreBuilder";
import dayjs from "dayjs";
import { dateFormat } from "@/lib/constants";

export const Workshops = ({ items }: { items: Workshop[] }) => (
  <ViewMoreBuilder
    items={items}
    label="workshops"
    builder={(workshop) => (
      <IconListItem key={workshop.name} icon={'workshop'}>
        <div className="flex flex-row my-0.5 items-center">
          <a
            className="text-lg lg:text-xl mr-2"
            target="_blank"
            rel="noreferrer"
            href={workshop.url}
          >
            {workshop.name}
          </a>
        </div>
        <p className="text-xs my-0.5 text-slate-700">
          {dayjs(workshop.date).format(dateFormat)}
        </p>
        <div className="my-2.5">
          <Tags items={workshop.technologies} />
        </div>
      </IconListItem>
    )}
  />
);
