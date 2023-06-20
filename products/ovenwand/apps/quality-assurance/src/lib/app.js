import { env } from "node:process";
import {
  QUALITY_REVIEW_VERDICT,
  QUALITY_REVIEW_CHECK_NAME,
  PATTERNS,
  QUALITY_GATE_STATUS,
  QUALITY_GATE,
} from "./constants.js";
import { raise } from "./utils.js";
import { createCache, defineCache } from "./cache.js";
import {
  renderQualityReportBody,
  renderQualityReportData,
  renderQualityReportTitle,
} from "./report.js";

/**
 * @typedef {Object} AppConfig
 * @property {Omit<import('./cache.js').CreateCacheOptions, 'githubEvent' | 'vercelEvent' | 'github' | 'vercel'>} cache
 * @property {any} github
 * @property {any} vercel
 */

/**
 * @typedef {Object} CreateAppOptions
 * @property {Omit<import('./cache.js').CreateCacheOptions, 'githubEvent' | 'vercelEvent' | 'github' | 'vercel'>} cache
 */

/**
 * @param {CreateAppOptions} options
 * @returns
 */
export function createApp(options) {
  /** @type {AppConfig} */
  const config = {
    cache: options.cache,
    github: {
      appId: env.GITHUB_APP_ID ?? raise("GITHUB_APP_ID is not set"),
      installationId: env.GITHUB_APP_INSTALLATION_ID
        ? Number(env.GITHUB_APP_INSTALLATION_ID)
        : raise("GITHUB_APP_INSTALLATION_ID is not set"),
      privateKeyPath:
        env.GITHUB_APP_PRIVATE_KEY_PATH ?? raise("GITHUB_APP_PRIVATE_KEY_PATH is not set"),
      secret: env.GITHUB_APP_WEBHOOK_SECRET ?? raise("GITHUB_APP_WEBHOOK_SECRET is not set"),
    },
    vercel: {},
  };

  const cache = createCache(defineCache(config));

  return {
    /** @type {AppConfig} */
    config,

    /**
     * @returns {import("./integrations/github/types.js").GithubContext}
     */
    get github() {
      return cache.get("github");
    },

    /**
     * @returns {import("./integrations/vercel/types.js").VercelContext}
     */
    get vercel() {
      return cache.get("vercel");
    },

    /**
     * @returns {Promise<void>}
     */
    async createQualityReview() {
      const report = getInitialReport();
      await Promise.all([createComment(report, cache), createCheck(report, cache)]);
    },

    /**
     * @returns {Promise<void>}
     */
    async resetQualityReview() {
      const report = getInitialReport();
      await Promise.all([updateComment(report, cache), updateCheck(report, cache)]);
    },

    // /**
    //  * @param {import('./types.js').QualityGate} name
    //  * @returns {Promise<void>}
    //  */
    // async createQualityGate(name) {
    //   const report = await getReport(false, cache);

    //   report.gates.push({
    //     gate: name,
    //     status: QUALITY_GATE_STATUS.PENDING,
    //     verdict: QUALITY_REVIEW_VERDICT.PENDING,
    //     statusUrl: null,
    //     reportUrl: null,
    //   });

    //   report.gates.sort((a, b) => a.gate.localeCompare(b.gate));

    //   await Promise.all([createOrUpdateComment(report, cache), createOrUpdateCheck(report, cache)]);
    // },

    /**
     * @param {import('./types.js').QualityGate} name
     * @param {(gate: import('./types.js').QualityGateReport) => void | Promise<void>} mutation
     * @returns {Promise<void>}
     */
    async updateQualityGate(name, mutation) {
      const report = await getReport(cache);
      const gate = findGate(name, report);

      if (!gate) {
        throw new Error(`Quality gate "${name}" not found`);
      }

      await mutation(gate);

      await Promise.all([updateComment(report, cache), updateCheck(report, cache)]);
    },
  };
}

/**
 * @param {import('./cache.js').Cache} cache
 * @returns {Promise<import('./types.js').QualityReport>}
 */
async function getReport(cache) {
  const comment = await cache.get("comment");
  const [_, data] = comment.body.match(PATTERNS.EXTRACT_QUALITY_REPORT_DATA) ?? [];
  return JSON.parse(data);
}

/**
 * @returns {import('./types.js').QualityReport}
 */
export function getInitialReport() {
  return {
    verdict: QUALITY_REVIEW_VERDICT.PENDING,

    gates: Object.values(QUALITY_GATE).map((gate) => ({
      gate,
      status: QUALITY_GATE_STATUS.SKIPPED,
      verdict: QUALITY_REVIEW_VERDICT.PENDING,
      statusUrl: null,
      reportUrl: null,
    })),
  };
}

/**
 * @param {string} name
 * @param {import('./types.js').QualityReport} report
 */
function findGate(name, report) {
  return report.gates.find((gate) => gate.gate === name);
}

/**
 * @param {import('./types.js').QualityReport} report
 * @param {import('./cache.js').Cache} cache
 */
async function createComment(report, cache) {
  const octokit = await cache.get("octokit");
  const pullRequest = await cache.get("pullRequest");

  return octokit.rest.issues.createComment({
    ...cache.get("repository"),
    issue_number: pullRequest.number,
    body: `
${renderQualityReportTitle()}

${renderQualityReportBody(report)}

${renderQualityReportData(report)}
    `.trim(),
  });
}

/**
 * @param {import('./types.js').QualityReport} report
 * @param {import('./cache.js').Cache} cache
 */
async function updateComment(report, cache) {
  const octokit = await cache.get("octokit");
  const comment = await cache.get("comment");

  return octokit.rest.issues.updateComment({
    ...cache.get("repository"),
    comment_id: comment.id,
    body: `
${renderQualityReportTitle()}

${renderQualityReportBody(report)}

${renderQualityReportData(report)}
    `.trim(),
  });
}

/**
 * @param {import('./types.js').QualityReport} report
 * @param {import('./cache.js').Cache} cache
 */
async function createCheck(report, cache) {
  const octokit = await cache.get("octokit");
  const pullRequest = await cache.get("pullRequest");

  return octokit.rest.checks.create({
    ...cache.get("repository"),
    name: QUALITY_REVIEW_CHECK_NAME,
    head_sha: pullRequest.head.sha,
    started_at: new Date().toISOString(),
    conclusion: "action_required",
    ...getQualityReviewCheckData(report),
  });
}

/**
 * @param {import('./types.js').QualityReport} report
 * @param {import('./cache.js').Cache} cache
 */
async function updateCheck(report, cache) {
  const octokit = await cache.get("octokit");
  const check = await cache.get("check");

  const conclusion = {
    [QUALITY_REVIEW_VERDICT.APPROVED]: "success",
    [QUALITY_REVIEW_VERDICT.REJECTED]: "failure",
    [QUALITY_REVIEW_VERDICT.PENDING]: "action_required",
  };

  const hasPendingGates = report.gates.some((gate) => gate.status === QUALITY_GATE_STATUS.PENDING);

  const hasFailedGates = report.gates.every(
    (gate) =>
      gate.status === QUALITY_GATE_STATUS.SKIPPED ||
      gate.verdict === QUALITY_REVIEW_VERDICT.APPROVED
  );

  if (hasPendingGates) {
    report.verdict = QUALITY_REVIEW_VERDICT.PENDING;
  } else {
    report.verdict = hasFailedGates
      ? QUALITY_REVIEW_VERDICT.APPROVED
      : QUALITY_REVIEW_VERDICT.REJECTED;
  }

  return octokit.rest.checks.update({
    ...cache.get("repository"),
    check_run_id: check.id,
    conclusion: conclusion[report.verdict],
    completed_at:
      report.verdict !== QUALITY_REVIEW_VERDICT.PENDING ? new Date().toISOString() : undefined,
    ...getQualityReviewCheckData(report),
  });
}

/**
 * @param {import('./types.js').QualityReport} report
 */
function getQualityReviewCheckData(report) {
  return {
    output: {
      title: renderQualityReportTitle(),
      summary: renderQualityReportBody(report),
    },
    actions: [
      {
        label: "Approve",
        description: "Approve the test results",
        identifier: QUALITY_REVIEW_VERDICT.APPROVED,
      },
      {
        label: "Reject",
        description: "Reject the test results",
        identifier: QUALITY_REVIEW_VERDICT.REJECTED,
      },
    ],
  };
}
