# @ovenwand/tasks.ovenwand.com

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
