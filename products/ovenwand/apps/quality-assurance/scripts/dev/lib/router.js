import { error } from "./helpers.js";

export function matchRoute(url, routes) {
  return routes.filter((route) => route.id === url);
}

export function validateRoute(req, route) {
  if (!route) {
    const e = new Error(`Route not found for URL "${req.url}"`);
    e.code = "NOT_FOUND";
    throw error(404, e);
  }

  return route;
}
