import { HttpError } from "../../../utils/http.ts";
import { AppContext } from "../../mod.ts";
import { getCartCookie, setCartCookie } from "../../utils/cart.ts";
import { RemoveCoupon } from "../../utils/graphql/queries.ts";
import {
  CheckoutFragment,
  RemoveCouponMutation,
  RemoveCouponMutationVariables,
} from "../../utils/graphql/storefront.graphql.gen.ts";

const action = async (
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<Partial<CheckoutFragment>> => {
  const { storefront } = ctx;
  const cartId = getCartCookie(req.headers);

  if (!cartId) {
    throw new HttpError(400, "Missing cart cookie");
  }

  const data = await storefront.query<
    RemoveCouponMutation,
    RemoveCouponMutationVariables
  >({
    variables: { checkoutId: cartId },
    ...RemoveCoupon,
  });

  const checkoutId = data.checkout?.checkoutId;
  setCartCookie(ctx.response.headers, checkoutId);

  return data.checkout ?? {};
};

export default action;
