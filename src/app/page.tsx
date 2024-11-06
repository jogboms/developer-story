import data from "@/lib/data";
import {
  TitleDivider,
  Header,
  Artifacts,
  Applications,
  Experiences,
  OpenSourceSoftwares,
} from "@/components";
import { ReactNode } from "react";

export default function Page() {
  const story = data.story;

  return (
    <div className="container mx-auto px-4 lg:px-0 max-w-screen-md">
      <main className="mt-8 md:mt-16 mb-32">
        <Header
          name={story.name}
          occupation={story.occupation}
          image_url={story.image_url}
          location={story.location}
          twitter={story.twitter}
          github={story.github}
          website={story.website}
          technologies={story.technologies}
        />

        <TitleDivider title="EXPERIENCE" />
        <Column>
          <Experiences items={story.experiences} />
        </Column>

        <TitleDivider title={`OPEN SOURCE (${story.opensource.length})`} />
        <Column>
          <OpenSourceSoftwares
            items={Object.entries(data.oss).map(([name, item]) => ({
              ...item,
              name,
            }))}
          />
        </Column>

        <TitleDivider
          title={`APPS & SOFTWARE (${story.applications.length})`}
        />
        <Column>
          <Applications items={story.applications} />
        </Column>

        <TitleDivider title="PUBLIC ARTIFACTS" />
        <Column>
          <Artifacts items={story.artifacts} />
        </Column>

        <TitleDivider title="TOOLS" />
        <div className="text-sm text-slate-600">{story.tools.join(", ")}</div>
      </main>
    </div>
  );
}

const Column = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-y-4">{children}</div>
);
