import React from 'react'

const Cancel = () => {
  return (
    <div className='px-8 container mx-auto py-12'>
        <h1 className='text-3xl font-semibold'>Cancellation and Refund</h1>
        <p className='italic mb-4'>Last updated: October 12, 2022</p>
        <p className='mb-2 text-slate-700'>As we are in the initial stage of business and due to limited couriers enroute, we request that you cancel at least a day before the scheduled start-date, and this helps us refund you in full. You may cancel by phone or online here. If you cancel once the package is already in transit, we have no choice but to deduct an amount for shipping[To & Fro] and any other inconvenience caused, but if shipping charges were included on payment; then we can refund in full[In most cases].</p>

        <p>Cash on delivery will be available soon and for orders opted for COD, two consecutive cancellation will terminate COD permanently. Also COD is only availed after 3 successful orders and registered users.</p>
        
        <h1 className='text-3xl font-semibold mb-4 mt-10'>Return Policy</h1>
        <p>We appreciate if you could return products in proper packaging as it reached you. We take full responsibility of damages happed on transit. We recommend you be physically present and upack before the courier, damages reported otherwise are not compliant. You can return all products within the return period as mentioned in product details page, exceptions for non-returnable products.</p>
    </div>
  )
}

export default Cancel