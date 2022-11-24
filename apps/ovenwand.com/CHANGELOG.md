# @ovenwand/ovenwand.com

## 0.13.8

### Patch Changes

- 6898c5a: Remove unused "envPrefix" from vite config
- Updated dependencies [816e66e]
  - @ovenwand/config@0.1.8
  - @ovenwand/ui@0.0.20
  - @ovenwand/app@0.1.21
  - @ovenwand/brand@0.0.10
  - @ovenwand/env@0.0.2
  - @ovenwand/services.monitor@0.2.3
  - @ovenwand/services.sentry@0.0.1
  - @ovenwand/util@0.0.20
  - @ovenwand/util.date@0.0.3
  - @ovenwand/util.math@0.0.8

## 0.13.7

### Patch Changes

- a8a35fd: Remove redundant tailwind config
- Updated dependencies [be569a9]
- Updated dependencies [1b121fd]
  - @ovenwand/config@0.1.7
  - @ovenwand/app@0.1.20
  - @ovenwand/brand@0.0.10
  - @ovenwand/env@0.0.2
  - @ovenwand/services.monitor@0.2.3
  - @ovenwand/services.sentry@0.0.1
  - @ovenwand/ui@0.0.19
  - @ovenwand/util@0.0.19
  - @ovenwand/util.date@0.0.3
  - @ovenwand/util.math@0.0.8

## 0.13.6

### Patch Changes

- 784fd54: Add dots and boxes game to experiments

## 0.13.5

### Patch Changes

- fb89c85: Normalize environment variables and usages
- 1f97e06: Update sveltekit

## 0.13.4

### Patch Changes

- 4333b86: Update sveltekit and vite

## 0.13.3

### Patch Changes

- 7189a3e: Rename $app/env to $app/environment in svelte apps

## 0.13.2

### Patch Changes

- 4b96232: guarantee calling layout before page to make sure storyblok is setup

## 0.13.1

### Patch Changes

- 02659b5: Update SvelteKit

## 0.13.0

### Minor Changes

- f9fda07: Update to latest version of sveltekit

### Patch Changes

- aa907a9: Disable sentry due to bug

## 0.12.8

### Patch Changes

- bed6dda: Replace base/footer/header with components from @ovenwand/app

## 0.12.7

### Patch Changes

- dc39ed8: Improve readability of vue experiment context
- 090ba55: Add syntax highlighting to blog

## 0.12.6

### Patch Changes

- 1d769ff: Move canvas experiments to /experiments/canvas

## 0.12.5

### Patch Changes

- d7785ff: Add Vue reactivity experiment

## 0.12.4

### Patch Changes

- 1cb6276: Update sveltekit and typescript

## 0.12.3

### Patch Changes

- bb6d97e: Replace doppler with kit cli

  - Adds `kit env run` command
  - Replaces `doppler run` with `kit env run`
  - Fixes pnpm \*:env commands not resolving correct doppler config

  TODO prevent packages and apps from depending on kit cli

## 0.12.2

### Patch Changes

- 0283f56: Add experiments and sidebar links to navigation, guarded by features
- c6c8d5f: Update lingering server routes to latest version of svelte-kit: replace old server routes called get instead of GET
- acb8915: Add vue experiment

## 0.12.1

### Patch Changes

- b429fc2: Add react experiment

## 0.12.0

### Minor Changes

- d0c301d: Update Vite to 3.x

## 0.11.3

### Patch Changes

- 387c766: Mark package as private

## 0.11.2

### Patch Changes

- ee2eed9: Implements new `useFeatures` and `isFeatureRunning` utilites.

## 0.11.1

### Patch Changes

- Add performance tracing

## 0.11.0

### Minor Changes

- Add error logging / monitoring

## 0.10.4

### Patch Changes

- Update svelte to latest version; removes vite config from svelte.config.js. See for details: https://svelte.dev/blog/whats-new-in-svelte-july-2022
