import { env } from "node:process";
import { createHmac } from "node:crypto";
import { buffer, json } from "micro";
import { createApp } from "../../../../lib/app.js";
import { useTestReport } from "../../../../lib/comment.js";

/**
 * @param {import('node:http').IncomingMessage} request
 * @param {import('node:http').ServerResponse} response
 */
export default async (request, response) => {
  const hasValidSignature = await verifyVercelSignature(request);

  if (!hasValidSignature) {
    response.statusCode = 403;
    response.end("Invalid signature");
    return;
  }

  const app = createApp();
  const octokit = await app.getInstallationOctokit(env.GITHUB_APP_INSTALLATION_ID);
  const { event, deployment } = await getDeploymentFromRequest(request);

  const repository = {
    owner: { login: deployment.meta.githubOrg },
    name: deployment.meta.githubRepo,
  };

  const { data: pullRequests } = await octokit.rest.pulls.list({
    owner: repository.owner.login,
    repo: repository.name,
    head: deployment.meta.githubCommitRef,
    base: "master",
    state: "open",
  });

  const { updateTestReport } = useTestReport(
    { name: "Test end-to-end", pull_requests: pullRequests },
    repository,
    octokit
  );

  console.log(deployment.meta, event);

  await updateTestReport((report) => {
    report.reportUrl = event.payload.url;
  });
};

async function verifyVercelSignature(request) {
  const payload = await buffer(request);

  const signature = createHmac("sha1", env.VERCEL_WEBHOOK_SECRET).update(payload).digest("hex");

  return signature === request.headers["x-vercel-signature"];
}

/**
 * @typedef {Object} VercelEvent
 * @property {VercelEventPayload} payload
 */

/**
 * @typedef {Object} VercelEventPayload
 * @property {string} url
 * @property {VercelDeployment} deployment
 */

/**
 * @typedef {Object} VercelDeployment
 * @property {string} inspectUrl
 * @property {VercelDeploymentMeta} meta
 */

/**
 * @typedef {Object} VercelDeployment
 * @property {string} inspectUrl
 * @property {VercelDeploymentMeta} meta
 */

/**
 *
 * @param {import('node:http').IncomingMessage} request
 * @returns {Promise<{ event: VercelEvent, deployment: VercelDeployment, inspectUrl: string, deploymentUrl: string }>}
 */
async function getDeploymentFromRequest(request) {
  const event = /** @type {any} */ (await json(request));
  const { deployment, url } = event.payload;

  return {
    event,
    deployment,
    inspectUrl: deployment.url,
    deploymentUrl: `https://${url}`,
  };
}
