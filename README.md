# Merry-Crosstmas Secret Santa

# Website

[online demo](https://santa.samuelmartineau.com)

## Dev

Requires Node.js >= 22.12.

```sh
npm run install:all   # npm ci in the server and client packages
npm run dev:server    # API on http://localhost:5000
REACT_APP_API=http://localhost:5000 npm run dev:client
npm test              # server (Jest) + client (Vitest) tests
npm run build:client  # production build in packages/merry-crosstmas-client/build
```
