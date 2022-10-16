import React, { useContext, useEffect } from 'react'
import { client, SanityImage } from '../../lib/client'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import Image from 'next/image'
import Context from '../../context/stateContext'
import toast from 'react-hot-toast'

const ProductDetails = ({product}) => {
    const { name, image, details, tags, price } = product
    const {qty, setQty, addItemsToCart, wishList, setWishList } = useContext(Context)
    // console.log(cartItems)

    useEffect(()=>{
        setQty(1)
    },[product.slug]) //eslint-disable-line

    const nextImage = SanityImage(image[0])

    let ifInWishList = wishList.find(item=>item._id === product._id)

    return (
        <div className='mb-12 sm:mb-24 lg:mb-32'>
            <div className='flex flex-col m-10 gap-8 container mx-auto lg:flex-row px-6'>
                <div className='lg:w-2/6 relative'>
                    <Image {...nextImage} alt={name}/>
                    <div onClick={()=>{
                        if(ifInWishList){
                            let updatedList = wishList.filter(item=>item._id !== product._id)
                            setWishList(updatedList)
                        }else{
                            toast.success(`${product.name} is on wishlist`)
                            setWishList([...wishList, {...product, nextImage: nextImage}])
                        }
                    }} className='absolute cursor-pointer z-5 top-5 right-5 bg-[#fefefe] rounded-full p-[5px]'>
                        {ifInWishList ? <AiFillHeart className='text-[#f02a34]' size={32}/> : <AiOutlineHeart className='text-[#f02a34]' size={32}/> }
                    </div>
                </div>
                <div className='flex justify-center flex-1'>
                    <div className='min-w-3/4'>
                        <h1 className='text-[1.45rem] md:text-2xl font-semibold'>{name}</h1>
                        <p className='mt-2'>{details}</p>
                        <div className='mt-8'>
                            {tags.map((tag,i)=>(
                                <span className='inline-block text-[.9rem] border-[2px] p-2 border-black my-2 mr-2 lg:mr-4 rounded-full px-4' key={i}>{tag.toUpperCase()}</span>
                            ))}
                        </div>
                        <div className='mt-12 text-[.95rem]'>
                            <p className='mb-2'>Customize size</p>
                            <input className='rounded-md w-24 p-2 py-3 mr-4 border-[2px] placeholder:text-gray-300 border-gray-400' placeholder='Width(in)'/>
                            <input className='rounded-md w-24 p-2 py-3 border-[2px] placeholder:text-gray-300 border-gray-400' placeholder='Height(in)'/>
                        </div>
                        <p className='mt-12 text-3xl md:text-[2rem] lg:text-4xl font-bold text-gray-800'>₹ {price}</p>

                        <div className='mt-6 text-[1.4rem] lg:text-2xl inline-flex w-[8.65rem] lg:w-36 justify-between items-center'>
                            <span onClick={()=>{if(qty>1)setQty(qty - 1)}} className='cursor-pointer p-[.95rem] py-1 lg:p-2 lg:px-4 border-[1px] text-[red] border-gray-400'>-</span>
                            <span className='text-[1.3rem]'>{qty}</span>
                            <span onClick={()=>{setQty(qty + 1)}} className='cursor-pointer p-[.95rem] py-1 lg:p-2 lg:px-4 border-[1px] text-[green] border-gray-400'>+</span>
                        </div>
                        <div className='mt-8 flex flex-col sm:flex-row gap-5'>
                            <button onClick={()=>addItemsToCart(product, qty, nextImage)} className='border-[2px] border-black p-3 px-12 font-medium'>Add to cart</button>
                            <button className='border-[2px] border-black text-primary-content bg-black p-3 px-12 font-medium'>Buy now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == 'product']{
        slug{
            current
        }
    }`
    const products = await client.fetch(query)
    const paths = products.map(product=>({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params:{slug}}) => {
    const query = `*[_type == 'product' && slug.current == '${slug}']`
    const product = await client.fetch(query)

    return {
        props: {
            product: product[0]
        }
    }
}

export default ProductDetails