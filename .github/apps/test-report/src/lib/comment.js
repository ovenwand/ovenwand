import {
  DATA_TAG_CLOSE,
  DATA_TAG_OPEN,
  REVIEW_STATUS,
  TEST_STATUS,
  TEST_SUITE,
  VERDICT,
} from "./constants.js";

/**
 * @typedef {import('@octokit/webhooks-types/schema.js').PullRequest | import('@octokit/webhooks-types/schema.js').WorkflowRun | import('@octokit/webhooks-types/schema.js').DeploymentStatusEvent} TestReportEvent
 */

/**
 * @typedef {Object} Report
 * @property {import('../../../../lib/constants.js').TestSuite} suite
 * @property {import('../../../../lib/constants.js').TestStatus} status
 * @property {import('../../../../lib/constants.js').Verdict} verdict
 * @property {string | null} statusUrl
 * @property {string | null} reportUrl
 */

/**
 * @param {TestReportEvent} event
 * @param {import('@octokit/webhooks-types/schema.js').Repository} repository
 * @param {import('@octokit/webhooks-types/schema.js').Octokit} octokit
 */
export function useTestReport(event, repository, octokit) {
  const suite = event.name?.match(/^Test ([a-z\-]+)(.*)$/)?.[1]?.trim(); // Extract suite from event name

  return {
    suite,
    createTestReport: createTestReport.bind(null, event, repository, octokit),
    updateTestReport: updateTestReport.bind(null, suite, event, repository, octokit),
  };
}

/**
 * @param {import('@octokit/webhooks-types/schema.js').PullRequest} pullRequest
 * @param {import('@octokit/webhooks-types/schema.js').Repository} repository
 * @param {import('@octokit/webhooks-types/schema.js').Octokit} octokit
 */
export async function createTestReport(pullRequest, repository, octokit) {
  const { reports } = extractDataFromComment();

  await octokit.rest.issues.createComment({
    owner: repository.owner.login,
    repo: repository.name,
    issue_number: pullRequest.number,
    body: renderCommentBody({ reports }),
  });
}

/**
 * @param {string} suite
 * @param {Exclude<TestReportEvent, import('@octokit/webhooks-types/schema.js').PullRequest>} event
 * @param {import('@octokit/webhooks-types/schema.js').Repository} repository
 * @param {import('octokit').Octokit} octokit
 * @param {(report: Report) => Report | void | Promise<Report | void>} mutation
 */
export async function updateTestReport(suite, event, repository, octokit, mutation) {
  const [pullRequest] = event.pull_requests ?? [event.pull_request ?? event];

  const comment = await findCommentInPullRequest(pullRequest, {
    octokit,
    repository,
  });

  const { reports } = extractDataFromComment(comment);
  const currentReport = reports.find((report) => report.suite === suite);
  const mutatedReport = await mutation(currentReport);

  // When the mutation returns a report, replace the current report with the mutated report
  if (mutatedReport) {
    reports.splice(reports.indexOf(currentReport), 1, mutatedReport);
  }

  await octokit.rest.issues.updateComment({
    owner: repository.owner.login,
    repo: repository.name,
    comment_id: comment.id,
    body: renderCommentBody({ comment, reports }),
  });
}

/**
 *
 * @param {import('@octokit/webhooks-types/schema.js').Repository} repository
 * @param {import('octokit').Octokit} octokit
 */
async function deployTestReport(repository, octokit) {
  const { getRepoSecret } = octokit.rest.actions;
  const owner = repository.owner.login;
  const repo = repository.name;

  const [VERCEL_ORG_ID, VERCEL_PROJECT_QUALITY_ASSURANCE_REPORT_ID, VERCEL_TOKEN] =
    await Promise.all([
      getRepoSecret({ owner, repo, secret_name: "VERCEL_ORG_ID" }),
      getRepoSecret({ owner, repo, secret_name: "VERCEL_PROJECT_QUALITY_ASSURANCE_REPORT_ID" }),
      getRepoSecret({ owner, repo, secret_name: "VERCEL_TOKEN" }),
    ]);
}

/**
 * @param {Object} data
 * @param {import('@octokit/webhooks-types/schema.js').IssueComment} data.comment
 * @param {Report[]} data.reports
 * @returns string
 */
export function renderCommentBody({ comment, reports }) {
  const hasFailingTests = reports.some((report) => report.status === TEST_STATUS.FAILURE);
  const verdict = getVerdictFromComment(comment);
  const data = { reports };

  return `

### ⚗️ Test Report

#### Overview

| Suite | Status | Review | Remarks |
| ----- | ------ | ------ | ------- |
${reports
  .map((report) => {
    const { suite, status, verdict, remarks } = columns;
    return `| ${suite(report)} | ${status(report)} | ${verdict(report)} | ${remarks(report)} |`;
  })
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

${DATA_TAG_OPEN}${JSON.stringify(data)}${DATA_TAG_CLOSE}

  `.trim();
}

/** @type {Record<string, (report: Report) => string>} */
const columns = {
  suite({ suite }) {
    return toTitleCase(suite);
  },
  status({ reportUrl, status, statusUrl, suite }) {
    let statusLabel = `${getStatusIcon(status)} ${toTitleCase(status)}`;

    if (reportUrl) {
      statusLabel += ` ([report](${reportUrl}/${suite}))`;
    } else if (statusUrl) {
      statusLabel += ` ([status](${statusUrl}))`;
    }

    return statusLabel;
  },
  verdict({ verdict, status }) {
    if ([TEST_STATUS.SKIPPED, TEST_STATUS.CANCELLED].includes(status)) {
      return "-";
    }

    if (verdict === REVIEW_STATUS.REJECTED) {
      return "🚫 Rejected";
    } else if (verdict === REVIEW_STATUS.APPROVED) {
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

/**
 * Parses the Markdown template and returns the approval status.
 * @param {import('@octokit/webhooks-types/schema.js').IssueComment} comment
 * @returns {import('./constants.js').Verdict | null}
 */
function getVerdictFromComment(comment) {
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

/**
 * @param {import('@octokit/webhooks-types/schema.js').IssueComment} [comment]
 * @returns {{ reports: Report[] }}
 */
export function extractDataFromComment(comment) {
  if (!comment) {
    return {
      reports: [TEST_SUITE.UNIT, TEST_SUITE.COMPONENT, TEST_SUITE.END_TO_END].map((suite) => ({
        suite,
        status: TEST_STATUS.SKIPPED,
        verdict: TEST_STATUS.PENDING,
        statusUrl: null,
        reportUrl: null,
      })),
    };
  }

  const dataTagPattern = new RegExp(`${DATA_TAG_OPEN}(.*)${DATA_TAG_CLOSE}`);
  const [_, data] = comment.body.match(dataTagPattern) ?? [];
  return JSON.parse(data);
}

/**
 *
 * @param {import('@octokit/webhooks-types/schema.js').PullRequest} pullRequest
 * @param {Object} options
 * @param {import('octokit').Octokit} options.octokit
 * @param {import('@octokit/webhooks-types/schema.js').Repository} options.repository
 * @returns {Promise<import('@octokit/webhooks-types/schema.js').IssueComment | undefined>}
 */
export async function findCommentInPullRequest(pullRequest, { octokit, repository }) {
  const { data: commentsInPullRequest } = await octokit.rest.issues.listComments({
    owner: repository.owner.login,
    repo: repository.name,
    issue_number: pullRequest.number,
  });

  return commentsInPullRequest.find((comment) => comment.body?.includes(DATA_TAG_OPEN));
}
