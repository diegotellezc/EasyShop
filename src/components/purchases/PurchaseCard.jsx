import React from 'react'
import { formatDateDDMMYYYY } from '../../utils/date'

const PurchaseCard = ({ purchase } ) => {

    return (
        <article className='grid grid-cols-2 items-center gap-2 border-[1px] rounded-md p-2 text-sm sm:text-base'>
            <section className='flex gap-2 items-center'>
                <div className='h-[50px] aspect-square sm:h-[80px]'>
                    <img className='h-full w-full object-contain' loading='lazy' src={purchase.product.images[2].url} alt="" />
                </div>
                <h4>{purchase.product.title}</h4>
            </section>

            <section className='flex flex-col sm:flex-row sm:justify-self-end sm:gap-6 md:gap-12 sm:mr-2 md:mr-6 text-center gap-3'>
                <span className='text-gray-400'>{formatDateDDMMYYYY(purchase.createdAt) }</span>

                <div>
                    <span className='p-2 border-[1px] border-gray-400'>{purchase.quantity}</span>
                </div>

                <h4 className='font-bold text-orange sm:text-xl'>${(purchase.quantity * purchase.product.price).toFixed(2)}</h4>
            </section>
        </article>
    )
}

export default PurchaseCard