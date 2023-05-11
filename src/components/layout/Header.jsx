import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { changeIsShowCart } from '../../store/slices/cart.slice'

const Header = () => {
    const {token} = useSelector(store => store.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClickChangeShowCart = () => {
        if(!token) return navigate("/login")
        dispatch(changeIsShowCart())
    }
    

    return (
        <section className='fixed top-0 left-0 right-0 h-[60px] z-20 flex items-center justify-between text-white bg-[#131921] shadow-sm shadow-dark-gray/70'>
            <Link to={"/"} className='text-2xl xs:text-3xl ml-6 md:ml-8 md:text-3xl'>
                <h1 className='font-bold'>Easy<span className='text-sad-yellow'>Shop</span></h1>
            </Link>

            <nav className='h-full grid grid-cols-3'>
                <Link to={"/login"} className='px-3 xs:px-6 text-2xl flex justify-center items-center gap-3 xs:border-x-[1px] border-gray-300'>
                    <i className='bx bx-user'></i>
                    <h2 className='hidden lg:block text-lg'>User</h2>
                </Link>

                <Link to={"/purchases"} className='px-3 xs:px-6 text-2xl flex justify-center items-center gap-3 xs:border-x-[1px] border-gray-300'>
                    <i className='bx bx-purchase-tag' ></i>
                    <h2 className='hidden lg:block text-lg'>Purchases</h2>
                </Link>

                <button onClick={handleClickChangeShowCart} className='px-3 xs:px-6 text-2xl grid items-center justify-center xs:border-x-[1px] border-gray-300'>
                <i className='bx bx-cart'></i>
                </button>
            </nav>
        </section>
    )
}

export default Header
