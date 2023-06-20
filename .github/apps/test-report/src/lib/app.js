import { env } from "node:process";
import { readFileSync } from "node:fs";
import { App } from "octokit";

export function createApp() {
  const appId = env.APP_ID;
  const privateKey = readFileSync(env.PRIVATE_KEY_PATH, "utf8");

  const webhooks = {
    secret: env.WEBHOOK_SECRET,
  };

  return new App({
    appId,
    privateKey,
    webhooks,
  });
}
