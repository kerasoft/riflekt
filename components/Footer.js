import React from 'react'
import StripeImg from '../images/logo-stripe.png'
import Image from 'next/image'
import Link from 'next/link'

export const Footer = () => {
  return (
    <React.Fragment>
        <div className='bg-slate-900 px-2 sm:px-16 pt-12 pb-6 sm:pb-10'>
            <div className='grid grid-cols-1 lg:grid-cols-8 ml-5 md:ml-2 gap-5'>
                <div className='text-[.82rem] font-normal text-gray-200 flex flex-col gap-2'>
                    <h3 className='mb-2 text-gray-400 text-[.85rem] fon-medium  '>COMPANY</h3>
                    <Link href='/about'>About Us</Link>
                    <Link href='/contact'>Contact Us</Link>
                    <Link href='/careers'>Careers</Link>
                    </div>
                <div className='text-[.82rem] font-normal text-gray-200 flex flex-col gap-2'>
                    <h3 className='mb-2 text-gray-400 text-[.85rem] fon-medium'>PRODUCTS</h3>
                    <Link href='/shop?*[_slug=="led"]'>LED Mirrors</Link>
                    <Link href='/shop*[_slug=="smart"]'>SMART Mirrors</Link>
                    {/* <Link href='/shop'>ARANMULA</Link> */}
                </div>
                <div className='text-[.82rem] font-normal text-gray-200 flex flex-col gap-2'>
                    <h3 className='mb-2 text-gray-400 text-[.85rem] fon-medium'>SERVICES</h3>
                    <Link href='/services#installation'>Intallation</Link>
                    <Link href='/services#pick-up'>Store Pickup</Link>
                </div>
                <div className='text-[.82rem] font-normal text-gray-200 flex flex-col gap-2'>
                    <h3 className='mb-2 text-gray-400 text-[.85rem] fon-medium'>POLICIES</h3>
                    <Link href='/privacy'>Privacy Policy</Link>
                    <Link href='/terms'>Terms of service</Link>
                    <Link href='/cancel'>cancellation & Refund</Link>
                </div>
                <div className='lg:col-span-4 order-first lg:order-last mb-4 sm:mb-0'>
                    <div className='flex gap-3 lg:justify-end'>
                        <Link className='' href={'/'}>
                            <h2 className='text-5xl font-bold text-slate-900 bg-[#fefefe] cursor-pointer w-10 h-10 border-[8px] border-rose-600'>X</h2>
                        </Link>
                        <p className='self-end -mb-1 text-[1.2rem] text-gray-400'>Xmoto Motoparts Pvt. Ltd.</p>
                    </div>
                    <div className='hidden sm:flex w-full lg:justify-end mt-16'>
                        <div className='w-[320px] h-[100px]'>
                            <Image src={StripeImg} alt='stripe logo' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='sm:hidden flex w-full lg:justify-end mt-10 px-12'>
                <Image className='' src={StripeImg} alt='stripe logo' />
            </div>
            <small className='block bg-slate-900 pt-2 text-center sm:text-start sm:pl-2 text-slate-500'>2022 &copy; Xmoto Pvt. Ltd. All rights reserved</small>
        </div>
    </React.Fragment>
  )
}
