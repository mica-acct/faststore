import { useLocation } from '@reach/router'
import { SuspenseViewport } from '@vtex/store-ui'
import React, { lazy } from 'react'
import type { FC } from 'react'
import type { SearchParamsState } from '@vtex/store-sdk'

import { usePixelSendEvent } from '../../sdk/pixel/usePixelSendEvent'
import { SearchProvider } from '../../sdk/search/Provider'
import AboveTheFold from './AboveTheFold'
import BelowTheFoldPreview from './BelowTheFoldPreview'
import Seo from './Seo'
import type { ServerCollectionPageQueryQuery } from '../../{StoreCollection.slug}/__generated__/ServerCollectionPageQuery.graphql'
import type { BrowserCollectionPageQueryQuery } from '../../{StoreCollection.slug}/__generated__/BrowserCollectionPageQuery.graphql'

const belowTheFoldPreloader = () => import('./BelowTheFold')
const BelowTheFold = lazy(belowTheFoldPreloader)

export interface SearchViewProps {
  pageContext: {
    canonicalPath: string
  }
  data: ServerCollectionPageQueryQuery | BrowserCollectionPageQueryQuery
  searchParams: SearchParamsState
  pageInfo: { size: number }
}

const SearchView: FC<SearchViewProps> = (props) => {
  const { data, searchParams, pageInfo } = props
  const location = useLocation()

  usePixelSendEvent(() => {
    const { term } = searchParams
    const pageType = term ? 'fullText' : 'plp'

    return [
      {
        type: 'vtex:pageView',
        data: {
          pageUrl: window.location.href,
          pageTitle: document.title,
          referrer: document.referrer,
          accountName: process.env.GATSBY_STORE_ID!,
          pageType,
        },
      },
      {
        type: 'vtex:internalSiteSearchView',
        data: {
          accountName: process.env.GATSBY_STORE_ID!,
          pageUrl: window.location.href,
          pageTitle: document.title,
          referrer: document.referrer,
          term: term ?? '',
          results: data.vtex.productSearch?.recordsFiltered ?? 0,
          pageType,
        },
      },
    ]
  }, location.href)

  return (
    <SearchProvider
      searchParams={searchParams}
      data={data}
      pageInfo={{
        size: pageInfo.size,
        total: Math.ceil(
          (data.vtex.productSearch?.recordsFiltered ?? 0) / pageInfo.size
        ),
      }}
    >
      <Seo {...props} />
      <AboveTheFold {...props} />
      <SuspenseViewport
        fallback={<BelowTheFoldPreview {...props} />}
        preloader={belowTheFoldPreloader}
      >
        <BelowTheFold {...props} />
      </SuspenseViewport>
    </SearchProvider>
  )
}

export default SearchView
