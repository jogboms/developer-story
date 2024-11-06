import type { OpenSource } from "../lib/data";
import dayjs from "dayjs";
import { IconListItem } from "./IconListItem";
import { ViewMoreBuilder } from "./ViewMoreBuilder";
import Image from "next/image";
import { dateFormat, iconSize } from "../lib/constants";

export const OpenSourceSoftwares = ({ items }: { items: OpenSource[] }) => (
  <ViewMoreBuilder
    items={items.sort((a, b) => b.stars - a.stars)}
    label="open source"
    builder={(oss) => {
      const startCommitDate = dayjs(oss.first_commit_date);
      return (
        <IconListItem key={oss.name} icon="repo" fadedIcon>
          <p className="my-0.5 text-base mr-2">
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://github.com/${oss.name}`}
            >
              {oss.name}
            </a>
          </p>
          <p className="flex flex-row flex-wrap text-xs my-0.5 text-slate-700">
            {oss.first_commit_date && (
              <>
                <span>{startCommitDate.format(dateFormat)}</span>{" "}
                <span className="pr-2 text-slate-600">
                  ({startCommitDate.fromNow(true)})
                </span>
                /
              </>
            )}
            <span className="flex flex-row px-1">
              <Image
                className={`rounded-lg`}
                src={`/svg/star.svg`}
                alt={`star icon`}
                width={iconSize}
                height={iconSize}
              />
              <span className="px-1 text-xs">{oss.stars}</span>
            </span>
            /<span className="px-2">{oss.commits} commits</span>/
            <span className="text-green-600 px-2">{oss.additions} ++</span> /
            <span className="text-red-600 px-2">{oss.deletions} --</span>/
            {oss.last_commit_date && (
              <span className="px-2">
                Last commit on{" "}
                {dayjs(oss.last_commit_date).format("MMM DD, 'YY")}
              </span>
            )}
          </p>
          {oss.description && (
            <p className="text-sm mt-1.5 text-slate-700">{oss.description}</p>
          )}
        </IconListItem>
      );
    }}
  />
);
