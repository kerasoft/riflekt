import React from 'react'
import { Product } from './Product'

export const Products = ({products}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center items-center px-6 lg:px-12 sm:p-6 gap-6 container mx-auto'>{products.map(item=><Product key={item._id} {...{item}}/>)}</div>
  )
}
