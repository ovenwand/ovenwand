/// <reference types="histoire" />

import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig as definePostcssConfig } from "@ovenwand/framework.config/postcss.config.js";
import { defineConfig as defineTailwindConfig } from "../src/tailwind.config.js";

export default defineConfig({
  plugins: [svelte()],

  css: {
    postcss: definePostcssConfig({
      tailwind: defineTailwindConfig([
        "../src/**/*.{html,svelte,js}",
        "./src/**/*.{html,svelte,js}",
      ]),
    }),
  },
});
