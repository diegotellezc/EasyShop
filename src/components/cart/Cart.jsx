import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartProducts, purchaseCart } from '../../store/slices/cart.slice'
import CartProduct from './CartProduct'

const Cart = () => {
    const { isShowCart, products } = useSelector(store => store.cart)
    const {token} = useSelector(store => store.userInfo)

    const dispatch = useDispatch()

    

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
        <section className={`fixed top-0 ${isShowCart && token ? "right-0" : "-right-full"} bg-white pt-[90px] h-screen w-[300px] shadow-xl duration-200 p-3 grid grid-rows-[auto_1fr_auto] z-10`}>
            <h2 className='text-xl font-bold'>Shopping cart</h2>

            {/* Cart products */}
            <section className='overflow-y-auto grid gap-10 py-4 content-start'>
                {
                    products.map(product => <CartProduct key={product.id} product={product} />)
                }
            </section>

            {/* Checkout */}
            <section className='grid grid-cols-2 py-10 border-t-[1px] border-gray-400'>
                <span>Total</span>
                <h4 className='text-end font-bold text-orange text-xl'>${(totalPrice).toFixed(2)}</h4>
                <button onClick={handleClickCheckout} className='w-full bg-happy-yellow hover:bg-happy-yellow-hover transition-colors py-2 text-header-color font-semibold rounded-sm mt-6 col-span-2'>Checkout</button>
            </section>
        </section>
    )
}

export default Cart