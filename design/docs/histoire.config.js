import { defineConfig } from "histoire";
import { HstSvelte } from "@histoire/plugin-svelte";

export default defineConfig({
  plugins: [HstSvelte()],
  setupFile: "/src/histoire.setup.js",
  tree: {
    file: (file) =>
      file.title.split("/").map((segment) => {
        segment = segment.replace(/-/, " ");
        segment = segment.charAt(0).toUpperCase() + segment.slice(1);
        return segment;
      }),
    order: (a, b) => {
      const order = ["Design", "Usage", "Playground"];

      if (order.includes(a) && order.includes(b)) {
        return order.indexOf(a) - order.indexOf(b);
      }

      return a.localeCompare(b);
    },
    groups: [
      {
        id: "about",
        title: "About",
        include: (file) => file.path.startsWith("src/about"),
      },
      {
        id: "tokens",
        title: "Tokens",
        include: (file) => file.path.startsWith("src/tokens"),
      },
      {
        id: "patterns",
        title: "Patterns",
        include: (file) => file.path.startsWith("src/patterns"),
      },
    ],
  },
});
