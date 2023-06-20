import { env } from "node:process";
import { readFileSync } from "node:fs";
import { App } from "octokit";

export function createApp() {
  const appId = env.GITHUB_APP_ID;
  const privateKey = readFileSync(env.GITHUB_APP_PRIVATE_KEY_PATH, "utf8");

  const webhooks = {
    secret: env.GITHUB_APP_WEBHOOK_SECRET,
  };

  return new App({
    appId,
    privateKey,
    webhooks,
  });
}
