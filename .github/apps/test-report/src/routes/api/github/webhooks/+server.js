import { createNodeMiddleware } from "@octokit/webhooks";
import { createApp } from "../../../../lib/app.js";
import { DATA_TAG_CLOSE, DATA_TAG_OPEN, TEST_STATUS, VERDICT } from "../../../../lib/constants.js";

/**
 * @param {import('http').IncomingMessage} request
 * @param {import('http').ServerResponse} response
 * @returns {void}
 */
export default async (request, response) => {
  const app = createApp();

  app.webhooks.on("pull_request.opened", async ({ octokit, payload }) => {
    const { pull_request, repository } = payload;

    const reports = getDefaultTestReportData();

    await octokit.rest.issues.createComment({
      owner: repository.owner.login,
      repo: repository.name,
      issue_number: pull_request.number,
      body: renderCommentBody({ reports }),
    });
  });

  app.webhooks.on("workflow_run.requested", async ({ octokit, payload }) => {
    const { workflow_run, repository } = payload;

    if (!workflow_run.pull_requests?.length) {
      return;
    }

    console.log("workflow_run.requested", workflow_run.name);

    if (workflow_run.name !== "Test end-to-end") {
      return;
    }

    const [pullRequest] = workflow_run.pull_requests;

    const commentsInPullRequest = await octokit.rest.issues.listComments({
      owner: repository.owner.login,
      repo: repository.name,
      issue_number: pullRequest.number,
    });

    const comment = commentsInPullRequest.data.find((comment) =>
      comment.body.includes(DATA_TAG_OPEN)
    );

    const reports = getDataFromTestReportComment(comment) ?? getDefaultTestReportData();

    await octokit.rest.issues.updateComment({
      owner: repository.owner.login,
      repo: repository.name,
      comment_id: comment.id,
      body: renderCommentBody({ comment, reports }),
    });
  });

  const middleware = createNodeMiddleware(app.webhooks);

  middleware(request, response);
};

/**
 * @param {string} str
 * @returns {string}
 */
function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/** @param {import('../../../../lib/constants.js').TestStatus} testStatus */
function getStatusIcon(testStatus) {
  switch (testStatus) {
    case TEST_STATUS.PENDING:
      return "⚪";
    case TEST_STATUS.RUNNING:
      return "🔵";
    case TEST_STATUS.FAILURE:
      return "🔴";
    case TEST_STATUS.CANCELLED:
      return "🟠";
    case TEST_STATUS.SUCCESS:
      return "🟢";
    case TEST_STATUS.SKIPPED:
      return "⚫";
    default:
      return "⚠️";
  }
}

/** @type {Record<string, (report: Report) => string>} */
const columns = {
  suite({ suite }) {
    return toTitleCase(suite);
  },
  status({ reportUrl, status, suite }) {
    let statusLabel = `${getStatusIcon(status)} ${toTitleCase(status)}`;

    if (reportUrl) {
      statusLabel += ` ([report](${reportUrl}/${suite}))`;
    }

    return statusLabel;
  },
  review({ review, status }) {
    if ([TEST_STATUS.SKIPPED, TEST_STATUS.CANCELLED].includes(status)) {
      return "-";
    }

    if (review === REVIEW_STATUS.REJECTED) {
      return "🚫 Rejected";
    } else if (review === REVIEW_STATUS.APPROVED) {
      return "✅ Approved";
    }

    return "⏳ Pending";
  },
  remarks({ status }) {
    if ([TEST_STATUS.SKIPPED, TEST_STATUS.CANCELLED].includes(status)) {
      return "-";
    }

    if (status === TEST_STATUS.SUCCESS) {
      return "ℹ️ No action required";
    }

    if (status === TEST_STATUS.FAILURE) {
      return "⚠️ Review required";
    }

    if (status === TEST_STATUS.PENDING) {
      return `ℹ️ Waiting for tests to run`;
    }

    if (status === TEST_STATUS.RUNNING) {
      return `ℹ️ Waiting for report`;
    }

    return "";
  },
};

/**
 * @param {Object} data
 * @param {Comment} data.comment
 * @param {Report[]} data.reports
 * @returns string
 */
function renderCommentBody({ comment, reports }) {
  const { suite, status, review, remarks } = columns;
  const hasFailingTests = reports.some((report) => report.status === TEST_STATUS.FAILURE);
  const verdict = getVerdictFromComment(comment);

  return `

### ⚗️ Test Report

#### Overview

| Suite | Status | Review | Remarks |
| ----- | ------ | ------ | ------- |
${reports
  .map(
    (report) => `| ${suite(report)} | ${status(report)} | ${review(report)} | ${remarks(report)} |`
  )
  .join("\n")}
${
  hasFailingTests
    ? `
#### Verdict
- [${verdict === VERDICT.APPROVED ? "x" : " "}] ✅ Approve
- [${verdict === VERDICT.REJECTED ? "x" : " "}] 🚫 Reject`
    : ""
}

#### FAQ
<details>
<summary>How do I review a test?</summary>
<p>

Once a test suite has finished running a detailed test report of all the tests in the suite will be published, and a link to the report will be added to the table above. When tests fail you can use this report to review and debug failed tests.

Use the link to the report to see the details of the failed tests. In the report you will find links to download traces, you can use these for more in depth debugging. Either download the traces and serve them using <code>playwright show-trace</code> or use [trace.playwright.dev](https://trace.playwright.dev/) in your browser to view them by passing the link to the trace zip file as a query parameter:

\`\`\`
https://trace.playwright.dev/?trace=https://full.url.to/trace.zip
\`\`\`

See the [Playwright documentation](https://playwright.dev/docs/trace-viewer) for more details about the trace viewer.

Depending on whether the failed tests are expected or not, check the \`Approve\` or \`Reject\` checkbox.

</p>
</details> 

<details>
<summary>How to persist approved tests?</summary>
<p>

When it concerns a unit/component test, or testing a userflow you'll need to update the corresponding test file to reflect the new state of the application. 

In the case of visual regression tests you need to provide a verdict in this comment. The failed pipeline will be marked as successful after a positive verdict is provided and the PR will be unblocked. Once the PR is merged the pipeline the artifact will be updated.

</p>
</details>

${DATA_TAG_OPEN} ${JSON.stringify(reports)} ${DATA_TAG_CLOSE}

  `.trim();
}

/**
 * @param {Comment} [comment]
 * @returns {Report[] | null}
 */
function getDataFromTestReportComment(comment) {
  const hasData = Boolean(comment?.body.includes(DATA_TAG_OPEN));

  if (hasData) {
    const dataTagPattern = new RegExp(`${DATA_TAG_OPEN}(.*)${DATA_TAG_CLOSE}`);
    const [_, data] = comment.body.match(dataTagPattern);
    return JSON.parse(data);
  }

  return null;
}

/**
 * Parses the Markdown template and returns the approval status.
 * @param {Comment} comment
 * @returns {Verdict}
 */
export function getVerdictFromComment(comment) {
  const markdown = comment?.body;
  // Check if the 'Reject' checkbox is checked
  const rejectPattern = /\[\s+\]\s+Reject/;
  const [rejected] = markdown?.match(rejectPattern) ?? [];

  if (rejected?.includes("x")) {
    return REVIEW_STATUS.REJECTED;
  }

  // Check if the 'Approve' checkbox is checked
  const approvePattern = /\[\s+\]\s+Approve/;
  const [approved] = markdown?.match(approvePattern) ?? [];

  if (approved?.includes("x")) {
    return REVIEW_STATUS.APPROVED;
  }

  // If neither checkbox is checked or they are not found, return null
  return null;
}

/** @returns {Report[]} */
function getDefaultTestReportData() {
  return [TEST_SUITE.UNIT, TEST_SUITE.COMPONENT, TEST_SUITE.END_TO_END].map((suite) => ({
    suite,
    status: TEST_STATUS.SKIPPED,
    verdict: TEST_STATUS.PENDING,
    testReportUrl: null,
  }));
}
