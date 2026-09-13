import { getCollection } from "astro:content";

export async function getBlogPosts() {
    return (await getCollection("blogs")).sort(
        (a, b) =>
            b.data.pubDate.getTime() - a.data.pubDate.getTime() ||
            a.id.localeCompare(b.id),
    );
}
