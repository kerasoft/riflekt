import React from 'react'
import { SanityImage } from '../lib/client'
import Image from 'next/image'
import Link from 'next/link'

export const Product = ({item: {name, price, image, slug}}) => {
  return (
    <Link href={`/product/${slug.current}`}>
      <div className='p-4 cursor-pointer'>
          {/* <img src={urlFor(image && image[0])} /> */}
          <Image {...SanityImage(image[0])} alt={name} />
          <h2 className='text-slate-600'>{name}</h2>
          <p className='text-rose-700 text-lg'>Price: &nbsp;₹{price}.00</p>
      </div>
    </Link>
  )
}
