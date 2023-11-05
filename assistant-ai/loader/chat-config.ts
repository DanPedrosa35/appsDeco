import { AppContext, ChatConfigs } from "../mod.ts";

function loader(_, _req: Request, { Chat }: AppContext): ChatConfigs {
  return Chat;
}

export default loader;
