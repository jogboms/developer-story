import type { NextPage } from "next";
import Head from "next/head";
import data from "../lib/data";
import {
  TitleDivider,
  Header,
  Artifacts,
  Applications,
  Experiences,
  OpenSourceSoftwares,
} from "../components";
import { ReactNode } from "react";

const Home: NextPage = () => {
  const story = data.story;
  const app_name = "Developer Story";
  const title = `${story.name} - ${app_name}`;
  return (
    <div className="container mx-auto px-4 lg:px-0 max-w-screen-md">
      <Head>
        <title>{title}</title>
        <meta name="description" content={story.description} />
        <meta name="twitter:image:src" content={story.image_url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content={story.website} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={story.description} />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content={app_name} />
        <meta name="og:image" content={story.image_url} />
        <meta name="og:image:alt" content={story.description} />
        <meta name="og:url" content={story.website} />
        <meta name="og:description" content={story.description} />
      </Head>

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
};

const Column = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-y-4">{children}</div>
);

export default Home;
