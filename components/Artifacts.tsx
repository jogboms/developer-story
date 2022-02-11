import type { Artifact } from "../lib/data";
import { Tags } from "./Tags";
import { IconListItem } from "./IconListItem";
import { ViewMoreBuilder } from "./ViewMoreBuilder";
import dayjs from "dayjs";
import { dateFormat } from "../lib/constants";

export const Artifacts = ({ items }: { items: Artifact[] }) => (
  <ViewMoreBuilder
    items={items}
    label="artifacts"
    builder={(artifact) => (
      <IconListItem key={artifact.name} icon={artifact.icon}>
        <div className="flex flex-row my-0.5 items-center">
          <a
            className="text-lg lg:text-xl mr-2"
            target="_blank"
            rel="noreferrer"
            href={artifact.url}
          >
            {artifact.name}
          </a>
        </div>
        <p className="text-xs my-0.5 text-slate-700">
          {dayjs(artifact.date).format(dateFormat)}
        </p>
        <div className="my-2.5">
          <Tags items={artifact.technologies} />
        </div>
        {artifact.description && (
          <p className="text-sm mt-1.5 text-slate-700">
            {artifact.description}
          </p>
        )}
      </IconListItem>
    )}
  />
);
