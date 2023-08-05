import { QUALITY_GATE } from "../../../../lib/constants.js";
import { createDebugLogger } from "../../../../lib/utils.js";
import { defineCache } from "../../../../lib/integrations/vercel/cache.js";
import { createNodeMiddleware } from "../../../../lib/integrations/vercel/middleware.js";
import { createApp } from "../../../../lib/app.js";

/**
 * @param {import('node:http').IncomingMessage} request
 * @param {import('node:http').ServerResponse} response
 * @returns {Promise<void>}
 */
export default async (request, response) => {
  const debug = createDebugLogger("webhooks:vercel");

  const { vercel, updateQualityGate } = createApp({
    cache: defineCache(),
  });

  vercel.on("deployment.succeeded", async (event) => {
    debug('Received "deployment.succeeded" event', event);

    await updateQualityGate(QUALITY_GATE.TEST_END_TO_END, (gate) => {
      gate.reportUrl = `https://${event.payload.deployment.url}`;
    });

    debug(`Successfully updated quality gate "${QUALITY_GATE.TEST_END_TO_END}"`);
  });

  const middleware = createNodeMiddleware(vercel.app.webhooks);

  middleware(request, response);
};
