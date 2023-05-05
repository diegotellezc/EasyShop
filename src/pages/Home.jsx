import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/home/ProductCard'
import { axiosEcommerce } from '../utils/configAxios'

const Home = () => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [productName, setProductName] = useState("")
    const [currentCategory, setCurrentCategory] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        const newProductName = e.target.productName.value
        setProductName(newProductName)
    }
    
    const productsByName = useMemo(() => {
        return products.filter(product => product.title.toLowerCase().includes(productName.toLowerCase()))
    }, [products, productName])
    
    const handleClickCategory = (e) => {
        setCurrentCategory(+e.target.dataset.category)
    }

    useEffect(() => {
        axiosEcommerce.get("categories")
        .then((res) => setCategories(res.data))
        .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if(currentCategory === 0)
        axiosEcommerce.get("products")
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err))
    }, [currentCategory])

    useEffect(() => {
        if(currentCategory){
            axiosEcommerce.get(`products?categoryId=${currentCategory}`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err))
        }
    }, [currentCategory])

    return (
        <main className='px-2'>
            <form onSubmit={handleSubmit}>
                <div>
                    <input id="productName" type="text" placeholder='What are you looking for?' />
                    <button>
                        <i className='bx bx-search' ></i>
                    </button>
                </div>

                <ul>
                    <li className='cursor-pointer' onClick={handleClickCategory} data-category={0}>All</li>
                    {
                        categories.map(({id, name}) => <li onClick={handleClickCategory} className='cursor-pointer' data-category={id} key={id}>{name}</li>)
                    }
                </ul>

            </form>

            <section className='grid gap-8 py-6'>
                {
                    productsByName.map(product => <ProductCard key={product.id} product={product} />)
                }
            </section>
        </main>
    )
}

export default Home
