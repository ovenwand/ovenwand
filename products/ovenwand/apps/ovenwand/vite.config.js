import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig as defineTailwindConfig } from "@ovenwand/design/tailwind.config.js";
import { defineConfig as definePostcssConfig } from "@ovenwand/framework.config/postcss.config.js";

export default defineConfig({
  plugins: [sveltekit()],

  ssr: {
    noExternal: ["@ovenwand/design"],
  },

  css: {
    postcss: definePostcssConfig({
      tailwind: defineTailwindConfig([
        "./node_modules/@ovenwand/**/src/**/*.svelte",
        "./src/**/*.{html,svelte,js}",
      ]),
    }),
  },
});
