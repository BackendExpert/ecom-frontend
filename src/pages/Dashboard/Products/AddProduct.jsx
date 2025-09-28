import React from 'react'
import { FaCartPlus } from 'react-icons/fa6'

const AddProduct = () => {
    return (
        <div>
            <div className="flex">
                <div className="p-2 rounded bg-lime-400">
                    <FaCartPlus className='fill-white' />
                </div>
                <div className="">
                    <h1 className="font-bold text-xl ml-2">Add New Product</h1>
                </div>
            </div>

            
        </div>
    )
}

export default AddProduct