import { LazyHydrate, RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import { RowBlogContent } from '../Blog'
import { PageContentQueryFragment } from './PageContentQueryFragment.gql'
import { RowButtonLinkList } from './RowButtonLinkList/RowButtonLinkList'
import { RowColumnOne } from './RowColumnOne/RowColumnOne'
import { RowColumnThree } from './RowColumnThree/RowColumnThree'
// import { RowColumnTwo } from './RowColumnTwo/RowColumnTwo'
import { RowContentLinks } from './RowContentLinks/RowContentLinks'
import { RowHeroBanner } from './RowHeroBanner/RowHeroBanner'
import { RowLinks } from './RowLinks/RowLinks'
import { RowProduct } from './RowProduct/RowProduct'
import { RowQuote } from './RowQuote/RowQuote'
import { RowRendererFragment } from './RowRenderer.gql'
import { RowServiceOptions } from './RowServiceOptions/RowServiceOptions'
import { RowSpecialBanner } from './RowSpecialBanner/RowSpecialBanner'
// import { RowHeroBannerCopy } from './RowHeroBannerCopy/RowHeroBannerCopy'

type ContentTypeRenderer = TypeRenderer<PageContentQueryFragment['pages'][0]['content'][0]>

const defaultRenderer: Partial<ContentTypeRenderer> = {
  RowColumnOne,
  // RowColumnTwo,
  RowColumnThree,
  RowHeroBanner,
  // RowHeroBannerCopy,
  RowSpecialBanner,
  RowQuote,
  RowBlogContent,
  RowButtonLinkList,
  RowServiceOptions,
  RowContentLinks,
  RowProduct,
  RowLinks,
}

export type PageProps = RowRendererFragment & {
  renderer?: Partial<ContentTypeRenderer>
  loadingEager?: number
}

export function RowRenderer(props: PageProps) {
  const { content, renderer, loadingEager = 2 } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as ContentTypeRenderer

  // console.log('content test', content)
  return (
    <>
      {content?.map((item, index) => (
        <LazyHydrate key={item.id} hydrated={index < loadingEager ? true : undefined}>
          <div className={item?.identity ? item?.identity : `${item.__typename}`}>
            <RenderType renderer={mergedRenderer} {...item} />
          </div>
        </LazyHydrate>
      ))}
    </>
  )
}
