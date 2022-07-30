# @ovenwand/cli

## 0.2.0

### Minor Changes

- a53e844: add env and feature commands

### Patch Changes

- a53e844: Refactor feature command
- 8149562: add error handling and data parsing to doppler util
- 0fd6e06: add error handling to exec util
- a53e844: split env into subcommands
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
