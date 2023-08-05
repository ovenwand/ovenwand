import type { App } from "octokit";
import type { EmitterWebhookEvent, EmitterWebhookEventName } from "@octokit/webhooks";
import type { CheckRunEvent } from "@octokit/webhooks-types/schema.js";

export type GithubContext = {
  config: any;
  app: App;
  on<E extends GithubEventName>(
    eventName: E,
    callback: (event: GithubEvent<E>) => void | Promise<void>
  ): void;
};

export type GithubEventName = EmitterWebhookEventName;

export type GithubEvent<Name extends GithubEventName = GithubEventName> = EmitterWebhookEvent<Name>;

export type Repo = { owner: string; repo: string };

export type CheckRun = CheckRunEvent["check_run"];

export type { IssueComment, PullRequest } from "@octokit/webhooks-types/schema.js";
