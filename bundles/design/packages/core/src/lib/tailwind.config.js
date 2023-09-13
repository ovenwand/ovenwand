import typography from "@tailwindcss/typography";
import { colors } from "./tokens/colors.js";

/** @param {string[]} content */
export function defineConfig(content) {
  return {
    content: [...content],

    presets: [presetColors(), presetTypography()],

    theme: {
      colors,
    },
  };
}

/** @returns {import('tailwindcss').Config} */
export function presetColors() {
  return {
    content: [],
    theme: {
      colors,
    },
  };
}

/** @returns {import('tailwindcss').Config} */
export function presetTypography() {
  return {
    content: [],
    plugins: [typography],
  };
}
