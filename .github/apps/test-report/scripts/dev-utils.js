export function error(status, error) {
  return {
    type: "error",
    status,
    error,
  };
}

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

export function normalizeError(e) {
  const type = e.type ?? "error";
  const status = e.status ?? 500;
  const error = e.error ?? e;
  throw { type, status, error };
}

export function serializeError(e) {
  return JSON.stringify(
    {
      code: e.code ?? "INTERNAL_SERVER_ERROR",
      message: e.message ?? "Internal server error",
      stack: e.stack ?? "",
    },
    null,
    2
  );
}
