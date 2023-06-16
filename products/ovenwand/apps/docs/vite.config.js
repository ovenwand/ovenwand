/// <reference types="histoire" />

import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig as definePostcssConfig } from "@ovenwand/framework.config/postcss.config.js";
import { defineConfig as defineTailwindConfig } from "@ovenwand/design/tailwind.config.js";

export default defineConfig({
  plugins: [svelte()],

  ssr: {
    noExternal: ["@ovenwand/design"],
  },

  css: {
    postcss: definePostcssConfig({
      tailwind: defineTailwindConfig([
        "../../packages/service/src/**/*.{html,svelte,js}",
        "./src/**/*.{html,svelte,js}",
        "./node_modules/@ovenwand/design/src/**/*.{html,svelte,js}",
      ]),
    }),
  },
});
