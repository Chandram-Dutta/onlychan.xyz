// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkBlog from "./src/lib/remark-blog.mjs";
import rehypeBlog from "./src/lib/rehype-blog.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://onlychan.xyz",
  integrations: [mdx()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkBlog],
      rehypePlugins: [
        [rehypeKatex, { strict: "error", throwOnError: true }],
        rehypeBlog,
      ],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
