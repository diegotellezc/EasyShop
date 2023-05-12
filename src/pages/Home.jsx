import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/home/ProductCard'
import { axiosEcommerce } from '../utils/configAxios'
import LoaderHome from '../components/home/LoaderHome'


const Home = () => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState(null)
    const [productName, setProductName] = useState("")
    const [currentCategory, setCurrentCategory] = useState(0)
    const [showCategories, setShowCategories] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const newProductName = e.target.productName.value
        setProductName(newProductName)
    }

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };
    
    const productsByName = useMemo(() => {
        return products?.filter(product => product.title.toLowerCase().includes(productName.toLowerCase()))
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
        <main className='flex w-full mt-[60px] min-h-screen'>

            <aside className='w-[200px] pt-12 border-[1px] bg-light-gray hidden md:block'>
                <button onClick={toggleCategories}
                    className='border-b-2 text-2xl p-4 flex items-center gap-2 hover:scale-105'>
                    <h2>Categories</h2>
                    <i className={`bx bx-chevron-down ${showCategories ? 'rotate-180' : ''}`}></i>
                </button>

                <ul className={`transition-all duration-500 ${
                    showCategories ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                        <li className='cursor-pointer text-lg p-4 hover:bg-happy-yellow hover:text-xl'
                        onClick={handleClickCategory}
                        data-category={0}
                        > All </li>


                        {
                            categories.map(({ id, name }) => (
                                <li
                                    onClick={handleClickCategory}
                                    className='cursor-pointer text-lg p-4 hover:bg-happy-yellow hover:text-xl'
                                    data-category={id}
                                    key={id}
                                >
                                    {name}
                                </li>
                            ))
                        }
                </ul>
            </aside>


            <section className='pt-12 mx-2 flex-grow'>
                {/* Search box */}
                <form className='h-[45px] max-w-2xl mx-auto px-4 mb-4 md:mb-8' onSubmit={handleSubmit}>
                    <div className='flex w-full h-full border-[1px] rounded-md overflow-hidden'>
                        <input className='w-full py-3  outline-none pl-4 placeholder-slate-400' id="productName" type="text" placeholder='What are you looking for?' />
                        <button className='bg-happy-yellow hover:bg-happy-yellow-hover h-full aspect-square'>
                            <i className='bx bx-search font-semibold text-2xl border-0' ></i>
                        </button>
                    </div>
                </form>

                <ul className='transition-all flex flex-wrap gap-2 justify-center items-center duration-500 overflow-hidden md:hidden'>
                        <li className='cursor-pointer border-[1px] rounded-md text-sm py-2 px-4 hover:bg-happy-yellow'
                        onClick={handleClickCategory}
                        data-category={0}
                        > All </li>

                        {
                            categories.map(({ id, name }) => (
                                <li
                                    onClick={handleClickCategory}
                                    className='border-[1px] cursor-pointer rounded-md text-sm py-2 px-4 hover:bg-happy-yellow'
                                    data-category={id}
                                    key={id}
                                >
                                    {name}
                                </li>
                            ))
                        }
                </ul>

                {/* Products */}
                {
                    products === null ? (
                    <LoaderHome />
                ) : (
                    <section className='grid gap-8 py-6 mb-8 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_320px))] justify-center mx-auto'>
                    {
                        productsByName.map(product => <ProductCard key={product.id} product={product} />)
                    }
                </section>
                )
            }
                

            </section>
        </main>
    )
}

export default Home
