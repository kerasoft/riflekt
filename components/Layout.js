import Link from 'next/link'
import React, { useContext, useRef } from 'react'
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { BsChevronCompactDown } from 'react-icons/bs'
import Context from '../context/stateContext'
import useClickOutside from '../hooks/useClickOutside'
import { Cart } from '../components'

export const Layout = ({children}) => {
    const { hamburgerToggle, setHamburgerToggle, showCart, setShowCart} = useContext(Context)

    const wrapperRef = useRef(null)

    useClickOutside(wrapperRef, setHamburgerToggle)

  return (
    <div className='relative'>
        <Cart />
        <div className="w-full h-16 lg:h-32 grid grid-cols-4 items-center bg-[#f7f9f7]">
            <Link href={'/'}>
                <h2 className='col-span-3 text-3xl lg:text-5xl flex-1 ml-8 font-bold text-gray-600 cursor-pointer'>r<span className='text-yellow-400'>ι</span>flεkt</h2>
            </Link>
            <div className='flex justify-end px-8'>
                {/* <Link href={'/'}>
                    <a><AiOutlineWhatsApp size={32} fill='#25D366' /></a>
                </Link> */}
            </div>
        </div >
            <div ref={wrapperRef} className='top-0 text-[.95rem] px-6 md:px-12 sticky shadow-sm bg-[#f7f9f7]'>
                    <div className='h-16 flex items-center font-medium justify-between'>
                        <div className='gap-6 hidden md:flex md:flex-row tracking-wide text-black'>
                            <Link href={'/shop'} >SHOP</Link>
                            <Link href={'/about'} >ABOUT</Link>
                            <Link href={'/contact'} >CONTACT</Link>
                            <Link href={'/newsletter'} >NEWSLETTER</Link>
                        </div>
                        <label className="swap swap-rotate md:hidden flex items-center gap-1">
                            <input type="checkbox" onClick={()=>{setHamburgerToggle(!hamburgerToggle)}} />
                                MENU <BsChevronCompactDown className='font-semibold' size={22}/>
                        </label>
                        <div className='flex gap-4'>
                            {/* <Link href={'/search'} className='text-gray-800'><AiOutlineSearch className='cursor-pointer' size={24}/></Link> */}
                            <Link href={'/'}><a className='text-gray-800'><AiOutlineUser className='cursor-pointer' size={24}/></a></Link>
                            <Link href={'/'}><a className='text-gray-800'><AiOutlineHeart className='cursor-pointer' size={24}/></a>
                            </Link>
                            <div className='relative text-black cursor-pointer' onClick={()=>{setShowCart(true)}}>
                                <AiOutlineShoppingCart className='cursor-pointer' size={24}/>
                                <span className='absolute rounded-full w-5 h-5 font-normal flex place-content-center text-[.8rem] bg-[#f02a34] -top-3 -right-3 text-primary-content'>4</span>
                            </div>
                        </div>
                    </div>
                    <div className={`gap-6 flex flex-col p-8 text-center py-10 tracking-wide text-gray-900 ${hamburgerToggle ? 'md:hidden' : 'hidden'}`}>
                        <Link href={'/shop'} ><a onClick={()=>{setHamburgerToggle(false)}}>SHOP</a></Link>
                        <Link href={'/about'} ><a onClick={()=>{setHamburgerToggle(false)}}>ABOUT</a></Link>
                        <Link href={'/contact'} ><a onClick={()=>{setHamburgerToggle(false)}}>CONTACT</a></Link>
                        <Link href={'/newsletter'} ><a onClick={()=>{setHamburgerToggle(false)}}>NEWSLETTER</a></Link>
                    </div>
            </div>
        <div>
            {children}
        </div>
    </div>
  )
}
