/**
 * Warning: This is an autogenerated file.
 *
 * Changes in this file won't take effect and will be overwritten
 */

// Base Types
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
type Maybe<T> = T | null | undefined
type Scalars = {
  Boolean: boolean
  String: string
  Float: number
  Int: number
}

// Operation related types
export type SearchPageQueryQueryVariables = Exact<{
  query: Maybe<Scalars['String']>
  map: Maybe<Scalars['String']>
  fullText: Maybe<Scalars['String']>
  staticPath: Scalars['Boolean']
  selectedFacets: Maybe<Vtex_SelectedFacetInput[]>
  orderBy?: Maybe<Scalars['String']>
}>

export type SearchPageQueryQuery = {
  vtex: {
    productSearch: Maybe<{
      titleTag: Maybe<string>
      recordsFiltered: Maybe<number>
      products: Maybe<
        Array<
          Maybe<{
            productId: Maybe<string>
            productName: Maybe<string>
            linkText: Maybe<string>
            items: Maybe<
              Array<
                Maybe<{
                  itemId: Maybe<string>
                  images: Maybe<
                    Array<
                      Maybe<{
                        imageUrl: Maybe<string>
                        imageText: Maybe<string>
                      }>
                    >
                  >
                }>
              >
            >
          }>
        >
      >
    }>
    facets: Maybe<{
      breadcrumb: Maybe<
        Array<Maybe<{ href: Maybe<string>; name: Maybe<string> }>>
      >
      facets: Maybe<
        Array<
          Maybe<{
            name: Maybe<string>
            type: Maybe<Vtex_FilterType>
            values: Maybe<
              Array<
                Maybe<{
                  key: Maybe<string>
                  name: Maybe<string>
                  value: Maybe<string>
                  selected: Maybe<boolean>
                  quantity: number
                  values: Maybe<
                    Array<
                      Maybe<{
                        key: Maybe<string>
                        name: Maybe<string>
                        value: Maybe<string>
                        selected: Maybe<boolean>
                        quantity: number
                        values: Maybe<
                          Array<
                            Maybe<{
                              key: Maybe<string>
                              name: Maybe<string>
                              value: Maybe<string>
                              selected: Maybe<boolean>
                              quantity: number
                            }>
                          >
                        >
                      }>
                    >
                  >
                }>
              >
            >
          }>
        >
      >
    }>
  }
}

// Query Related Code

export const SearchPageQuery = {
  query:
    'query SearchPageQuery($query: String, $map: String, $fullText: String, $staticPath: Boolean!, $selectedFacets: [VTEX_SelectedFacetInput!], $orderBy: String = "OrderByScoreDESC") {\n  vtex {\n    productSearch(from: 0, to: 9, hideUnavailableItems: true, productOriginVtex: true, simulationBehavior: skip, orderBy: $orderBy, query: $query, map: $map, fullText: $fullText, selectedFacets: $selectedFacets) @include(if: $staticPath) {\n      products {\n        productId\n        productName\n        description\n        linkText\n        items {\n          itemId\n          images {\n            imageUrl\n            imageText\n          }\n          sellers {\n            sellerId\n            commertialOffer {\n              AvailableQuantity\n              Price\n              ListPrice\n            }\n          }\n        }\n      }\n      titleTag\n      recordsFiltered\n    }\n    facets(query: $query, map: $map, fullText: $fullText, selectedFacets: $selectedFacets, operator: or, behavior: "Static") @include(if: $staticPath) {\n      breadcrumb {\n        href\n        name\n      }\n      facets {\n        name\n        type\n        values {\n          key\n          name\n          value\n          selected\n          quantity\n          values: children {\n            key\n            name\n            value\n            selected\n            quantity\n            values: children {\n              key\n              name\n              value\n              selected\n              quantity\n            }\n          }\n        }\n      }\n    }\n  }\n}\n',
  sha256Hash:
    'c853364c908f50af7accea5d23245e878d6c3ede1440e794a4e67fa50e73255b',
  operationName: 'SearchPageQuery',
}
