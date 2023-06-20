import { error } from "./helpers.js";

export function matchRoute(url, routes) {
  return routes.filter((route) => route.id === url);
}

export function validateRoute(route) {
  if (!route) {
    const e = new Error("Not found");
    e.code = "NOT_FOUND";
    throw error(404, e);
  }

  return route;
}
