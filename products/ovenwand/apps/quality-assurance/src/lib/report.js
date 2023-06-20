import {
  QUALITY_GATE_STATUS,
  QUALITY_REPORT_DATA_TAG_CLOSE,
  QUALITY_REPORT_DATA_TAG_OPEN,
  QUALITY_REVIEW_VERDICT,
} from "./constants.js";
import { toTitleCase } from "./utils.js";

export function renderQualityReportTitle() {
  return "🕵️ Quality assurance report";
}

/**
 * @param {import('./types.js').QualityReport} report
 * @returns {string};
 */
export function renderQualityReportBody(report) {
  /** @type {Record<string, (gate: import('./types.js').QualityGateReport) => string>} */
  const columns = {
    suite({ gate }) {
      const parts = gate.split("-");
      return `${toTitleCase(parts[0])} ${parts.slice(1).join("-")}`;
    },
    status({ reportUrl, status, statusUrl, gate }) {
      const STATUS_ICON = {
        [QUALITY_GATE_STATUS.PENDING]: "⚪",
        [QUALITY_GATE_STATUS.RUNNING]: "🔵",
        [QUALITY_GATE_STATUS.FAILURE]: "🔴",
        [QUALITY_GATE_STATUS.ACTION_REQUIRED]: "🔴",
        [QUALITY_GATE_STATUS.CANCELLED]: "🟠",
        [QUALITY_GATE_STATUS.TIMED_OUT]: "🟠",
        [QUALITY_GATE_STATUS.STALE]: "🟠",
        [QUALITY_GATE_STATUS.SUCCESS]: "🟢",
        [QUALITY_GATE_STATUS.SKIPPED]: "⚫",
        [QUALITY_GATE_STATUS.NEUTRAL]: "⚫",
      };

      let statusLabel = `${STATUS_ICON[status]} ${toTitleCase(status)}`;

      if (reportUrl) {
        statusLabel += ` ([report](${reportUrl}/${gate}/))`;
      } else if (statusUrl) {
        statusLabel += ` ([status](${statusUrl}))`;
      }

      return statusLabel;
    },
    verdict({ verdict, status }) {
      // @ts-expect-error - TS2345: Argument of type 'QualityGateStatus' is not assignable to parameter of type '"skipped" | "cancelled"'
      if ([QUALITY_GATE_STATUS.SKIPPED, QUALITY_GATE_STATUS.CANCELLED].includes(status)) {
        return "-";
      }

      if (verdict === QUALITY_REVIEW_VERDICT.REJECTED) {
        return "🚫 Rejected";
      } else if (verdict === QUALITY_REVIEW_VERDICT.APPROVED) {
        return "✅ Approved";
      }

      return "⏳ Pending";
    },
    remarks({ status, verdict }) {
      if (
        status === QUALITY_GATE_STATUS.SKIPPED ||
        status === QUALITY_GATE_STATUS.CANCELLED ||
        (status === QUALITY_GATE_STATUS.FAILURE &&
          (verdict === QUALITY_REVIEW_VERDICT.REJECTED ||
            verdict === QUALITY_REVIEW_VERDICT.APPROVED))
      ) {
        return "-";
      }

      if (status === QUALITY_GATE_STATUS.SUCCESS) {
        return "ℹ️ No action required";
      }

      if (status === QUALITY_GATE_STATUS.FAILURE && verdict === QUALITY_REVIEW_VERDICT.PENDING) {
        return "⚠️ Review required";
      }

      if (status === QUALITY_GATE_STATUS.PENDING) {
        return `ℹ️ Waiting for tests to run`;
      }

      if (status === QUALITY_GATE_STATUS.RUNNING) {
        return `ℹ️ Waiting for report`;
      }

      return "";
    },
  };

  return `
#### Overview

| Suite | Status | Review | Remarks |
| ----- | ------ | ------ | ------- |
${report.gates
  .map((gate) => {
    const { suite, status, verdict, remarks } = columns;
    return `| ${suite(gate)} | ${status(gate)} | ${verdict(gate)} | ${remarks(gate)} |`;
  })
  .join("\n")}

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
  `.trim();
}

/**
 * @param {import('./types.js').QualityReport} report
 * @returns {string}
 */
export function renderQualityReportData(report) {
  return `${QUALITY_REPORT_DATA_TAG_OPEN}${JSON.stringify(report)}${QUALITY_REPORT_DATA_TAG_CLOSE}`;
}
