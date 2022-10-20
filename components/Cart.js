import React, { useContext, useRef, useState } from 'react'
import Context from '../context/stateContext'
import useClickOutside from '../hooks/useClickOutside'
import { BsCartX, BsChevronLeft } from 'react-icons/bs'
import { FiShoppingBag } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'
import { AiFillCloseCircle } from 'react-icons/ai'
import getStripe from '../lib/getStripe'
import toast from 'react-hot-toast'

export const Cart = () => {
    const [isLoading, setIsLoading] = useState(false)
    const wrapperRef = useRef(null)
    const { 
      showCart, 
      setShowCart, 
      cartItems, 
      setCartItems, 
      totalQty, 
      setTotalQty, 
      totalPrice, 
      setTotalPrice 
    } = useContext(Context)

    useClickOutside(wrapperRef, setShowCart)

    const handleCheckOut = async () => {
      setIsLoading(true)
      const stripe = await getStripe()

      const res = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(cartItems)
      })

      if(res.statusCode === 500) return

      const data = await res.json()

      toast.loading('Redirecting...')
      stripe.redirectToCheckout({sessionId: data.id})
      setIsLoading(false)
    }

  return (
    <div className={`inset-0 bg-[#222a] z-10 ${showCart ? 'fixed' : 'hidden'}`}>
        <div ref={wrapperRef} className='absolute w-full sm:w-[540px] right-0 bg-[#fefefe] top-0 bottom-0 shadow-md px-1 sm:px-4 overflow-scroll'>
            <div className="flex justify-between mt-5">
              <div onClick={()=>{setShowCart(false)}} className='text-[1.15rem] sm:text-[1.2rem] inline-flex items-center gap-2 cursor-pointer'>
                <BsChevronLeft size={22} fill='#f02a34'/>
                Your cart
                <span className='text-[#292]'>[ {totalQty} ]</span>
              </div>
              <span onClick={()=>{
                if(cartItems.length > 0) {
                  setTotalQty(0)
                  setTotalPrice(0)
                  setCartItems([])
                }
              }} className='text-[1.5rem] sm:text-[1.6rem] mr-2 cursor-pointer'><BsCartX fill='#f02a34'/></span>
            </div>
          
          <div className='flex flex-col min-h-[84vh]'>
            {cartItems.length < 1 && (<div className='flex flex-col place-items-center mt-12 lg:mt-24'>
              <FiShoppingBag className='text-[5rem] sm:text-[7rem]' />
              <p className='text-[1.3rem] sm:text-2xl mt-4'>Cart is empty</p>
              <Link href='/'><a onClick={()=>{setShowCart(false)}} className='mt-8 text-[#fefefe] px-10 py-3 text-[1.1rem] sm:text-[1.2rem] bg-[#f02a34] font-[500] rounded-md'>Continue Shopping</a></Link>
            </div>)}
            {cartItems.length >= 1 && (<div className='px-2 flex-1'>
              {cartItems.map((item, i)=>(
                <div className='mt-10 sm:pl-5' key={item._id}>
                  <div className='flex gap-4 sm:gap-10'>
                    <Link href={`/product/${item?.slug.current}`}>
                      <div onClick={()=>{setShowCart(false)}} className="w-[6.4rem] sm:w-36 cursor-pointer">
                        <Image className='rounded-md' {...item.nextImage} alt={item.name}/>
                      </div>
                    </Link>
                    <div className='self-center'>
                      <p className='text-[.85rem] sm:text-lg'>{item.name}</p>
                      <div className='text-[1.4rem] inline-flex w-[8rem] sm:w-[8.65rem] justify-between items-center mt-4'>
                        <span onClick={()=>{
                          let updatedCart = cartItems.map((itm, idx)=>{
                            if((idx == i) && (itm.quantity > 1)) {
                              setTotalQty(totalQty - 1)
                              setTotalPrice(totalPrice - itm.price)
                              return {
                                ...itm,
                                quantity: itm.quantity - 1
                              }
                            }else {
                              return itm
                            }
                          })
                          setCartItems(updatedCart)
                        }} className='cursor-pointer p-[.8rem] sm:p-[.95rem] py-[2px] sm:py-1 border-[1px] text-[red] border-gray-400'>-</span>
                        <span className='text-[1.15rem] sm:text-[1.3rem]'>{item.quantity}</span>
                        <span onClick={()=>{
                          let updatedCart = cartItems.map((itm, idx)=>{
                            if(idx == i) {
                              setTotalQty(totalQty + 1)
                              setTotalPrice(totalPrice + Number(itm.price))
                              return {
                                ...itm,
                                quantity: itm.quantity + 1
                              }
                            }else{
                              return itm
                            }
                          })
                          setCartItems(updatedCart)
                        }} className='cursor-pointer p-[.8rem] sm:p-[.95rem] py-[2px] sm:py-1 border-[1px] text-[green] border-gray-400'>+</span>
                      </div>
                    </div>
                      <div onClick={()=>{
                        let updatedCart = cartItems.filter((itm, idx)=>{
                          if(idx !== i) return itm
                        })
                        setTotalQty(totalQty - item.quantity)
                        setTotalPrice(totalPrice - (item.quantity * item.price))
                        setCartItems(updatedCart)
                      }} className='ml-auto cursor-pointer'>< AiFillCloseCircle size={24} fill='#222'/></div>
                  </div>
                </div>
              ))}
            </div>)}
            {cartItems.length >= 1 && (<div>
            <div className='px-8 font-[600] text-[1.1rem] sm:text-[1.2rem] text-gray-700 flex justify-center gap-5'>
              <p className='font-[400]'>Total Amount:</p>
              <p>₹ {totalPrice}</p>
            </div>
            <button onClick={handleCheckOut} className='w-[80%] sm:w-10/12 block my-4 sm:my-4 mx-auto py-3 text-xl rounded-md bg-[#f02a34] text-[#fefefe]'>{isLoading ? 'Please wait...' : 'Pay Now'}</button>
            </div>)}
          </div>
        </div>
    </div>
  )
}
