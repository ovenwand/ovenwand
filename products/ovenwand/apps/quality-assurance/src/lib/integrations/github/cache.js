import { QUALITY_REVIEW_CHECK_NAME, QUALITY_REPORT_DATA_TAG_OPEN } from "../../constants.js";
import { raise } from "../../utils.js";

/**
 * @returns {Omit<import('../../cache.js').CreateCacheOptions, 'githubEvent' | 'vercelEvent' | 'github' | 'vercel'>}
 */
export function defineCache() {
  return {
    octokit: ({ get }) => {
      const event = get("githubEvent");

      // @ts-expect-error - TS2339: Property 'octokit' does not exist
      if (event.octokit) {
        // @ts-expect-error - TS2339: Property 'octokit' does not exist
        return Promise.resolve(event.octokit);
      }

      const github = get("github");

      return github.app.getInstallationOctokit(github.config.installationId);
    },
    repository: ({ get }) => {
      const event = get("githubEvent");
      // @ts-expect-error - TS2339: Property 'repository' does not exist on type 'BranchProtectionRuleCreatedEvent | BranchProtectionRuleDeletedEvent | BranchProtectionRuleEditedEvent | ... 417 more ... | WorkflowDispatchEvent'. Property 'repository' does not exist on type 'never'.
      const repository = event.payload.repository ?? raise("No repository found in event");

      return {
        owner: repository.owner.login,
        repo: repository.name,
      };
    },
    pullRequest: async ({ get }) => {
      const event = get("githubEvent");

      if (event.name === "pull_request") {
        return Promise.resolve(event.payload.pull_request);
      }

      // @ts-expect-error - TS7053: Element implicitly has an 'any'
      const { pull_request, pull_requests } = event.payload[event.name] ?? {};

      return pull_request ?? pull_requests?.[0] ?? raise("No pull request found in event payload");
    },
    comment: async ({ get }) => {
      const octokit = await get("octokit");
      const pullRequest = await get("pullRequest");

      const { data: commentsInPullRequest } = await octokit.rest.issues.listComments({
        ...get("repository"),
        issue_number: pullRequest.number,
      });

      return (
        /** @type {import('./types.js').IssueComment} */
        (
          commentsInPullRequest.find((comment) =>
            comment.body?.includes(QUALITY_REPORT_DATA_TAG_OPEN)
          )
        ) ?? raise("No comment found in pull request")
      );
    },
    check: async ({ get }) => {
      const event = get("githubEvent");

      // @ts-expect-error - TS2339: Property 'check_run' does not exist
      if (event.check_run) {
        // @ts-expect-error - TS2339: Property 'check_run' does not exist
        return event.check_run;
      }

      const octokit = await get("octokit");
      const pullRequest = await get("pullRequest");

      const { data } = await octokit.rest.checks.listForRef({
        ...get("repository"),
        ref: pullRequest.head.sha,
      });

      return (
        /** @type {import('./types.js').CheckRun} */
        (data.check_runs.find((check) => check.name === QUALITY_REVIEW_CHECK_NAME)) /* ??
            raise("No check found in pull request") */
      );
    },
  };
}
