"use client";

import type { Experience } from "@/lib/data";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Tags } from "./Tags";
import { IconListItem } from "./IconListItem";
import { ViewMoreBuilder } from "./ViewMoreBuilder";
import { dateFormat } from "@/lib/constants";

dayjs.extend(relativeTime);

export const Experiences = ({ items }: { items: Experience[] }) => (
  <ViewMoreBuilder
    items={items}
    label="experiences"
    builder={(experience) => {
      const startDate = dayjs(experience.start);
      const endDate = dayjs(experience.end ?? Date.now());

      return (
        <IconListItem key={experience.name + startDate} icon={experience.icon}>
          <div className="flex flex-row items-center">
            <span className="text-lg lg:text-xl mr-2">{experience.name}</span>
          </div>
          <span className="text-sm mt-0.5 mb-1.5 text-slate-700">
            {experience.website ? (
              <a target="_blank" rel="noreferrer" href={experience.website}>
                {experience.company}
              </a>
            ) : (
              experience.company
            )}
          </span>
          <p className="text-xs my-0.5">
            <span className="text-slate-700">
              {startDate.format(dateFormat)}
              {experience.end && ` → ${endDate.format(dateFormat)}`}
            </span>
            <span className="text-slate-600 ml-1">
              ({endDate.from(experience.start, true)})
            </span>
          </p>
          <div className="my-2.5">
            <Tags items={experience.technologies} />
          </div>
          {experience.description && (
            <p className="text-sm mt-1.5 text-slate-700">
              {experience.description}
            </p>
          )}
        </IconListItem>
      );
    }}
  />
);
