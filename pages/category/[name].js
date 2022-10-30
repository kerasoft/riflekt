import React from 'react'
import { Products } from '../../components'
import { client } from '../../lib/client'

const Category = ({category}) => {

  return (
    <Products products={category}/>
  )
}


export const getStaticPaths = async () => {
  const query = `*[_type == 'category']{
    name
  }`
  const category = await client.fetch(query)
  const paths = category.map(item=>({
      params: {
          name: item.name
      }
  }))

  return {
      paths,
      fallback: 'blocking'
  }
}

export const getStaticProps = async ({params:{name}}) => {
  const query = `*[_type == 'part' && category == '${name}']`
  const category = await client.fetch(query)
  
  return {
    props: {
      category
    }
  }
}


export default Category