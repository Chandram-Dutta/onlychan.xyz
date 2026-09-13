/**
 * Make horizontally scrollable content reachable without a pointing device.
 * Wrap tables rather than changing their display mode, preserving semantics.
 */
export default function rehypeBlog() {
  return (tree) => {
    function walk(parent) {
      for (let index = 0; index < (parent.children?.length ?? 0); index++) {
        const node = parent.children[index];
        if (node.type !== "element") continue;
        walk(node);
        if (node.tagName === "table") {
          parent.children[index] = {
            type: "element",
            tagName: "div",
            properties: {
              className: ["table-scroll"],
              tabIndex: 0,
              role: "region",
              ariaLabel: "Scrollable table",
            },
            children: [node],
          };
        } else if (
          node.tagName === "pre" ||
          node.properties?.className?.includes("katex-display")
        ) {
          const isDiagram = node.properties?.className?.includes("mermaid");
          node.properties = {
            ...node.properties,
            tabIndex: 0,
            role: "region",
            ariaLabel: isDiagram
              ? "Scrollable diagram"
              : node.tagName === "pre"
                ? "Scrollable code"
                : "Scrollable equation",
          };
        }
      }
    }
    walk(tree);
  };
}
