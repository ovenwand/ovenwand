export const QUALITY_GATE = Object.freeze({
  TEST_UNIT: "test-unit",
  TEST_COMPONENT: "test-component",
  TEST_END_TO_END: "test-end-to-end",
});

export const QUALITY_GATE_STATUS = Object.freeze({
  // Actual workflow/job run statuses from GitHub Actions
  SUCCESS: "success",
  FAILURE: "failure",
  SKIPPED: "skipped",
  CANCELLED: "cancelled",
  NEUTRAL: "neutral",
  TIMED_OUT: "timed_out",
  STALE: "stale",
  ACTION_REQUIRED: "action_required",
  // Custom test statuses
  PENDING: "pending",
  RUNNING: "running",
});

export const QUALITY_REVIEW_VERDICT = Object.freeze({
  APPROVED: "approved",
  REJECTED: "rejected",
  PENDING: "pending",
});

export const QUALITY_REPORT_DATA_TAG_OPEN = "<!-- quality-report-data: ";

export const QUALITY_REPORT_DATA_TAG_CLOSE = " -->";

// export const QUALITY_REVIEW_CHECK_NAME = "Quality review";
export const QUALITY_REVIEW_CHECK_NAME = "Quality assurance report";

export const PATTERNS = Object.freeze({
  EXTRACT_QUALITY_GATE: new RegExp(
    `^Quality gate: (${Object.values(QUALITY_GATE).join("|")}) \\((.*)\\)$`
  ),
  EXTRACT_QUALITY_REPORT_DATA: new RegExp(
    `${QUALITY_REPORT_DATA_TAG_OPEN}(.*)${QUALITY_REPORT_DATA_TAG_CLOSE}`
  ),
});
