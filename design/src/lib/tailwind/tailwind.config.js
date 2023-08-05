import typography from "@tailwindcss/typography";
import { colors } from "../tokens/colors.js";

/**
 * @param {string[]} content
 * @returns {import('tailwindcss').Config}
 */
export function defineConfig(content = []) {
  return {
    content: [...content],

    presets: [
      // TODO this doesn't work, for some reason. figure out why, and remove the colors from the
      // theme configuration below.
      // presetOvenwandColors(),
      presetOvenwandTypography(),
      presetOvenwandViewport(),
    ],

    theme: {
      colors,
    },
  };
}

/** @returns {import('tailwindcss').Config} */
// export function presetOvenwandColors() {
//   return {
//     content: [],
//     theme: {
//       colors,
//     },
//   };
// }

/** @returns {import('tailwindcss').Config} */
export function presetOvenwandTypography() {
  return {
    content: [],
    plugins: [typography],
  };
}

/** @returns {import('tailwindcss').Config} */
export function presetOvenwandViewport() {
  return {
    content: [],
    theme: {
      extend: {
        height: {
          viewport: "100dvh",
        },
        maxHeight: {
          viewport: "100dvh",
        },
        minHeight: {
          viewport: "100dvh",
        },
        width: {
          viewport: "100dvw",
        },
        maxWidth: {
          viewport: "100dvw",
        },
        minWidth: {
          viewport: "100dvw",
        },
      },
    },
  };
}
