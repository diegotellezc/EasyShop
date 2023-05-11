import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteProductCart } from '../../store/slices/cart.slice'

const CartProduct = ({product}) => {
    const [counter, setCounter] = useState(1)

    const dispatch = useDispatch()

    const handleClickDelete = () => {
        dispatch(deleteProductCart(product.id))
    }

    const handleClickPlus = () => {
        const newCounter = counter + 1
        setCounter(newCounter)
    }
    
    const handleClickLess = () => {
        const newCounter = counter - 1
        if(newCounter > 0) {
            setCounter(newCounter)
        }
    }
    
    

    return (
        <article className='border-[1px] p-2'>
            <section className='grid grid-cols-[auto_1fr_auto] gap-2'>
                <div className='h-[90px] aspect-square row-span-2 p-2'>
                    <img className='h-full w-full object-contain' src={product.product.images[2].url} alt="" />
                </div>
                <h4 className='text-bold'>{product.product.title}</h4>
                <i onClick={handleClickDelete} className='bx bx-trash text-dark-blue hover:text-red-500 cursor-pointer'></i>
                <div className='flex items-center'>
                            <button onClick={handleClickLess} className='border-[1px] py-1 px-2 bg-light-gray hover:bg-happy-yellow-hover'>-</button>
                            <span className='border-y-[1px] py-1 px-3'>{product.quantity}</span>
                            <button onClick={handleClickPlus} className='border-[1px] py-1 px-2 bg-light-gray hover:bg-happy-yellow-hover'>+</button>
                        </div>
            </section>

            <section>
                <h4 className='mt-3 text-end'> Total
                    <span className='ml-2 font-bold text-orange text-xl'> ${(product.quantity * product.product.price).toFixed(2)}</span>
                </h4>
            </section>
        </article>
    )
}

export default CartProduct