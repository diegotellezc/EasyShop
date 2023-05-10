import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeIsShowCart, getCartProducts, purchaseCart } from '../../store/slices/cart.slice'
import CartProduct from './CartProduct'

const Cart = () => {
    const { isShowCart, products } = useSelector(store => store.cart)
    const {token} = useSelector(store => store.userInfo)

    const dispatch = useDispatch()

    const handleClickChangeShowCart = () => {
        dispatch(changeIsShowCart())
    }

    const handleClickCheckout = () => {
        dispatch(purchaseCart())
    }
    

    const totalPrice = products.reduce((acc, curr) => acc + (curr.quantity * curr.product.price), 0)
    
    useEffect(() => {
        if(isShowCart) {
            dispatch(getCartProducts())
        }
    }, [isShowCart])


    return (
        <section className={`fixed top-0  ${isShowCart && token ? "right-0" : "-right-full"} bg-white h-screen w-[300px] shadow-xl duration-200 p-3 grid grid-rows-[auto_1fr_auto]`}>
            <h2 className='text-xl font-bold'>Shopping cart</h2>
            <i onClick={handleClickChangeShowCart} className='bx bx-x absolute top-2 right-3 text-2xl hover:text-red-500 cursor-pointer'></i>

            {/* Cart products */}
            <section className='overflow-y-auto grid gap-10 py-4 content-start'>
                {
                    products.map(product => <CartProduct key={product.id} product={product} />)
                }
            </section>

            {/* Checkout */}
            <section className='grid grid-cols-2 py-10 border-t-[1px] border-gray-400'>
                <span>Total</span>
                <h4 className='text-end'>${totalPrice}</h4>
                <button onClick={handleClickCheckout} className='w-full bg-red-500 transition-colors py-2 hover:bg-red-600 text-white rounded-sm mt-6 col-span-2'>Checkout</button>
            </section>
        </section>
    )
}

export default Cart