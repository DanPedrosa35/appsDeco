import { Markdown } from "../components/Markdown.tsx";

export { default } from "../../assistantai/mod.ts";

export const Preview = await Markdown(
  new URL("../../assistantai/README.md", import.meta.url).href,
);
