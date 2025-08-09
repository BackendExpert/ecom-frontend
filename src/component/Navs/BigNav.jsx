import React, { useState, useEffect, useRef } from 'react'
import { FaSearch, FaShoppingBasket, FaUser } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FaCartShopping } from 'react-icons/fa6';
import { useAuth } from '../../context/AuthContext';

const BigNav = () => {
    const [showCategories, setShowCategories] = useState(false);
    const dropdownRef = useRef(null);

    const categoriesList = [
        "Electronics",
        "Fashion",
        "Home & Kitchen",
        "Sports & Outdoors",
        "Books & Stationery",
        "Health & Beauty",
    ];

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowCategories(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { auth, logout } = useAuth()

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Left - Logo */}
                <a href="/" className="flex items-center group">
                    <FaShoppingBasket className="h-12 w-auto fill-lime-600 transition-transform duration-300 group-hover:scale-110" />
                    <h1 className="text-3xl font-bold ml-2 text-lime-600 tracking-tight">MyMart</h1>
                </a>

                {/* Middle - Categories & Search */}
                <div className="flex items-center space-x-6 relative" ref={dropdownRef}>

                    {/* Categories */}
                    <div
                        onClick={() => setShowCategories(!showCategories)}
                        className="flex items-center bg-gray-100 px-4 py-2 rounded-full text-gray-600 hover:text-lime-600 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <RiMenu2Line className="h-5 w-auto fill-gray-500" />
                        <span className="ml-2 font-medium">Categories</span>
                    </div>

                    {/* Dropdown */}
                    {showCategories && (
                        <div className="absolute top-14 left-0 w-60 bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-lg overflow-hidden animate-fadeIn z-50">
                            {categoriesList.map((cat, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="block px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-lime-600 transition-colors"
                                >
                                    {cat}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Search */}
                    <form action="" method="post" className="flex shadow-sm rounded-full overflow-hidden border border-gray-300 focus-within:border-lime-600 transition-all">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="px-4 py-2 w-72 focus:outline-none text-gray-600"
                        />
                        <button
                            type="submit"
                            className="flex items-center bg-lime-600 text-white px-5 hover:bg-lime-700 transition-colors"
                        >
                            <FaSearch className="mr-2" /> Search
                        </button>
                    </form>
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-3">

                    {/* Account */}
                    <div className="">
                        {!auth.token ? (
                            <a href="/login" className="flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-300 text-gray-500 hover:text-lime-600 hover:shadow-md transition-all">
                                <FaUser className="h-5 w-auto fill-gray-500" />
                                <span className="ml-2 font-medium">My Account</span>
                            </a>
                        ) : (
                            <a href="/Dashboard/Home" className="flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-300 text-gray-500 hover:text-lime-600 hover:shadow-md transition-all">
                                <FaUser className="h-5 w-auto fill-gray-500" />
                                <span className="ml-2 font-medium">My Account</span>
                            </a>
                        )}
                    </div>


                    {/* Compare */}
                    <a href="" className="flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-300 text-gray-500 hover:text-lime-600 hover:shadow-md transition-all">
                        <MdOutlineCompareArrows className="h-5 w-auto fill-gray-500" />
                        <span className="ml-2 font-medium">Compare</span>
                    </a>

                    {/* Cart */}
                    <a href="" className="flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-300 text-gray-500 hover:text-lime-600 hover:shadow-md transition-all">
                        <FaCartShopping className="h-5 w-auto fill-gray-500" />
                        <span className="ml-2 font-medium">My Cart</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default BigNav
