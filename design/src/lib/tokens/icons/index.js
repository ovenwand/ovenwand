/// <reference types="vite/client" />

export const ICONS = import.meta.glob("./**/*.svelte");

export const icons = Object.entries(ICONS)
  .map(([path, icon]) => {
    const segments = path.split("/").filter(Boolean);
    const name = segments[segments.length - 1].replace(".svelte", "");
    return /** @type {[string, () => Promise<{ default: any }>]} */ ([
      name,
      icon,
    ]);
  })
  .reduce((icons, [name, icon]) => {
    icons[name] = icon;
    return icons;
  }, /** @type {Record<string, () => Promise<{ default: any }>>} */ ({}));
