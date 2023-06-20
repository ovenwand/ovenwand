import { join, resolve } from "node:path";
import { accessSync, cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { globbySync } from "globby";

const ROUTES_SOURCE_DIRECTORY = "src/routes";
const OUTPUT_DIRECTORY = ".vercel/output";

const outputDirectory = resolve(OUTPUT_DIRECTORY);

/**
 * Clean output directory
 */

try {
  accessSync(outputDirectory);
  rmSync(outputDirectory, { recursive: true });
} catch (error) {
  if (error?.code === "ENOENT") {
    // Nothing to clean
  } else {
    throw error;
  }
}

/**
 * Build Vercel config
 */
const vercelConfig = {
  version: 3,
};

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(join(outputDirectory, "config.json"), JSON.stringify(vercelConfig, null, 2));

/**
 * Build serverless functions
 */
const SERVERLESS_FUNCTION_HANDLE_NAME = "server.js";
const SERVERLESS_FUNCTION_CONFIG_NAME = ".vc-config.json";

// Copy serverless functions
mkdirSync(resolve(".vercel/output"), { recursive: true });
// cpSync("./src/routes/", ".vercel/output/functions/", { recursive: true });

const configs = globbySync(join(ROUTES_SOURCE_DIRECTORY, "**/+config.server.json"));
const functions = globbySync(join(ROUTES_SOURCE_DIRECTORY, "**/+server.js"));

for (const functionPath of functions) {
  // Get route from function path
  const routePath = functionPath.replace(ROUTES_SOURCE_DIRECTORY, "").replace("/+server.js", "");
  const configPath = configs.find((config) => config.startsWith(routePath));
  const outputPath = resolve(outputDirectory, `functions/${routePath}.func`);

  // Prepare function output directory
  mkdirSync(outputPath, { recursive: true });

  // Generate function config
  const config = configPath ? JSON.parse(readFileSync(configPath, "utf-8")) : {};

  config.runtime ??= "nodejs18.x";
  config.launcherType ??= "Nodejs";
  config.handler ??= SERVERLESS_FUNCTION_HANDLE_NAME;

  writeFileSync(join(outputPath, SERVERLESS_FUNCTION_CONFIG_NAME), JSON.stringify(config, null, 2));

  // Copy function handler
  cpSync(functionPath, join(outputPath, config.handler));
}
