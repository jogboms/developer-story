const fs = require("fs");

module.exports = async function ({ github, core }) {
  const { GITHUB_WORKSPACE } = process.env;

  const { opensource } = JSON.parse(
    fs.readFileSync(`${GITHUB_WORKSPACE}/lib/story.json`, "utf-8").toString()
  );
  const queries = opensource.map((item) => {
    const [owner, repo] = item.split("/");
    return Promise.allSettled([
      github.repos
        .get({
          owner,
          repo,
        })
        .then((result) => result.data),
      github.repos
        .getContributorsStats({
          owner,
          repo,
        })
        .then((result) =>
          Array.isArray(result.data)
            ? result.data.find(({ author }) => author["login"] === owner)
            : undefined
        )
        .then((stats) => {
          const emptyResult = { additions: 0, deletions: 0, commits: 0 };
          if (!stats) {
            return emptyResult;
          }

          const weekly = stats["weeks"];
          if (!weekly || weekly.length === 0) {
            return emptyResult;
          }

          const first_commit = weekly.find((item) => item.c !== 0);
          const last_commit = weekly.reverse().find((item) => item.c !== 0);
          return {
            ...weekly.reduce(
              (acc, current) => ({
                additions: acc.additions + current["a"],
                deletions: acc.deletions + current["d"],
                commits: acc.commits + current["c"],
              }),
              emptyResult
            ),
            first_commit_date: first_commit
              ? new Date(first_commit["w"] * 1000)
              : undefined,
            last_commit_date: last_commit
              ? new Date(last_commit["w"] * 1000)
              : undefined,
          };
        }),
    ])
      .then((result) =>
        result.map((item) =>
          item.status === "fulfilled" ? item.value : undefined
        )
      )
      .then(([info, stats]) => {
        if (!info || !stats) {
          return undefined;
        }

        return {
          name: item,
          description: info["description"],
          stars: info["stargazers_count"],
          first_commit_date: stats.first_commit_date,
          last_commit_date: stats.last_commit_date,
          commits: stats.commits,
          additions: stats.additions,
          deletions: stats.deletions,
        };
      });
  });

  const results = await Promise.allSettled(queries);
  if (results.find(({ status, value }) => status !== "fulfilled" || !value)) {
    console.log(results);
    core.setFailed(
      `Something caused this to happen. You should probably check`
    );
    return;
  }

  fs.writeFileSync(
    `${GITHUB_WORKSPACE}/lib/oss.json`,
    `${JSON.stringify(
      results.reduce(
        (acc, item) => ({
          ...acc,
          [item.value.name]: item.value,
        }),
        {}
      ),
      null,
      2
    )}\n`
  );
};
