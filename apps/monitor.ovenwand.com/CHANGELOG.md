# @ovenwand/monitor.ovenwand.com

## 0.5.2

### Patch Changes

- 7189a3e: Rename $app/env to $app/environment in svelte apps

## 0.5.1

### Patch Changes

- 02659b5: Update SvelteKit
- Updated dependencies [5ac4651]
- Updated dependencies [0740de2]
- Updated dependencies [70158fe]
  - @ovenwand/util.date@0.0.3
  - @ovenwand/services.faunadb@0.2.1
  - @ovenwand/util@0.0.16
  - @ovenwand/ui@0.0.15
  - @ovenwand/monitor@0.2.1
  - @ovenwand/app@0.1.15

## 0.5.0

### Minor Changes

- c62f556: Update to latest version of SvelteKit

### Patch Changes

- d9fc2e9: add faunadb client configuration
- Updated dependencies [accf097]
- Updated dependencies [567d152]
  - @ovenwand/services.faunadb@0.2.0
  - @ovenwand/app@0.1.14
  - @ovenwand/util@0.0.15
  - @ovenwand/ui@0.0.14

## 0.4.9

### Patch Changes

- Updated dependencies [d183b23]
  - @ovenwand/monitor@0.2.0
  - @ovenwand/util@0.0.14
  - @ovenwand/app@0.1.13
  - @ovenwand/ui@0.0.13

## 0.4.8

### Patch Changes

- @ovenwand/app@0.1.12
- @ovenwand/env@0.0.2
- @ovenwand/monitor@0.1.5
- @ovenwand/services.faunadb@0.1.1
- @ovenwand/ui@0.0.12
- @ovenwand/util@0.0.13
- @ovenwand/util.date@0.0.2

## 0.4.7

### Patch Changes

- 3306d86: Hardcode chart height

## 0.4.6

### Patch Changes

- @ovenwand/app@0.1.11
- @ovenwand/util@0.0.12
- @ovenwand/monitor@0.1.5
- @ovenwand/ui@0.0.11

## 0.4.5

### Patch Changes

- f80b525: Add loading state to charts

## 0.4.4

### Patch Changes

- @ovenwand/monitor@0.1.4
- @ovenwand/util@0.0.11
- @ovenwand/app@0.1.10
- @ovenwand/ui@0.0.10

## 0.4.3

### Patch Changes

- @ovenwand/monitor@0.1.3
- @ovenwand/util@0.0.10
- @ovenwand/app@0.1.9
- @ovenwand/ui@0.0.9

## 0.4.2

### Patch Changes

- 1cb6276: Update sveltekit and typescript
  - @ovenwand/ui@0.0.8
  - @ovenwand/app@0.1.8
  - @ovenwand/util@0.0.9

## 0.4.1

### Patch Changes

- bb6d97e: Replace doppler with kit cli

  - Adds `kit env run` command
  - Replaces `doppler run` with `kit env run`
  - Fixes pnpm \*:env commands not resolving correct doppler config

  TODO prevent packages and apps from depending on kit cli

## 0.4.0

### Minor Changes

- d0c301d: Update Vite to 3.x

## 0.3.7

### Patch Changes

- 387c766: Mark package as private
- Updated dependencies [387c766]
  - @ovenwand/app@0.1.7
  - @ovenwand/env@0.0.2
  - @ovenwand/monitor@0.1.2
  - @ovenwand/services.faunadb@0.1.1
  - @ovenwand/ui@0.0.7
  - @ovenwand/util.date@0.0.2
  - @ovenwand/util@0.0.8

## 0.3.6

### Patch Changes

- Updated dependencies [365227d]
  - @ovenwand/app@0.1.6

## 0.3.5

### Patch Changes

- Replaced DefaultLayout from `@ovenwand/ui` with Layout `@ovenwand/app`
- Fixed broken references to non-existent /dashboard
- Add navigation and footer to default layout
- Updated dependencies
  - @ovenwand/app@0.1.5

## 0.3.4

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @ovenwand/monitor@0.1.1
  - @ovenwand/app@0.1.4

## 0.3.3

### Patch Changes

- Updated dependencies
  - @ovenwand/monitor@0.1.0
  - @ovenwand/app@0.1.3

## 0.3.2

### Patch Changes

- Update svelte to latest version; removes vite config from svelte.config.js. See for details: https://svelte.dev/blog/whats-new-in-svelte-july-2022
  - @ovenwand/app@0.1.2
  - @ovenwand/env@0.0.1
  - @ovenwand/monitor@0.0.5
  - @ovenwand/services.faunadb@0.1.0
  - @ovenwand/ui@0.0.6
  - @ovenwand/util@0.0.7
  - @ovenwand/util.date@0.0.1
