import { Markdown } from "../components/Markdown.tsx";

export { default } from "../../assistant-ai/mod.ts";

export const Preview = await Markdown(
  new URL("../../assistant-ai/README.md", import.meta.url).href,
);
