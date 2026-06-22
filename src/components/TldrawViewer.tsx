import { Tldraw, parseTldrawJsonFile } from "tldraw";
import "tldraw/tldraw.css";

interface Props {
  src: string;
}

export default function TldrawViewer({ src }: Props) {
  return (
    <Tldraw
      hideUi
      licenseKey={import.meta.env.PUBLIC_TLDRAW_LICENSE_KEY}
      onMount={async (editor) => {
        editor.updateInstanceState({ isReadonly: true });
        editor.user.updateUserPreferences({ colorScheme: "system" });

        try {
          const json = await fetch(src).then((r) => r.text());
          const result = parseTldrawJsonFile({
            schema: editor.store.schema,
            json,
          });
          if (result.ok) {
            editor.loadSnapshot(result.value.getStoreSnapshot());
            editor.zoomToFit({ immediate: true });
          } else {
            console.error("tldraw: failed to parse file", result.error);
          }
        } catch (e) {
          console.error("tldraw: failed to load", src, e);
        }
      }}
    />
  );
}
