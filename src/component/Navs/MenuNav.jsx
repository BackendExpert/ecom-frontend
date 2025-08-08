import React from 'react'
import { menunavdata } from './MenuNavData'

const MenuNav = () => {
    return (
        <div className="h-16 bg-gray-100 shadow-sm border-t border-gray-300">
            <div className="flex justify-between items-center h-full ml-4">
                {/* Left Menu Items */}
                <div className="flex space-x-6">
                    {menunavdata.map((menu, index) => (
                        <a
                            href={menu.link}
                            key={index}
                            className="text-gray-500 hover:text-lime-600 font-semibold"
                        >
                            {menu.name}
                        </a>
                    ))}
                </div>

                {/* Right Section */}
                <div className="flex items-center h-full">
                    <div className="mr-8 text-gray-500 font-semibold">
                        <a href="" className="hover:text-lime-600">
                            Trending Products
                        </a>
                    </div>
                    <div className="px-4 bg-lime-600 text-white font-semibold h-full flex items-center">
                        Get upto 40% Discount Now
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuNav
