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
        <main className='grid grid-cols-[auto,_1fr] w-full'>

            <aside className='w-[200px] pt-12 border-[1px] bg-light-gray'>
                <ul className='p-4'>
                    <li className='cursor-pointer' onClick={handleClickCategory} data-category={0}>All</li>
                    {
                        categories.map(({id, name}) => <li onClick={handleClickCategory} className='cursor-pointer' data-category={id} key={id}>{name}</li>)
                    }
                </ul>
            </aside>


            <section className='pt-12 mx-2'>
                {/* Search */}
                <form className='h-[45px] max-w-2xl mx-auto px-4' onSubmit={handleSubmit}>
                    <div className='flex w-full h-full border-[1px] rounded-md overflow-hidden'>
                        <input className='w-full py-3  outline-none pl-4 placeholder-slate-400' id="productName" type="text" placeholder='What are you looking for?' />
                        <button className='bg-happy-yellow hover:bg-happy-yellow-hover h-full aspect-square'>
                            <i className='bx bx-search font-semibold text-2xl border-0' ></i>
                        </button>
                    </div>
                </form>

                {/* Products */}
                <section className='grid gap-8 py-6 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_320px))] justify-center mx-auto'>
                    {
                        productsByName.map(product => <ProductCard key={product.id} product={product} />)
                    }
                </section>

            </section>
        </main>
    )
}

export default Home
