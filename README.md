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

## Cloudflare deployment

The site is configured for Cloudflare Workers Static Assets at `onlychan.xyz`.
The domain must be an active zone in the Cloudflare account used to deploy.

Cloudflare Workers Builds deploys pushes to `main` from
`Chandram-Dutta/onlychan.xyz`. Build settings: repository root `/`, Bun `1.4.2`
(`BUN_VERSION`), build command `bun --bun run build`, and deploy command
`bun --bun wrangler deploy`. Preview branch builds are disabled.

For a manual deployment:

```sh
bun --bun wrangler login
bun run deploy
```

Cloudflare Web Analytics is enabled for `onlychan.xyz` with **Enable with JS
Snippet installation** selected in the dashboard. `SiteLayout.astro` includes
the site's public beacon token on production builds. Keep automatic injection
off to avoid duplicate tracking. Local development does not load the beacon.

## Blog

Add Markdown or MDX posts to `src/content/blogs/` with `title`, `description`,
`pubDate`, and optional `tags` in the frontmatter. Store images in `public/images/`
and reference them as `/images/filename.png`.

Posts appear at `/blog/`, newest first. The homepage shows the latest three.

## Link previews

Every page includes Open Graph and Twitter card metadata. Blog posts use their
frontmatter title, description, and publication date, with a 1200×630 PNG title
card generated at `/og/blog/<post-id>.png` during each build. No external image
service or manual image creation is needed for new posts. The bundled JetBrains
Mono font is distributed under the license in `src/assets/fonts/OFL.txt`.
