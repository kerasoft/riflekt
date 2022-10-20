import React from 'react'
import { SanityImage } from '../lib/client'
import Image from 'next/image'
import Link from 'next/link'

export const Product = ({item: {name, price, image, slug}}) => {
  return (
    <Link href={`/product/${slug.current}`}>
      <div className='p-4'>
          {/* <img src={urlFor(image && image[0])} /> */}
          <Image {...SanityImage(image[0])} alt={name} />
          <h2>{name}</h2>
          <p>Price: ₹ {price}.00</p>
      </div>
    </Link>
  )
}
