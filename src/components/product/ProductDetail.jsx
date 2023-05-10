import React, { useEffect, useState } from 'react'
import { axiosEcommerce } from '../../utils/configAxios'
import SimilarProducts from './SimilarProducts'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addProductCart } from '../../store/slices/cart.slice'

const stylePositionImages = {
    "0": "-ml-[0%]",
    "1": "-ml-[100%]",
    "2": "-ml-[200%]"
}


const ProductDetail = ({productId}) => {
    const [productData, setProductData] = useState()
    const [counter, setCounter] = useState(1)
    const [imageToShow, setImageToShow] = useState(0)

    const dispatch = useDispatch()

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

    const handleClickAddToCart = () => {
        dispatch(addProductCart({quantity: counter, productId: productData.id }))
    }
    
    const nextImage = () => {
        const newImagePosition = imageToShow + 1
        if(newImagePosition <= 2){
            setImageToShow(newImagePosition)
        } else {
            setImageToShow(0)
        }
    }

    const previousImage = () => {
        const newImagePosition = imageToShow - 1
        if(newImagePosition >= 0){
            setImageToShow(newImagePosition)
        } else {
            setImageToShow(2)
        }
    }
    


    useEffect(() => {
        axiosEcommerce.get(`products/${productId}`)
        .then((res) => setProductData(res.data))
        .catch((err) => console.log(err))
    }, [productId])



    return (
    <section className='mt-[60px]'>
        <section className='flex gap-2 items-center py-4'>
                <Link to={"/"}>Home</Link>
                <div className='h-[7px] aspect-square bg-sad-yellow rounded-full'></div>
                <span className='font-bold'>{productData?.title}</span>
        </section>


        <section className='grid gap-6 sm:grid-cols-2 sm:items-center max-w-[1000px] mx-auto'>
            {/* Slider */}
            <section className='overflow-hidden relative'>
                <section className={`flex w-[300%] ${stylePositionImages[imageToShow]} duration-300`}>
                    <div className='h-[300px w-[calc(100%_/_3)] p-4'>
                        <img className='h-full w-full object-contain' src={productData?.images[0].url} alt={productData?.title} />
                    </div>

                    <div className='h-[300px] w-[calc(100%_/_3)] p-4'>
                        <img className='h-full w-full object-contain' src={productData?.images[1].url} alt={productData?.title} />
                    </div>

                    <div className='h-[300px] w-[calc(100%_/_3)] p-4'>
                        <img className='h-full w-full object-contain' src={productData?.images[2].url} alt={productData?.title} />
                    </div>
                </section>

                <i onClick={previousImage} className='bx bx-chevron-left absolute top-1/2 -translate-y-1/2 left-2 text-black text-xl bg-happy-yellow hover:bg-happy-yellow-hover rounded-full p-1  cursor-pointer'></i>

                <i onClick={nextImage} className='bx bx-chevron-right absolute top-1/2 -translate-y-1/2 right-2 text-black text-xl bg-happy-yellow hover:bg-happy-yellow-hover rounded-full p-1  cursor-pointer' ></i>
            </section>


            <section>
                <h4 className='text-gray-400 font-bold mt-6'>{productData?.brand}</h4>
                <h3 className='font-bold text-lg ml-2'>{productData?.title}</h3>

                <section className='grid grid-cols-2'>
                    <article>
                        <h4 className='text-gray-400 font-bold'>Price</h4>
                        <span className='font-bold text-lg ml-2'>{productData?.price}</span>
                    </article>

                    <article>
                        <h4 className='text-gray-400 font-bold'>Quantity</h4>
                        <div className='flex items-center'>
                            <button onClick={handleClickLess} className='border-[1px] py-2 px-4 bg-light-gray hover:bg-happy-yellow-hover'>-</button>
                            <span className='border-y-[1px] py-2 px-4'>{counter}</span>
                            <button onClick={handleClickPlus} className='border-[1px] py-2 px-4 bg-light-gray  hover:bg-happy-yellow-hover hover:text-white'>+</button>
                        </div>
                    </article>
                </section>

                <button onClick={handleClickAddToCart} className='w-full bg-happy-yellow hover:bg-happy-yellow-hover py-2 text-black transition-colors rounded-sm mt-6 text-xl'>
                    Add to cart <i className='bx bx-cart'></i>
                </button>

                <p className='text-sm my-6 text-gray-700'>{productData?.description}</p>
            </section>
        </section>

        <SimilarProducts productId={productData?.id} categoryId={productData?.categoryId} />
    </section>

    )
}

export default ProductDetail
