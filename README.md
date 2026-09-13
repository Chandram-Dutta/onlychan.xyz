# onlychan.xyz

Chandram Dutta's personal website and blog, built with Astro and Tailwind CSS.

## Development

```sh
bun install
bun --bun run dev --background
```

Use `bun --bun run dev stop`, `status`, or `logs` to manage the background server.

## Build

```sh
bun --bun run build
```

The static site is generated in `dist/`.

## Blog

Add Markdown or MDX posts to `src/content/blogs/` with `title`, `description`,
`pubDate`, and optional `tags` in the frontmatter. Store images in `public/images/`
and reference them as `/images/filename.png`.

Posts appear at `/blog/`, newest first. The homepage shows the latest three.
