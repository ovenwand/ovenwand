import type { EventEmitter } from "node:events";

export type VercelContext = {
  app: { webhooks: EventEmitter };
  on<E extends VercelEventName>(
    eventName: E,
    callback: (event: VercelEvent<E>) => void | Promise<void>
  ): void;
};

export type VercelEventName =
  | "deployment.created"
  | "deployment.succeeded"
  | "deployment.error"
  | "deployment.canceled";

export type VercelEvent<T extends VercelEventName = VercelEventName> = {
  type: T;
  payload: {
    url: string;
    deployment: {
      id: string;
      name: string;
      url: string;
      inspectorUrl: string;
      meta: {
        gitCommitAuthorName: string;
        gitCommitMessage: string;
        gitCommitRef: string;
        gitCommitSha: string;
        gitDirty: string;
        githubOrg: string;
        githubRepo: string;
        githubCommitRef: string;
      };
    };
  };
};
