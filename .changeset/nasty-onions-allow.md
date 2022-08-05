---
'@ovenwand/cli': patch
---

Make createCommand more user-friendly

- Moves command object to context
- Automatically determines project from path
- Adds project to context
- Properly resolve env/feature command arguments
