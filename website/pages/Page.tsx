import { Head } from "$fresh/runtime.ts";
import { Section } from "deco/blocks/section.ts";
import { ComponentMetadata } from "deco/engine/block.ts";
import { context } from "deco/live.ts";
import {
  usePageContext as useDecoPageContext,
  useRouterContext,
} from "deco/routes/[...catchall].tsx";
import { JSX } from "preact";
import Events from "../components/Events.tsx";
import LiveControls from "../components/_Controls.tsx";

/**
 * @title Sections
 * @label hidden
 * @changeable true
 */
export type Sections = Section[];

/**
 * @titleBy name
 * @label rootHidden
 */
export interface Props {
  name: string;
  path?: string;
  sections: Sections;
}

export function renderSection(section: Props["sections"][number]) {
  const { Component, props } = section;

  return <Component {...props} />;
}

/**
 * @title Page
 */
function Page({ sections }: Props): JSX.Element {
  const metadata = useDecoPageContext()?.metadata;
  const routerCtx = useRouterContext();
  const pageId = pageIdFromMetadata(metadata);

  return (
    <>
      <LiveControls
        site={{ id: context.siteId, name: context.site }}
        page={{ id: pageId, pathTemplate: routerCtx?.pagePath }}
        flags={routerCtx?.flags}
      />
      <Events flags={routerCtx?.flags ?? []} />
      {sections.map(renderSection)}
    </>
  );
}

export function Preview({ sections }: Props) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Events flags={[]} />
      {sections.map(renderSection)}
    </>
  );
}

const PAGE_NOT_FOUND = -1;
export const pageIdFromMetadata = (
  metadata: ComponentMetadata | undefined,
) => {
  if (!metadata) {
    return PAGE_NOT_FOUND;
  }

  const { resolveChain, component } = metadata;
  const pageResolverIndex =
    (resolveChain.findLastIndex((chain) =>
      chain.type === "resolver" && chain.value === component
    )) || PAGE_NOT_FOUND;

  const pageParent = pageResolverIndex > 0
    ? resolveChain[pageResolverIndex - 1]
    : null;

  return pageParent?.value ?? PAGE_NOT_FOUND;
};

export default Page;
