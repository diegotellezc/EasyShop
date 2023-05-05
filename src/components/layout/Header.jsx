import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <section>
            <Link to={"/"}>
                <h1>EasyShop</h1>
            </Link>

            <nav>
                <Link to={"/login"}><i className='bx bx-user'></i> Login</Link>

                <Link to={"/purchases"}><i className='bx bx-purchase-tag' ></i>Purchases</Link>

                <button>
                <i className='bx bx-cart'>Cart</i>
                </button>
            </nav>
        </section>
    )
}

export default Header
