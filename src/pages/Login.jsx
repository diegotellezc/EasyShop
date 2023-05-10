import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser, logout } from '../store/slices/userInfo.slice'

const Login = () => {

    const { register, handleSubmit } = useForm()

    const {token, user} = useSelector(store => store.userInfo)
    console.log(user)
    const dispatch = useDispatch()

    const submit = (data) => {
        dispatch(loginUser(data))
    }

    const handleClickLogout = () => {
        dispatch(logout())
    }
    

    return (
        <main className='bg-gray-100 min-h-screen grid place-content-center px-2'>

            {
                token ? (
                    <section className='bg-white p-4 rounded-md text-center w-[300px] grid gap-6 overflow-x-hidden'>
                        <div className='w-[120px] mx-auto'>
                            <img className='' src="/images/logged.png" alt="logged" />
                        </div>
                        <div>
                            <span className='text-medium-gray'>User</span>
                            <h2 className='capitalize text-2xl'>{user?.firstName} {user?.lastName}</h2>
                        </div>
                        
                        <div>
                            <span className='text-medium-gray'>Email</span>
                            <h3 className='text-lg'>{user?.email}</h3>
                        </div>
                        <button onClick={handleClickLogout} className='bg-happy-yellow hover:bg-happy-yellow-hover text-header-color rounded-md w-full py-2 text-bold transition-colors'>Logout</button>
                    </section>
                ) : (
                    <form onSubmit={handleSubmit(submit)} className='bg-white p-4 rounded-md max-w-[360px] grid gap-6'>
                <h2 className='text-3xl text-center font-[500] text-dark-blue'>Welcome! </h2>
                <h3 className='text-xl text-center font-[500] text-dark-gray'>Enter your email and password to continue</h3>

                <section className='bg-light-gray p-4'>
                    <h3 className='text-center font-bold'>Test data</h3>

                    <div className='flex gap-2 items-center'>
                        <i className='bx bx-envelope text-xl'></i>
                        <span>john@gmail.com</span>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <i className='bx bx-lock-alt text-xl'></i>
                        <span>john1234</span>
                    </div>
                </section>

                <div className='grid gap-1'>
                    <label htmlFor="email">Email</label>
                    <input className='border-[1px] border-gray-300 p-1 outline-none' id='email' type="email" {...register("email" , {
                        required: true
                    })} />
                </div>

                <div className='grid gap-1'>
                    <label htmlFor="password">Password</label>
                    <input className='border-[1px] border-gray-300 p-1 outline-none' id='password' type="password" {...register("password" , {
                        required: true
                    })} />
                </div>

                <button className='block w-full py-2 bg-happy-yellow hover:bg-happy-yellow-hover text-header-color text-bold transition-colors'>Login</button>

                <span className='text-sm mx-auto flex gap-1'>
                    Don't have an account? 
                    <Link to="#" className='text-light-blue hover:underline '>Sign up</Link>
                </span>
            </form>
                )
            }
            
            
        </main>
    )
}

export default Login
