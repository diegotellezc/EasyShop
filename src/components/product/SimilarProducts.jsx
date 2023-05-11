import React, { useEffect, useState } from 'react'
import { axiosEcommerce } from '../../utils/configAxios'
import ProductCard from '../home/ProductCard'

const SimilarProducts = ({ categoryId, productId }) => {
    const [similarProducts, setSimilarProducts] = useState([])

    useEffect(() => {
        axiosEcommerce.get(`products/?categoryId=${categoryId}`)
        .then((res) => {
            const otherProducts = res.data.filter(product => product.id !== productId)
            setSimilarProducts(otherProducts)
        })
        .catch((err) => console.log(err))
    }, [categoryId, productId])
    

    return (
        <section >
            <h2 className='text-red-500 font-bold text-xl md:text-2xl mt-6'>Discover similar products</h2>
        
            <section className='grid gap-8 py-6 mb-8 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_320px))] justify-center mx-auto'>
                {
                    similarProducts.map(product => <ProductCard key={product.id} product={product} />)
                }
            </section>
        </section>
    )
}

export default SimilarProducts
