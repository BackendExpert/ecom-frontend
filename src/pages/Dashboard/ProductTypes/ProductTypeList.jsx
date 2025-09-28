import React from "react";
import { FaTags } from "react-icons/fa6";

const ProductTypeList = () => {
    const productTypes = [
        { name: "Electronics", items: 250 },
        { name: "Clothing", items: 180 },
        { name: "Accessories", items: 120 },
        { name: "Furniture", items: 90 },
        { name: "Sports", items: 60 },
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-r from-lime-400 to-green-500 shadow-md">
                    <FaTags className="text-white text-xl" />
                </div>
                <h1 className="font-extrabold text-2xl ml-3 text-gray-800">
                    Product Types
                </h1>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {productTypes.map((product, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-lime-100 group-hover:bg-lime-400 transition-colors">
                                <FaTags className="text-lime-500 group-hover:text-white text-lg" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-lime-600 transition-colors">
                                    {product.name}
                                </h2>
                                <p className="text-sm text-gray-500">{product.items} items</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductTypeList;
