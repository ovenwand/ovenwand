import {
  QUALITY_GATE,
  QUALITY_GATE_STATUS,
  QUALITY_REVIEW_CHECK_NAME,
} from "../../../../lib/constants.js";
import { createDebugLogger, isQualityGate, isQualityReviewVerdict } from "../../../../lib/utils.js";
import { defineCache } from "../../../../lib/integrations/github/cache.js";
import { createNodeMiddleware } from "../../../../lib/integrations/github/middleware.js";
import { createApp } from "../../../../lib/app.js";

/**
 * @param {import('node:http').IncomingMessage} request
 * @param {import('node:http').ServerResponse} response
 * @returns {Promise<void>}
 */
export default async (request, response) => {
  const debug = createDebugLogger("webhooks:github");

  const { github, createQualityReview, resetQualityReview, updateQualityGate } = createApp({
    cache: defineCache(),
  });

  github.on("pull_request.opened", async (event) => {
    debug(
      `Received "pull_request.opened" event for "${event.payload.pull_request.title}":`,
      event.payload.pull_request.url
    );
    await createQualityReview();
  });

  github.on("pull_request.reopened", async (event) => {
    debug(
      `Received "pull_request.reopened" event for "${event.payload.pull_request.title}":`,
      event.payload.pull_request.url
    );
    await resetQualityReview();
  });

  github.on("workflow_run", async (event) => {
    debug(
      `Received "workflow_run" event for "${event.payload.workflow_run.name}":`,
      event.payload.workflow_run.url
    );

    const { action, workflow, workflow_run } = event.payload;

    const gate = /** @type {import('../../../../lib/types.js').QualityGate} */ (
      workflow.name.toLowerCase().replace(" ", "-")
    );

    if (!isQualityGate(gate)) {
      debug(`Skipping workflow "${workflow.name}"`);
      return;
    }

    await updateQualityGate(gate, (gate) => {
      if (action === "requested") {
        gate.status = QUALITY_GATE_STATUS.PENDING;
      } else if (action === "in_progress") {
        gate.status = QUALITY_GATE_STATUS.RUNNING;
      } else if (action === "completed") {
        gate.status = workflow_run.conclusion;
      }
    });

    debug(`Successfully updated quality gate "${workflow.name}"`);
  });

  github.on("check_run.requested_action", async (event) => {
    debug(
      `Received "check_run.requested_action" event for "${event.payload.check_run.name}":`,
      event.payload.check_run.url
    );

    const { check_run } = event.payload;
    const { identifier } = event.payload.requested_action;

    if (check_run.name !== QUALITY_REVIEW_CHECK_NAME || !isQualityReviewVerdict(identifier)) {
      debug(`Skipping check run "${check_run.name}" with verdict "${identifier}"`);
      return;
    }

    await updateQualityGate(QUALITY_GATE.TEST_END_TO_END, (gate) => {
      gate.verdict = identifier;
    });

    debug(`Successfully updated quality gate "${QUALITY_GATE.TEST_END_TO_END}"`);
  });

  const middleware = createNodeMiddleware(github.app.webhooks);

  middleware(request, response);
};
