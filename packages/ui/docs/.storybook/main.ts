export default {
  framework: {
    "name": "@storybook/svelte-vite",
    "options": {}
  },

  addons: [
    '@ovenwand/toolchain.plugins.storybook/preset',
    '@ovenwand/toolchain.plugins.storybook/preset-bundle',
    '@ovenwand/toolchain.plugins.storybook/preset-svelte',
  ],
}
