---
'@ovenwand/monitor.ovenwand.com': patch
'@ovenwand/ovenwand.com': patch
'@ovenwand/tasks.ovenwand.com': patch
'@ovenwand/cli': patch
---

Replace doppler with kit cli

- Adds `kit env run` command
- Replaces `doppler run` with `kit env run`
- Fixes pnpm \*:env commands not resolving correct doppler config

TODO prevent packages and apps from depending on kit cli
