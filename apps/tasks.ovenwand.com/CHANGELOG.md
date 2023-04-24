# @ovenwand/tasks.ovenwand.com

## 0.4.11

### Patch Changes

- 1e02ec6: Fix skipping renovate bot commits in vercel ignore command

## 0.4.10

### Patch Changes

- e5cf871: Update @sveltejs/adapter-vercel to ^2.0.0
  - @ovenwand/ui@0.0.26
  - @ovenwand/app@0.1.28
  - @ovenwand/auth@0.0.2
  - @ovenwand/env@0.0.2
  - @ovenwand/gql@0.0.3
  - @ovenwand/services.faunadb@0.2.2
  - @ovenwand/services.pusher@0.0.0
  - @ovenwand/util@0.0.25
  - @ovenwand/util.date@0.0.3
  - @ovenwand/util.math@0.0.8

## 0.4.9

### Patch Changes

- 90b3661: Update to SvelteKit 1.0.0
- e9496fa: Restrict task access to owners
- 7e32ff2: replace footer root `div` element with `footer` element
- 38cb25e: Make session object available anywhere
- b9d4916: Major refactor

  - rewrite database and store
  - divide database into private and public api
  - progressively enhance forms
  - remove server routes
  - add layout to system routes

- 59fae2c: Divide $lib/auth into public and private

  - Move $lib/session to $lib/auth

- Updated dependencies [90b3661]
  - @ovenwand/app@0.1.26
  - @ovenwand/ui@0.0.25
  - @ovenwand/auth@0.0.2
  - @ovenwand/env@0.0.2
  - @ovenwand/gql@0.0.3
  - @ovenwand/services.faunadb@0.2.2
  - @ovenwand/services.pusher@0.0.0
  - @ovenwand/util@0.0.24
  - @ovenwand/util.date@0.0.3
  - @ovenwand/util.math@0.0.8

## 0.4.8

### Patch Changes

- f7e4777: Add anchor to today's tasks
- 10512a1: Make task title and description editable in explorer
- e8daa2e: Add wrapper around svelte content
- 1cc47be: Refactor dashboard, footer and routes

      - Separate focus and dashboard
      - Make footer links dynamic

- 10512a1: Add Editable component
- 5695e81: prevent 500 errors when no current task is found
  - @ovenwand/app@0.1.25
  - @ovenwand/auth@0.0.2
  - @ovenwand/env@0.0.2
  - @ovenwand/gql@0.0.3
  - @ovenwand/services.faunadb@0.2.2
  - @ovenwand/services.pusher@0.0.0
  - @ovenwand/ui@0.0.24
  - @ovenwand/util@0.0.23
  - @ovenwand/util.date@0.0.3
  - @ovenwand/util.math@0.0.8

## 0.4.7

### Patch Changes

- @ovenwand/ui@0.0.23
- @ovenwand/app@0.1.24

## 0.4.6

### Patch Changes

- @ovenwand/app@0.1.23
- @ovenwand/auth@0.0.1
- @ovenwand/env@0.0.2
- @ovenwand/gql@0.0.3
- @ovenwand/services.faunadb@0.2.2
- @ovenwand/services.pusher@0.0.0
- @ovenwand/ui@0.0.22
- @ovenwand/util@0.0.22
- @ovenwand/util.date@0.0.3
- @ovenwand/util.math@0.0.8

## 0.4.5

### Patch Changes

- @ovenwand/app@0.1.22
- @ovenwand/auth@0.0.1
- @ovenwand/env@0.0.2
- @ovenwand/gql@0.0.3
- @ovenwand/services.faunadb@0.2.2
- @ovenwand/services.pusher@0.0.0
- @ovenwand/ui@0.0.21
- @ovenwand/util@0.0.21
- @ovenwand/util.date@0.0.3
- @ovenwand/util.math@0.0.8

## 0.4.4

### Patch Changes

- 6898c5a: Remove unused "envPrefix" from vite config
  - @ovenwand/ui@0.0.20
  - @ovenwand/app@0.1.21
  - @ovenwand/auth@0.0.1
  - @ovenwand/env@0.0.2
  - @ovenwand/gql@0.0.3
  - @ovenwand/services.faunadb@0.2.2
  - @ovenwand/services.pusher@0.0.0
  - @ovenwand/util@0.0.20
  - @ovenwand/util.date@0.0.3
  - @ovenwand/util.math@0.0.8

## 0.4.3

### Patch Changes

- a8a35fd: Remove redundant tailwind config
  - @ovenwand/app@0.1.20
  - @ovenwand/auth@0.0.1
  - @ovenwand/env@0.0.2
  - @ovenwand/gql@0.0.3
  - @ovenwand/services.faunadb@0.2.2
  - @ovenwand/services.pusher@0.0.0
  - @ovenwand/ui@0.0.19
  - @ovenwand/util@0.0.19
  - @ovenwand/util.date@0.0.3
  - @ovenwand/util.math@0.0.8

## 0.4.2

### Patch Changes

- 6f275ab: Add login/logout account routes
- 096a28a: Protect routes with auth
- f94ae8c: Add auth queries, resolvers and roles
- 67b9051: Fix broken dependencies
- a2daf83: Add user session and referrer url to locals
- 1468502: Pass token to importSchema migration
- 5b03032: Remove old index route
- 83dd7c3: add error logging to system migrations endpoint
- 4523a69: move app css to root layout
- Updated dependencies [f1758bd]
- Updated dependencies [8cbfbd4]
- Updated dependencies [c7a4c3a]
- Updated dependencies [f9e89ce]
- Updated dependencies [53a6a7c]
- Updated dependencies [7673a1e]
  - @ovenwand/auth@0.0.1
  - @ovenwand/services.faunadb@0.2.2
  - @ovenwand/app@0.1.19
  - @ovenwand/util@0.0.18
  - @ovenwand/ui@0.0.18

## 0.4.1

### Patch Changes

- e0498f2: Implement Base component from @ovenwand/app

## 0.4.0

### Minor Changes

- df3e439: Connect router to TaskModal on calendar page

  - TaskModal now accessible through url

- 12639e9: Implement websocket for realtime task updates

### Patch Changes

- 6e4639b: Add websocket utilities
- fb89c85: Normalize environment variables and usages
- b44728d: Fix footer buttons to use full width prop
- 36e304a: Add re-usable query fields
- fae62f5: Fix build: - add optional dependency "encoding" - add @originjs/vite-plugin-commonjs

## 0.3.2

### Patch Changes

- 4333b86: Update sveltekit and vite

## 0.3.1

### Patch Changes

- dd8a801: Add ability to link Task to href
- 1fa8112: Add shadow to schedule calendar sheet
- ba37cfa: Add routing to explorer
- c930642: Prevent changing order when updating tasks
- f6d31b8: Set default value for task.schedule
- 1937f42: Apply sorting to useTasks result
- d84c3bb: Add shadow to Panel component
- 443f50b: Replace new Response call with wrapper from @sveltejs/kit
- b5e9d79: Remove @vitejs/plugin-basic-ssl
- 55aaede: Add getTask action
- fc5c7c2: Force loading cursor in ApplicationState

## 0.3.0

### Minor Changes

- 3f03c47: Replace calendar with schedule
- 3c9de73: Redesign home dashboard to focus point
- 106e2aa: Replace tasks with explorer
- 0272aed: Replace custom graphql client with apollo

### Patch Changes

- 8471e17: Add Panel component
- 261c01d: Task component improvements

      - Adds a label for the exisiting input
      - Sets mouseover and mousedown cursors
      - Adds interactive prop to disable draggable action
      - Adds highlight state

- 497c033: Graphql schema fixes and improvements

      - Adds new fields and resolvers to schema.gql
      - Adds full generated schema from faunadb to fauna.gql
      - Sets fauna.gql as base schema in .graphqlconfig

- 02659b5: Update SvelteKit
- 3e70184: Add new indexes and resolvers

      - resolvers: findCurrentTask, findTasksByDueDate
      - indexes: tasks_by_schedule, tasks_by_due_date
      - Also improves migration page and api endpoint

- 6f8ad11: improve page readability

      - Changes default background and text color

- 634078b: Footer improvements

      - Add background and shadow
      - Relabeled navigation items
      - Increased navigation item siz

- c113f60: add getCurrentTask action
- 025a8f1: use empty task instead of empty object as placeholder
- bc1764e: Base layout improvements

      - Add default page title
      - Move notifications to body root

- 37f80c4: Extend Pool component from Panel instead of Sheet

## 0.2.0

### Minor Changes

- 45dff04: Update to latest version of SvelteKit

### Patch Changes

- 6189099: add faunadb client configuration

## 0.1.4

### Patch Changes

- b8842e9: Replace null check with util

## 0.1.3

### Patch Changes

- 3b08e6d: Lazy fetch task data

## 0.1.2

### Patch Changes

- 1cb6276: Update sveltekit and typescript

## 0.1.1

### Patch Changes

- bb6d97e: Replace doppler with kit cli

  - Adds `kit env run` command
  - Replaces `doppler run` with `kit env run`
  - Fixes pnpm \*:env commands not resolving correct doppler config

  TODO prevent packages and apps from depending on kit cli

## 0.1.0

### Minor Changes

- d0c301d: Update Vite to 3.x

## 0.0.6

### Patch Changes

- 387c766: Mark package as private

## 0.0.5

### Patch Changes

- Update svelte to latest version; removes vite config from svelte.config.js. See for details: https://svelte.dev/blog/whats-new-in-svelte-july-2022
