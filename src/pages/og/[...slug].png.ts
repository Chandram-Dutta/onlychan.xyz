import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "fs";
import { join } from "path";

const interBold = readFileSync(join(process.cwd(), "src/fonts/Inter-Bold.ttf"));
const interRegular = readFileSync(
  join(process.cwd(), "src/fonts/Inter-Regular.ttf"),
);

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");
  return [
    {
      params: { slug: "default" },
      props: {
        title: "Chandram Dutta",
        subtitle: "Software Developer & Student",
      },
    },
    ...posts.map((post) => ({
      params: { slug: post.id },
      props: { title: post.data.title, subtitle: post.data.description },
    })),
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const { title, subtitle } = props as { title: string; subtitle: string };

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(ellipse 80% 80% at 10% 20%, rgba(139, 92, 246, 0.3), transparent)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(ellipse 70% 70% at 90% 80%, rgba(244, 114, 182, 0.25), transparent)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(ellipse 60% 60% at 50% 90%, rgba(34, 211, 238, 0.2), transparent)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(ellipse 50% 50% at 85% 15%, rgba(251, 191, 36, 0.2), transparent)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "60px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: title.length > 40 ? "48px" : "64px",
                      fontWeight: 700,
                      fontFamily: "Inter",
                      color: "#ffffff",
                      marginBottom: "20px",
                      lineHeight: 1.2,
                      maxWidth: "1000px",
                    },
                    children: title,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "28px",
                      fontFamily: "Inter",
                      fontWeight: 400,
                      color: "#a1a1aa",
                      maxWidth: "800px",
                      lineHeight: 1.4,
                    },
                    children:
                      subtitle.length > 100
                        ? subtitle.slice(0, 100) + "..."
                        : subtitle,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "24px",
                      fontFamily: "Inter",
                      fontWeight: 400,
                      color: "#71717a",
                      marginTop: "40px",
                    },
                    children: "onlychan.xyz",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: interBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Inter",
          data: interRegular,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
