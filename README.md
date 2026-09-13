# Astro Starter Kit: Minimal

```sh
bun create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## Blog posts

Posts live in `src/content/blogs/` as Markdown or MDX files. The filename becomes
the URL: `my-post.mdx` is published at `/blog/my-post/`.

```yaml
---
title: "My post"
description: "A short summary for the homepage and blog archive."
pubDate: 2026-06-27
tags: ["engineering", "notes"]
---
```

All posts appear at `/blog/`, newest first; the homepage shows the latest three.
Posts are published at build time, including future-dated entries.
Put local images in `public/images/` and reference them with
`![Description](/images/my-image.png)`.

Posts support tables, syntax-highlighted code, `$inline math$`, `$$` display math,
and fenced `mermaid` diagrams. Start sections at `##`; legacy posts with `#`
headings are shifted down one level during rendering so the page title remains
the only top-level heading.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun run dev --background` | Starts the background dev server at `localhost:4321` |
| `bun run dev status`      | Shows background server status                   |
| `bun run dev stop`        | Stops the background dev server                  |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
