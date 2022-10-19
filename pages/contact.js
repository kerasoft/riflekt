import React from 'react'
import { FiMail, FiPhone } from 'react-icons/fi'

const Contact = () => {
  return (
    <div className='flex justify-center items-center py-12 min-h-[72vh] sm:min-h-[80vh] relative'>
      <div className='absolute flex justify-center items-center text-[30vw] lg:text-[22vw] font-bold text-[#2221] inset-0'>Hola!!</div>
      <div className=''>
        <h3 className='justify-center text-[1.35rem] sm:text-2xl flex items-center gap-2 text-slate-600 mb-5'><FiMail /> query.riflekt@gmail.com</h3>
        <h3 className='justify-center text-[1.6rem] sm:text-3xl flex items-center gap-2 text-slate-600'><FiPhone /> +91 63634 82718 </h3>
        <p className='justify-center text-[1.35rem] sm:text-2xl flex items-center gap-2 text-slate-600 mt-5'> #102 Park Ave <br/> Court Rd Kannur <br/> Kerala 670571</p>
      </div>
    </div>
  )
}

export default Contact