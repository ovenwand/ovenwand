import { dirname, join, relative, resolve } from "node:path";
import { readFileSync } from "node:fs";
import { globby } from "globby";
import {
  ROUTES_INPUT_DIRECTORY,
  SERVERLESS_FUNCTION_CONFIG_INPUT_NAME,
  SERVERLESS_FUNCTION_HANDLE_INPUT_NAME,
} from "./config.js";

const __dirname = dirname(new URL(import.meta.url).pathname);

export function getRouteFromFilePath(filePath) {
  return dirname(filePath.replace(ROUTES_INPUT_DIRECTORY, ""));
}

export async function getRoutes() {
  const [configs, functions] = await Promise.all([
    globby(join(ROUTES_INPUT_DIRECTORY, "**", SERVERLESS_FUNCTION_CONFIG_INPUT_NAME)),
    globby(join(ROUTES_INPUT_DIRECTORY, "**", SERVERLESS_FUNCTION_HANDLE_INPUT_NAME)),
  ]);

  return functions.map((functionPath) => {
    const routePath = getRouteFromFilePath(functionPath);
    const configPath = configs.find((config) => config.startsWith(routePath));
    const config = configPath ? JSON.parse(readFileSync(configPath, "utf-8")) : {};

    return {
      id: routePath,

      config: Object.assign(
        {
          runtime: "nodejs18.x",
          launcherType: "Nodejs",
          handler: "+server.js",
        },
        config
      ),

      function: async (req, res) =>
        await (await import(relative(__dirname, resolve(functionPath)))).default(req, res),
    };
  });
}
