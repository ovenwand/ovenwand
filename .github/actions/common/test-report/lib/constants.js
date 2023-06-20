export const COMMENT_TAG = "<!-- test-report-comment -->";
export const DATA_TAG_OPEN = "<!-- test-report-comment-data: ";
export const DATA_TAG_CLOSE = " -->";

export const TEST_SUITE = Object.freeze({
  UNIT: "unit",
  COMPONENT: "component",
  END_TO_END: "end-to-end",
});

/**
 * @typedef {typeof TEST_SUITE[keyof typeof TEST_SUITE]} TestSuite
 */

export const TEST_STATUS = Object.freeze({
  // Actual test statuses from GitHub Actions
  SUCCESS: "success",
  FAILURE: "failure",
  SKIPPED: "skipped",
  CANCELLED: "cancelled",
  // Custom test statuses
  PENDING: "pending",
  RUNNING: "running",
});

/**
 * @typedef {typeof TEST_STATUS[keyof typeof TEST_STATUS]} TestStatus
 */

export const REVIEW_STATUS = Object.freeze({
  APPROVED: "approved",
  REJECTED: "rejected",
  PENDING: "pending",
});

/**
 * @typedef {typeof REVIEW_STATUS[keyof typeof REVIEW_STATUS]} ReviewStatus
 */

export const VERDICT = Object.freeze({
  APPROVED: "approved",
  REJECTED: "rejected",
  PENDING: "pending",
});

/**
 * @typedef {typeof VERDICT[keyof typeof VERDICT]} Verdict
 */
