import React, {useContext, useRef } from 'react'
import Context from '../context/stateContext'
import useClickOutside from '../hooks/useClickOutside'
import { AiFillCloseCircle, AiOutlineHeart } from 'react-icons/ai'
import { BsChevronLeft } from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image'


export const WishList = () => {
    const wrapperRef = useRef(null)
    const { 
        wishList,
        showWishList,
        setShowWishList,
        setWishList,
        } = useContext(Context)

    useClickOutside(wrapperRef, setShowWishList)
  return (
    <div className={`inset-0 bg-[#222a] z-10 ${showWishList ? 'fixed' : 'hidden'}`}>
        <div ref={wrapperRef} className='absolute w-full sm:w-[540px] right-0 bg-[#fefefe] top-0 bottom-0 shadow-md px-1 sm:px-4 overflow-scroll'>
            <div onClick={()=>{setShowWishList(false)}} className='text-[1.2rem] inline-flex items-center gap-2 cursor-pointer mt-5'>
                <BsChevronLeft size={22} fill='#f02a34'/>
                Your Wish List
                <span className='text-[#292]'>[ {wishList.length} ]</span>
            </div>

            <div className='flex flex-col min-h-[84vh]'>
                {wishList.length < 1 && (<div className='flex flex-col place-items-center mt-12 lg:mt-24'>
                <AiOutlineHeart className='text-[6rem] lg:text-[7.5rem] text-[#f02a34]' />
                <p className='text-[1.4rem] lg:text-2xl mt-4'>Wishlist is empty</p>
                <Link href='/'><a onClick={()=>{setShowWishList(false)}} className='mt-8 text-[#fefefe] px-10 py-3 text-[1.1rem] lg:text-[1.2rem] bg-[#f02a34] font-[500] rounded-md'>Window shop</a></Link>
            </div>)}


            {wishList.length >= 1 && (<div className='px-2 flex-1'>
              {wishList.map((item, i)=>(
                <div className='mt-10 sm:pl-5' key={item._id}>
                  <div className='flex gap-4 sm:gap-12'>
                    <Link href={`/product/${item?.slug.current}`}>
                      <div onClick={()=>{setShowWishList(false)}} className="w-[6.4rem] sm:w-36 cursor-pointer">
                        <Image className='rounded-md' {...item.nextImage} alt={item.name}/>
                      </div>
                    </Link>
                    <div className='self-center'>
                      <p className='text-base sm:text-lg'>{item.name}</p>
                      <p className='text-[1.2rem] sm:text-[1.4rem]'>₹ {item.price}</p>
                      <button className='bg-[#f02a34] px-4 py-2  mt-2 text-[#fefefe]'>Add to cart</button>
                    </div>
                      <div onClick={()=>{
                        let updatedList = wishList.filter((itm, idx)=>{
                          if(idx !== i) return itm
                        })
                        setWishList(updatedList)
                      }} className='ml-auto cursor-pointer'>< AiFillCloseCircle size={24} fill='#222'/></div>
                  </div>
                </div>
              ))}
            </div>)}
        </div>
        </div>
    </div>
  )
}

