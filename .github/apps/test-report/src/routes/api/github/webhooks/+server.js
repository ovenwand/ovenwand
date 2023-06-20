import { createNodeMiddleware } from "@octokit/webhooks";
import { TEST_STATUS } from "../../../../lib/constants.js";
import { createApp } from "../../../../lib/app.js";
import { useTestReport } from "../../../../lib/comment.js";

/**
 * @param {import('node:http').IncomingMessage} request
 * @param {import('node:http').ServerResponse} response
 * @returns {void}
 */
export default async (request, response) => {
  const app = createApp();

  app.webhooks.on("pull_request.opened", async ({ octokit, payload }) => {
    const { pull_request, repository } = payload;

    const { createTestReport } = useTestReport(pull_request, repository, octokit);

    await createTestReport();
  });

  app.webhooks.on("workflow_run", async ({ octokit, payload }) => {
    const { action, repository, workflow_run } = payload;

    if (!workflow_run.pull_requests?.length) {
      return;
    }

    const { suite, updateTestReport } = useTestReport(workflow_run, repository, octokit);

    if (!suite) {
      return;
    }

    await updateTestReport((report) => {
      report.statusUrl = workflow_run.html_url;

      if (action === "requested") {
        report.status = TEST_STATUS.PENDING;
      } else if (action === "in_progress") {
        report.status = TEST_STATUS.RUNNING;
      } else if (action === "completed") {
        report.status = workflow_run.conclusion;
      }
    });
  });

  const middleware = createNodeMiddleware(app.webhooks);

  middleware(request, response);
};
