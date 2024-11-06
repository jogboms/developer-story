import story from "./story.json";
import oss from "./oss.json";

export default {
  story,
  oss,
} as const;

export type Application = typeof story.applications[0];
export type Experience = typeof story.experiences[0];
export type Artifact = typeof story.artifacts[0];
export type OpenSource = typeof oss[keyof typeof oss] & {
  first_commit_date?: string;
  last_commit_date?: string;
};
