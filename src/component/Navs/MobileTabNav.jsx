import React, { useState } from "react";
import { FaSearch, FaShoppingBasket, FaUser } from "react-icons/fa";
import { RiMenu3Fill, RiCloseLine } from "react-icons/ri";
import { MdOutlineCompareArrows } from "react-icons/md"
import { useAuth } from "../../context/AuthContext";

const MobileTabNav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("menu");

    const { auth, logout } = useAuth()
    return (
        <>
            {/* Top Navigation */}
            <div className="p-4 bg-white shadow-md sticky top-0 z-50">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <a href="/" className="flex items-center group">
                        <FaShoppingBasket className="h-8 fill-lime-600 transition-transform duration-300 group-hover:scale-110" />
                        <h1 className="text-2xl font-bold ml-2 text-lime-600 tracking-tight">
                            MyMart
                        </h1>
                    </a>

                    {/* Menu Button */}
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="group p-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        <RiMenu3Fill className="h-8 fill-gray-600 group-hover:scale-110 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                />
            )}

            {/* Slide-in Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-[80%] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-lime-600">Menu</h2>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        <RiCloseLine className="h-6 fill-gray-600" />
                    </button>
                </div>

                <div className="">
                    <div className="flex justify-around px-2 mt-4">
                        {
                            !auth.token ? (
                                <a href="/login" className="flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-300 text-gray-500 hover:text-lime-600 hover:shadow-md transition-all">
                                    <FaUser className="h-5 w-auto fill-gray-500" />
                                    <span className="ml-2 font-medium">Account</span>
                                </a>
                            ) : (
                                <a href="/Dashboard/Home" className="flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-300 text-gray-500 hover:text-lime-600 hover:shadow-md transition-all">
                                    <FaUser className="h-5 w-auto fill-gray-500" />
                                    <span className="ml-2 font-medium">Account</span>
                                </a>
                            )
                        }


                        {/* Compare */}
                        <a href="" className="flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-300 text-gray-500 hover:text-lime-600 hover:shadow-md transition-all">
                            <MdOutlineCompareArrows className="h-5 w-auto fill-gray-500" />
                            <span className="ml-2 font-medium">Compare</span>
                        </a>
                    </div>
                </div>

                {/* Search */}
                <div className="p-4">
                    <form className="flex shadow-sm rounded-full overflow-hidden border border-gray-300 focus-within:border-lime-600 transition">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="px-4 py-2 flex-1 focus:outline-none text-gray-600"
                        />
                        <button
                            type="submit"
                            className="flex items-center justify-center bg-lime-600 text-white px-4 hover:bg-lime-700 transition"
                        >
                            <FaSearch />
                        </button>
                    </form>
                </div>

                {/* Tabs */}
                <div className="flex justify-around px-4 pb-4">
                    {["menu", "categories"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 mx-1 rounded-lg font-medium capitalize transition ${activeTab === tab
                                ? "bg-lime-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="px-4 pb-8 space-y-4">
                    {activeTab === "menu" && (
                        <nav className="flex flex-col space-y-3">
                            <a
                                href="/"
                                className="p-3 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700"
                            >
                                🏠 Home
                            </a>
                            <a
                                href="/shop"
                                className="p-3 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700"
                            >
                                🛒 Shop
                            </a>
                            <a
                                href="/about"
                                className="p-3 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700"
                            >
                                ℹ️ About Us
                            </a>
                            <a
                                href="/contact"
                                className="p-3 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700"
                            >
                                📞 Contact
                            </a>
                        </nav>
                    )}

                    {activeTab === "categories" && (
                        <div className="grid grid-cols-2 gap-3">
                            {["Fruits", "Vegetables", "Dairy", "Snacks", "Beverages", "Bakery"].map(
                                (category) => (
                                    <a
                                        key={category}
                                        href={`/category/${category.toLowerCase()}`}
                                        className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-center font-medium text-gray-700"
                                    >
                                        {category}
                                    </a>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MobileTabNav;
