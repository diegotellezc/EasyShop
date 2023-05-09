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
        <section>
            <Link to={"/"}>
                <h1>EasyShop</h1>
            </Link>

            <nav>
                <Link to={"/login"}><i className='bx bx-user'></i> Login</Link>

                <Link to={"/purchases"}><i className='bx bx-purchase-tag' ></i>Purchases</Link>

                <button onClick={handleClickChangeShowCart}>
                <i className='bx bx-cart'>Cart</i>
                </button>
            </nav>
        </section>
    )
}

export default Header
