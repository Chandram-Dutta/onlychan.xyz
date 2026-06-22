// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  site: "https://onlychan.xyz",
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
    // tldraw + @astrojs/react pull in React 19's react-dom/client, whose named
    // exports (createRoot/hydrateRoot) live behind `module.exports = require(...)`.
    // Pre-bundling forces esbuild to expose them as real ESM named exports.
    optimizeDeps: {
      include: ["react", "react-dom", "react-dom/client", "react/jsx-runtime"],
    },
  },

  integrations: [react(), mdx()],
});
