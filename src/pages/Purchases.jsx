import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { axiosEcommerce } from '../utils/configAxios'

const Purchases = () => {


    useEffect(() => {
        const config = {
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("userInfo"))?.token 
            }
        }


        axiosEcommerce.get("purchases", config)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
    }, [])

    return (
        <main className='px-2'>
            <section className='flex gap-2 items-center my-2'>
                <Link to={"/"}>Home</Link>
                <div className='h-[7px] aspect-square bg-red-500 rounded-full'></div>
                <span className='font-bold'>Purchases</span>
            </section>
        </main>
    )
}

export default Purchases
