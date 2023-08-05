import { QUALITY_REVIEW_CHECK_NAME, QUALITY_REPORT_DATA_TAG_OPEN } from "../../constants.js";
import { raise } from "../../utils.js";

/**
 * @returns {Omit<import('../../cache.js').CreateCacheOptions, 'githubEvent' | 'vercelEvent' | 'github' | 'vercel'>}
 */
export function defineCache() {
  return {
    octokit: ({ get }) => {
      const github = get("github");
      return github.app.getInstallationOctokit(github.config.installationId);
    },
    repository: ({ get }) => {
      const event = get("vercelEvent");

      return {
        owner: event.payload.deployment.meta.githubOrg,
        repo: event.payload.deployment.meta.githubRepo,
      };
    },
    pullRequest: async ({ get }) => {
      const event = get("vercelEvent");
      const octokit = await get("octokit");

      const { data: pullRequests } = await octokit.rest.pulls.list({
        ...get("repository"),
        head: event.payload.deployment.meta.githubCommitRef,
        base: "master",
        state: "open",
      });

      if (!pullRequests.length) {
        throw new Error("No pull request found");
      }

      return /** @type {import('../../integrations/github/types.js').PullRequest} */ (
        pullRequests[0]
      );
    },
    comment: async ({ get }) => {
      const octokit = await get("octokit");
      const pullRequest = await get("pullRequest");

      const { data: commentsInPullRequest } = await octokit.rest.issues.listComments({
        ...get("repository"),
        issue_number: pullRequest.number,
      });

      return (
        /** @type {import('../github/types.js').IssueComment} */
        (
          commentsInPullRequest.find((comment) =>
            comment.body?.includes(QUALITY_REPORT_DATA_TAG_OPEN)
          )
        ) ?? raise("No comment found in pull request")
      );
    },
    check: async ({ get }) => {
      const event = get("vercelEvent");
      const octokit = await get("octokit");

      const { data } = await octokit.rest.checks.listForRef({
        ...get("repository"),
        ref: event.payload.deployment.meta.githubCommitRef,
      });

      return (
        /** @type {import('../github/types.js').CheckRun} */
        (data.check_runs.find((check) => check.name === QUALITY_REVIEW_CHECK_NAME)) ??
        raise("No check found")
      );
    },
  };
}
