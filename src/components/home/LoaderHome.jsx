import React from 'react'
import {ImSpinner} from 'react-icons/im'

const LoaderHome = () => {
    return (
        <section className='mx-auto h-[70%] flex flex-col justify-center gap-4'>
            <ImSpinner className='h-20 w-40 mx-auto text-sad-yellow animate-spin' />

            <h4 className='text-xl text-dark-blue mx-auto p-5 text-center'>Loading your purchases...</h4>
        </section>
    )
}

export default LoaderHome
