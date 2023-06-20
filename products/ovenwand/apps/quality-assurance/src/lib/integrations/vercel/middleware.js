import { env } from "node:process";
import { createHmac } from "node:crypto";
import { buffer, json } from "micro";
import { raise } from "../../utils.js";

/**
 * @param {import('node:http').IncomingMessage} request
 * @returns {Promise<boolean>}
 */
export async function verifyRequestSignature(request) {
  const payload = await buffer(request);
  const secret = env.VERCEL_WEBHOOK_SECRET ?? raise("VERCEL_WEBHOOK_SECRET is not set");
  const signature = createHmac("sha1", secret).update(payload).digest("hex");
  return signature === request.headers["x-vercel-signature"];
}

/**
 * @param {import('node:events').EventEmitter} webhooks
 */
export function createNodeMiddleware(webhooks) {
  /**
   * @param {import('node:http').IncomingMessage} request
   * @param {import('node:http').ServerResponse} response
   * @returns {Promise<void>}
   */
  return async (request, response) => {
    const isVerifiedRequest = await verifyRequestSignature(request);

    if (!isVerifiedRequest) {
      response.statusCode = 403;
      response.end("Invalid signature");
      return;
    }

    const event = /** @type {import('./types.js').VercelEvent} */ (await json(request));

    webhooks.emit(event.type, event);
  };
}
