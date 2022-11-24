# @ovenwand/cli

## 0.3.7

### Patch Changes

- Updated dependencies [be569a9]
- Updated dependencies [1b121fd]
  - @ovenwand/config@0.1.7
  - @ovenwand/kit.lint@0.0.2
  - @ovenwand/kit.scaffold@0.1.2

## 0.3.6

### Patch Changes

- Updated dependencies [538e7fa]
  - @ovenwand/config@0.1.6
  - @ovenwand/kit.lint@0.0.2
  - @ovenwand/kit.scaffold@0.1.2

## 0.3.5

### Patch Changes

- fb89c85: Normalize environment variables and usages

## 0.3.4

### Patch Changes

- 524beb9: Pass exit code to parent node process
- 839e139: Add commitlint util
- 9b60b81: move commitlint config

      - replace arg with params
      - automatically copy default config

- 836b514: Add test dir to install command
- Updated dependencies [829efb2]
  - @ovenwand/kit.lint@0.0.2

## 0.3.3

### Patch Changes

- Updated dependencies [92dfc52]
  - @ovenwand/kit.scaffold@0.1.2

## 0.3.2

### Patch Changes

- 7ce49ae: Optimise file commands
- Updated dependencies [c9e8781]
- Updated dependencies [d5b9126]
- Updated dependencies [594ba62]
- Updated dependencies [28e2765]
  - @ovenwand/kit.scaffold@0.1.1

## 0.3.1

### Patch Changes

- 494f870: Add lint command
- Updated dependencies [494f870]
  - @ovenwand/kit.lint@0.0.1

## 0.3.0

### Minor Changes

- a1f6423: Migrate from js to ts

### Patch Changes

- 2229254: Add scaffolding
- Updated dependencies [79058d1]
- Updated dependencies [d3f3ac6]
- Updated dependencies [2229254]
  - @ovenwand/kit.scaffold@0.1.0
  - @ovenwand/config@0.1.5

## 0.2.6

### Patch Changes

- 54e1e0d: Fix dev, build, preview command not passing arguments when no app is passed

## 0.2.5

### Patch Changes

- 7d22dcb: Remove commitlint from commit command
- 506603d: Add release command
- f6ee86d: Replace commit command options with an argument

## 0.2.4

### Patch Changes

- 8003d66: Fix missing spread operator in createFeatureCommand

## 0.2.3

### Patch Changes

- 6f082b0: Allow passing args to turbo commands

      - Pass args from dev/build/preview commands to turbo
      - Split up turbo args and command args

## 0.2.2

### Patch Changes

- 51b2e61: Cleanup code smells

## 0.2.1

### Patch Changes

- 58fb285: Add turbo utility and refactor dev, build and preview commands
- 85aec87: Make createCommand more user-friendly

  - Moves command object to context
  - Automatically determines project from path
  - Adds project to context
  - Properly resolve env/feature command arguments

- bb6d97e: Replace doppler with kit cli

  - Adds `kit env run` command
  - Replaces `doppler run` with `kit env run`
  - Fixes pnpm \*:env commands not resolving correct doppler config

  TODO prevent packages and apps from depending on kit cli

- 2ac8d16: Prevent passing unused project and env to doppler run

## 0.2.0

### Minor Changes

- a53e844: add env and feature commands

### Patch Changes

- 8149562: add error handling and data parsing to doppler util
- 0fd6e06: add error handling to exec util
- 5cdc967: mute json import warning
  - replace json import with createRequire

## 0.1.0

### Minor Changes

- 0df3c19: - Add install command
  - Allows adding scripts in .kit/scripts
  - Allows adding git hooks in .kit/hooks
  - Update commit command
  - Refactor and split utils.js
  - Add utility to provide context when creating cli commands
  - Separates cli entry from src/kit.js into src/index.js

### Patch Changes

- 8765100: - Add dependency to commitlint and lint-staged
  - Add lint-staged and commitlint to commit command
- 4a3f93d: Add run command
- 3be441d: - Fixed changesets not being added when run outside workspace root
- 7488407: Run commands from anywhere in a workspace
- e60abf9: Expose `changeset` and `turbo` binaries
- 59516be: Rename framework to kit
