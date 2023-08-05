import { env } from "node:process";
import { createServer } from "node:http";
import dotenv from "dotenv";
import { getRoutes } from "../lib/router.js";
import { error, normalizeError, serializeError } from "./lib/helpers.js";
import { matchRoute, validateRoute } from "./lib/router.js";

dotenv.config();

const server = createServer((req, res) => {
  getRoutes()
    // Find matching routes
    .then((routes) => matchRoute(req.url, routes))
    // Validate the first match
    .then((matches) => validateRoute(req, matches[0]))
    // Call the route handler
    .then((route) => route.function(req, res))
    // Normalize any error that occurs
    .catch((e) => normalizeError(e))
    // Handle the error response
    .catch(({ status, error: e }) => {
      console.error(e);

      res.writeHead(status ?? 500, { "Content-Type": "application/json" });

      res.end(serializeError(e));

      return error;
    });
});

const port = env.PORT ?? 3000;

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
