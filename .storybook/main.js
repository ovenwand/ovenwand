async function getSvelteConfig() {
  const module = await import('../svelte.config.js');
  return module.default;
}

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf"
  ],
  "framework": "@storybook/svelte",
  "core": {
    "builder": "storybook-builder-vite"
  },
  async svelteOptions() {
    const svelteConfig = await getSvelteConfig();

    return {
      "preprocess": svelteConfig.preprocess,
    };
  },
  async viteFinal(config) {
    const svelteConfig = await getSvelteConfig();

    config.resolve.dedupe = ['@storybook/client-api'];

    config.resolve.alias = {
      ...svelteConfig.kit.vite.resolve.alias,
      ...config.resolve.alias,
    };

    return config;
  },
};