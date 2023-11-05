import type { App, AppContext as AC } from "deco/mod.ts";
import manifest from "./manifest.gen.ts";
import type { ImageWidget } from "../admin/widgets.ts";
import { Suggestion } from "../commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";

export interface AboutBusiness {
  name: string;

  /**
   * @title Store segment
   * @description Tell us what is the segment your store ?
   */
  segment: string[];

  /**
   * @title Address
   * @description Tell us where is location your store with logradouro, state, city and country.
   */
  address: string[];

  /**
   * @title State Available for Delivery
   * @description Tell us what states is available for delivery
   */
  deliveryStates: string[];

  /**
   * @title Contact
   * @description Tell us what phone numbers is available for service
   */
  contact: string[];

  /**
   * @title Payment methods available
   * @description What payment methods is available, if card is then, specific the flag is available ?
   */
  payment: string[];

  /**
   * @title FAQ
   * @description Describe what is FAQ
   */
  faq: {
    question: string;
    answer: string;
  }[];
}

export interface ChatConfigs {
  /**
   * @title Assistant Icon
   * @description What is Assistant Icon that you want ?
   */
  icon: ImageWidget;
}

/** @title AssistantIA */
export interface State {
  /**
   * @title ChatGPT Api Key
   * @description Create account in ChatGpt and access https://platform.openai.com/account/api-keys
   */
  keyChatGPT: string;

  /**
   * @title Business About
   * @description Tell us about your business
   */
  AboutBusiness: AboutBusiness;

  /**
   * @title Chat Configurations
   */
  Chat: ChatConfigs;

  Integration: Resolved<Suggestion | null>;
}
/**
 * @title assistant-ai
 */
export default function App(
  { AboutBusiness, Chat, Integration, keyChatGPT }: State,
) {
  return { manifest, state: { AboutBusiness, Chat, Integration, keyChatGPT } };
}

export type AppContext = AC<ReturnType<typeof App>>;
