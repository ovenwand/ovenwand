import { readFileSync } from "node:fs";
import { EventEmitter } from "node:events";
import { App } from "octokit";
import { raise } from "./utils.js";

/**
 * @typedef {import('./integrations/github/types.js').GithubContext} GithubContext
 */

/**
 * @template {import('./integrations/github/types.js').GithubEventName} [Name=import('./integrations/github/types.js').GithubEventName]
 * @typedef {import('./integrations/github/types.js').GithubEvent<Name>} GithubEvent
 */

/**
 * @typedef {import('./integrations/github/types.js').Repo} Repo
 */

/**
 * @typedef {import('./integrations/github/types.js').PullRequest} PullRequest
 */

/**
 * @typedef {import('./integrations/github/types.js').IssueComment} IssueComment
 */

/**
 * @typedef {import('./integrations/github/types.js').CheckRun} CheckRun
 */

/**
 * @typedef {import('./integrations/vercel/types.js').VercelContext} VercelContext
 */

/**
 * @template {import('./integrations/vercel/types.js').VercelEventName} [Name=import('./integrations/vercel/types.js').VercelEventName]
 * @typedef {import('./integrations/vercel/types.js').VercelEvent<Name>} VercelEvent
 */

/**
 * @typedef {Object} CacheShape
 * @property {GithubContext | null} github
 * @property {VercelContext | null} vercel
 * @property {GithubEvent | null} githubEvent
 * @property {VercelEvent | null} vercelEvent
 * @property {Repo | null} repository
 * @property {Promise<import('octokit').Octokit> | null} octokit
 * @property {Promise<PullRequest> | null} pullRequest
 * @property {Promise<IssueComment> | null} comment
 * @property {Promise<CheckRun> | null} check
 */

/**
 * @typedef {Object} Cache
 * @property {CacheShape} memory
 * @property {(key: keyof CacheShape) => boolean} has
 * @property {<K extends keyof CacheShape>(key: K) => NonNullable<CacheShape[K]>} get
 * @property {<K extends keyof CacheShape>(key: K, value: NonNullable<CacheShape[K]>) => void} set
 * @property {() => void} invalidate
 */

/**
 * @typedef {{ [K in keyof CacheShape]: (cache: Cache) => NonNullable<CacheShape[K]> }} CreateCacheOptions
 */

/**
 * @param {CreateCacheOptions} create
 * @returns {Cache}
 */
export function createCache(create) {
  /** @type {CacheShape} */
  const memory = {
    github: null,
    vercel: null,
    githubEvent: null,
    vercelEvent: null,
    repository: null,
    octokit: null,
    pullRequest: null,
    comment: null,
    check: null,
  };

  /**
   * @template {keyof CacheShape} K
   * @param {K} key
   * @returns {boolean}
   */
  function has(key) {
    return memory[key] !== null;
  }

  /**
   * @template {keyof CacheShape} K
   * @param {K} key
   * @param {CacheShape[K]} value
   * @returns {void}
   */
  function set(key, value) {
    memory[key] = value;
  }

  /**
   * @template {keyof CacheShape} K
   * @param {K} key
   * @returns {NonNullable<CacheShape[K]>}
   */
  function get(key) {
    if (!has(key)) {
      set(key, create[key]({ memory, has, get, set, invalidate }));
    }

    const value = memory[key];

    if (value === null) {
      throw new Error(`Cache value "${key}" is null`);
    }

    return value;
  }

  /**
   * @returns {void}
   */
  function invalidate() {
    const cacheKeys = /** @type {(keyof CacheShape)[]} */ (Object.keys(memory));

    cacheKeys.forEach((key) => {
      memory[key] = null;
    });
  }

  return {
    memory,
    has,
    set,
    get,
    invalidate,
  };
}

/**
 * @param {import('./app.js').AppConfig} config
 * @returns {CreateCacheOptions}
 */
export function defineCache(config) {
  return {
    ...config.cache,
    githubEvent: () => {
      throw new Error("Event cache should be set by the webhook handler");
    },
    vercelEvent: () => {
      throw new Error("Event cache should be set by the webhook handler");
    },
    github: ({ set, invalidate }) => {
      const app = new App({
        appId: config.github.appId,
        privateKey:
          readFileSync(config.github.privateKeyPath, "utf8") ??
          raise(`Could not read private key from ${config.github.privateKeyPath}`),
        webhooks: {
          secret: config.github.secret,
        },
      });

      return {
        config: config.github,
        app,
        on(eventName, callback) {
          app.webhooks.on(eventName, async (event) => {
            set("githubEvent", event);
            await callback(event);
            invalidate();
          });
        },
      };
    },
    vercel: ({ set, invalidate }) => {
      const webhooks = new EventEmitter();

      return {
        app: { webhooks },
        on(eventName, callback) {
          webhooks.on(eventName, async (event) => {
            set("vercelEvent", event);
            await callback(event);
            invalidate();
          });
        },
      };
    },
  };
}
