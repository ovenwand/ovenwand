import * as core from "@actions/core";
import { context } from "@actions/github";
import {
  createComment,
  getCurrentPullRequest,
  getDataFromTestReportComment,
  getDefaultTestReportData,
  getTestReportComment,
  renderCommentBody,
  updateComment,
} from "../lib/utils.js";

async function main({ repo, sha }) {
  const testSuite = core.getInput("test_suite");
  const testStatus = core.getInput("test_status");
  const testReportUrl = core.getInput("test_report_url");

  const pullRequest = await getCurrentPullRequest(sha);
  const comment = await getTestReportComment(pullRequest);

  const reports = getDataFromTestReportComment(comment) ?? getDefaultTestReportData();

  if (testStatus || testReportUrl) {
    const report = reports.find((report) => report.suite === testSuite);

    if (!report) {
      throw new Error(`No report found for test suite "${testSuite}"`);
    }

    report.status = testStatus;
    report.reportUrl = testReportUrl;
  }

  const body = renderCommentBody({ comment, reports });

  if (!comment) {
    return createComment({
      ...repo,
      issue_number: pullRequest.number,
      body,
    });
  }

  return updateComment(comment.id, { ...repo, body });
}

main(context);
