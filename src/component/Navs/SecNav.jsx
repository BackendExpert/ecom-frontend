import React from 'react'
import { useAuth } from '../../context/AuthContext'

const SecNav = () => {
    const { auth, logout } = useAuth()
    return (
        <div className='bg-gray-50  px-4 border-b border-gray-300'>
            <div className="flex justify-between">
                <div className="flex">
                    <div className="flex text-gray-700 border-r border-gray-300 py-3">
                        <a href="" className='mx-2'>
                            <p className="hover:text-lime-600">About Us</p>
                        </a>
                        {
                            (() => {
                                if (!auth.token) {
                                    return (
                                        <a href="/login" className='mx-2'>
                                            <p className="hover:text-lime-600">My Account</p>
                                        </a>
                                    )
                                }
                                else if (auth.role === 'admin' || auth.role === 'staff' || auth.role === 'vendor') {
                                    return (
                                        <a href="/Dashboard/Home" className='mx-2'>
                                            <p className="hover:text-lime-600">My Account</p>
                                        </a>
                                    )
                                }
                                else if (auth.role === 'buyer') {
                                    return (
                                        <a href="/my-dashboard" className='mx-2'>
                                            <p className="hover:text-lime-600">My Account</p>
                                        </a>
                                    )
                                }
                            })()
                        }
                    </div>
                    <div className="py-3 ml-4 text-gray-500">
                        <p className="">We deliver to your everyday from 7:00 to 22:00</p>
                    </div>
                </div>

                <div className="">
                    <div className="flex py-3">
                        <div className="flex"></div>
                        <div className="flex"></div>
                        <div className="flex">
                            <a href="">
                                <h1 className="text-gray-500 hover:text-lime-600">Order Tracking</h1>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecNav