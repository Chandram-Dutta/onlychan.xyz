import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import satori from "satori";
import sharp from "sharp";
import { getBlogPosts } from "../../lib/blog";

export const prerender = true;

export async function getStaticPaths() {
    const posts = await getBlogPosts();
    return [
        { params: { slug: "home" }, props: { title: "Chandram Dutta", label: "Software engineer / Researcher / Builder" } },
        { params: { slug: "blog" }, props: { title: "Notes & experiments", label: "Software / Engineering / Machine learning" } },
        ...posts.map((post) => ({
            params: { slug: `blog/${post.id}` },
            props: {
                title: post.data.title,
                label: `Blog / ${post.data.pubDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}`,
            },
        })),
    ];
}

// Bundle the font with the source so builds need no external font service.
const font = readFile("src/assets/fonts/JetBrainsMono-Regular.ttf");

export const GET: APIRoute = async ({ props }) => {
    const { title, label } = props as { title: string; label: string };
    const svg = await satori({
        type: "div",
        props: {
            style: {
                display: "flex", flexDirection: "column", width: "100%", height: "100%",
                background: "#202023", color: "#f4f4f5", padding: "64px 72px",
                fontFamily: "JetBrains Mono", borderTop: "8px solid #a3e635",
            },
            children: [
                { type: "div", props: { style: { fontSize: 24, color: "#a3e635" }, children: "onlychan.xyz" } },
                { type: "div", props: {
                    style: { display: "flex", flexGrow: 1, alignItems: "center", fontSize: title.length > 90 ? 44 : title.length > 55 ? 52 : 62, lineHeight: 1.22, letterSpacing: "-2px" },
                    children: title,
                } },
                { type: "div", props: {
                    style: { display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid #52525b", fontSize: 19, color: "#a1a1aa" },
                    children: [
                        { type: "span", props: { children: label } },
                        { type: "span", props: { children: "Chandram Dutta" } },
                    ],
                } },
            ],
        },
    }, {
        width: 1200,
        height: 630,
        fonts: [{ name: "JetBrains Mono", data: await font, weight: 400, style: "normal" }],
    });
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
