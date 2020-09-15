/** @jsx jsx */
import { FC } from 'react'
import { jsx, Grid } from '@vtex/store-ui'

import { ProductSummary_SyncProductFragment } from '../__generated__/ProductSummary_syncProduct.graphql'
import { ProductSummary } from '../ProductSummary'

interface Props {
  items: Array<ProductSummary_SyncProductFragment | undefined | null>
  pageSizes?: number[]
  variant: string
}

const ShelfPage: FC<Props> = ({ items, pageSizes, variant }) => (
  <Grid
    variant={`${variant}.container`}
    gap={2}
    columns={pageSizes}
    sx={{ width: '100%' }}
  >
    {items.map((item) => (
      <ProductSummary key={item!.productId!} product={item!} />
    ))}
  </Grid>
)

export default ShelfPage
