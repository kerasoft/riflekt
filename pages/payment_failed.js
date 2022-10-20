import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

const PaymentFailed = () => {
  return (
    <div className='text-[red] hero h-[60vh]'>
        <AiFillCloseCircle className='text-5xl sm:text-6xl'/>
        <h1 className='text-3xl text-center sm:text-4xl mt-32'>Payment Failed, try again</h1>
    </div>
  )
}

export default PaymentFailed