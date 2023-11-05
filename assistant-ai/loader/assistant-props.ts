import type { Product } from "../../commerce/types.ts";
import { AppContext } from "../mod.ts";

/**
 * @title Assitant Props
 */
const loader = (
  _req: Request,
  ctx: AppContext,
): Promise<Product[] | null> => {
  const state = ctx;

  return state;
};

export default loader;