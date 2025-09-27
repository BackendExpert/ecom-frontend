import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import DefaultButton from '../../../component/Buttons/DefaultButton'

const ManageProduct = () => {
    return (
        <div>
            <div className="flex">
                <div className="p-2 rounded bg-lime-400">
                    <FaShoppingCart className='fill-white' />
                </div>
                <div className="">
                    <h1 className="font-bold text-xl ml-2">Products</h1>
                </div>
            </div>
            <div className="">

            </div>

            <div className="mt-4">
                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-lime-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                    #
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                    Product No
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                    Price No
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageProduct