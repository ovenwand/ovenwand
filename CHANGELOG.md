# @ovenwand/project

## 0.3.2

### Patch Changes

- Fixed release tagging trying to checkout to merge branch instead of master

## 0.3.1

### Patch Changes

- Move release tagging to 'closed' action

## 0.3.0

### Minor Changes

- Add turborepo
- Remove port from vite server configuration
- Add build/dev/preview scripts as wrappers for turbo

## 0.2.1

### Patch Changes

- Add github action for changeset management
- Remove release command

## 0.2.0

### Minor Changes

- Add APP_VERSION environment variable to monitor.ovenwand.com and taks.ovenwand.com
- Add default host ('\*.ovenwand.wtf') and port (80) to apps
- Add scripts that pass the doppler environment to commands

## 0.1.10

### Patch Changes

- Add release script

## 0.1.9

### Patch Changes

- Add js files to lint-staged commands
- Add .vervcel_build_output to .prettierignore

## 0.1.8

### Patch Changes

- Improve ignore-build-step
  - Ignore tags on HEAD when looking for previous tag
  - Exclude previous tag rev when checking diff

## 0.1.7

### Patch Changes

- Added tag pattern matching to ignore-build-step script

## 0.1.6

### Patch Changes

- Added changeset for version management
