import React, {useContext, useEffect} from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import Context from '../context/stateContext'

const PaymentSuccessfull = () => {

    const {setCartItems, setTotalQty, setTotalPrice} = useContext(Context)

    useEffect(()=>{
        setCartItems([])
        setTotalQty(0)
        setTotalPrice(0)
    },[])//eslint-disable-line

  return (
    <div className='text-[green] hero h-[60vh]'>
        <AiFillCheckCircle className='text-5xl sm:text-6xl'/>
        <h1 className='text-3xl sm:text-4xl mt-32'>Payment Successfull</h1>
    </div>
  )
}

export default PaymentSuccessfull