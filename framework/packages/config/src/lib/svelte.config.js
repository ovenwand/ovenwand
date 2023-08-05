import { vitePreprocess as preprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-auto";

/** @returns {import('@sveltejs/kit').Config} */
export function defineConfig() {
  return {
    preprocess: preprocess(),

    kit: {
      // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
      // If your environment is not supported or you settled on a specific environment, switch out the adapter.
      // See https://kit.svelte.dev/docs/adapters for more information about adapters.
      adapter: adapter(),
    },
  };
}
