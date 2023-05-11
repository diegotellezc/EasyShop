import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosEcommerce, getConfig } from '../utils/configAxios'
import PurchaseCard from '../components/purchases/PurchaseCard'
import LoaderPurchases from '../components/purchases/LoaderPurchases'

const Purchases = () => {
    const [purchases, setPurchases] = useState(null)

    const filteredPurchases = purchases?.slice(0,20)
    
    useEffect(() => {
        axiosEcommerce.get("purchases", getConfig())
        .then((res) => {
            const orderedPurchases = res.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            
            setPurchases(orderedPurchases)
        } )
        .catch((err) => console.log(err))
    }, [])

    return (
        <main className='px-2 max-w-[900px] mx-auto mt-[60px] min-h-screen mb-8'>
            

            {
                purchases === null ? (
                    <LoaderPurchases />
                ) : (
                <>
                    <section className='flex gap-2 items-center mb-4 ml-2 mt-7 md:mt-16'>
                        <Link to={"/"}>Home</Link>
                        <div className='h-[7px] aspect-square bg-sad-yellow rounded-full'></div>
                        <span className='font-bold'>Purchases</span>
                    </section>

                    <section className='grid gap-6 py-6 sm:mx-6'>
                {
                    filteredPurchases.map(purchase => <PurchaseCard key={purchase.id} purchase={purchase} /> )
                }
                    </section>
                </>
                )
            }
            
            
        </main>
    )
}

export default Purchases
