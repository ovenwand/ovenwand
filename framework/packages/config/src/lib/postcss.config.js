import imports from "postcss-import";
import nesting from "tailwindcss/nesting/index.js";
import tailwindcss from "tailwindcss";

export function defineConfig({ tailwind } = {}) {
  return {
    plugins: [imports(), nesting(), tailwindcss(tailwind)],
  };
}
