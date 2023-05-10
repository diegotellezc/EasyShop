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

            <div className='relative p-4 border-b-[1px] border-gray-300 h-52
            overflow-hidden group'>
                <img className='h-full w-full object-contain group group-hover:opacity-30 duration-500' src={product.images[0].url} alt={product.title} />

                <Link to={`/products/${product.id}`} className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-happy-yellow hover:bg-happy-yellow-hover text-header-color font-semibold text-lg grid place-items-center rounded-full max-w-max py-3 px-6 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 hover:scale-110'>
                            See details
                </Link>
            </div>


            <section className='p-4 relative'>
                <h4 className='text-gray-400 font-bold'>{product.brand}</h4>
                <Link to={`/products/${product.id}`} className='text-xl  font-bold hover:underline hover:text-dark-blue' title={product.title}>{product.title}</Link>

                <div className='flex items-center gap-2 mt-4'>
                    <h4 className='text-gray-400 text-lg font-bold'>Price</h4>
                    <span className='text-xl ml-2 font-bold text-orange'>${product.price}</span>
                </div>
                

                <button onClick={handleClickAddProduct} className='absolute right-3 bottom-2 bg-happy-yellow hover:bg-happy-yellow-hover  text-black  grid place-items-center rounded-full w-[40px] aspect-square hover:scale-110 transition-all'>
                    <i className='bx bx-cart-alt text-xl'></i>
                </button>

                
            </section>

        </article>
    )
}

export default ProductCard
