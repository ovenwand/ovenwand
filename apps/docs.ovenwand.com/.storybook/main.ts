export default {
  // Storybook 7 (storyStoreV7) doesn't support svelte csf yet.. See: https://github.com/storybookjs/storybook/issues/16673
  // stories: ['../src/**/*.stories.{mdx,js,ts,jsx,tsx,svelte}'],

  framework: {
    "name": "@storybook/svelte-vite",
    "options": {}
  },

  addons: [
    '@ovenwand/toolchain.plugins.storybook/preset',
    '@ovenwand/toolchain.plugins.storybook/preset-svelte',
    '@ovenwand/toolchain.plugins.storybook/preset-composition',
  ],
}
