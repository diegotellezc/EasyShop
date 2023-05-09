import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProductCart } from '../../store/slices/cart.slice'

const ProductCard = ({product}) => {
    const dispatch = useDispatch()

    const handleClickAddProduct = (e) => {
        e.preventDefault()
        dispatch(addProductCart({productId: product.id, quantity: 1}))
    }
    

    return (
        <article className='border-[1px] border-gray-300 rounded-md'>
            <div className='p-4 border-b-[1px] border-gray-300 h-52
            overflow-hidden'>
                <img className='h-full w-full object-contain' src={product.images[0].url} alt={product.title} />
            </div>

            <section className='p-4 relative'>
                <h4 className='text-gray-400 font-bold'>{product.brand}</h4>
                <h3 className='text-sm ml-2 font-bold'>{product.title}</h3>
                <h4 className='text-gray-400 font-bold mt-4'>Price</h4>
                <span className='text-sm ml-2 font-bold'>${product.price}</span>

                <button onClick={handleClickAddProduct} className='absolute right-3 bottom-2 bg-red-600 text-white  grid place-items-center rounded-full w-[40px] aspect-square hover:bg-red-800 transition-colors'>
                    <i className='bx bx-cart-alt text-xl'></i>
                </button>

                <Link to={`/products/${product.id}`} className='absolute right-16 top-1/2 bg-red-600 text-white  grid place-items-center rounded-full max-w-max p-4 hover:bg-red-800 transition-colors'>
                        See details
                </Link>
            </section>

        </article>
    )
}

export default ProductCard
