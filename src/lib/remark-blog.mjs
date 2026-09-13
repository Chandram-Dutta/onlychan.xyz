/**
 * Reserve h1 for the page title and keep Mermaid out of syntax highlighting.
 * Posts already starting at h2 retain their original hierarchy.
 */
export default function remarkBlog() {
  return (tree) => {
    const nodes = [];
    function collect(node) {
      nodes.push(node);
      node.children?.forEach(collect);
    }
    collect(tree);

    if (nodes.some((node) => node.type === "heading" && node.depth === 1)) {
      for (const node of nodes) {
        if (node.type === "heading") node.depth = Math.min(node.depth + 1, 6);
      }
    }

    for (const node of nodes) {
      if (node.type !== "code" || node.lang !== "mermaid") continue;
      const source = node.value;
      node.type = "paragraph";
      node.children = [{ type: "text", value: source }];
      node.data = { hName: "pre", hProperties: { className: ["mermaid"] } };
      delete node.value;
      delete node.lang;
      delete node.meta;
    }
  };
}
