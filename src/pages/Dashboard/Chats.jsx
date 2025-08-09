import React from 'react'
import { FaMessage } from 'react-icons/fa6'

const Chats = () => {
    return (
        <div>
            <div className="flex">
                <div className="p-2 rounded bg-lime-600">
                    <FaMessage className='fill-white' />
                </div>
                <div className="">
                    <h1 className="font-bold text-xl ml-2">Chats</h1>
                </div>
            </div>
        </div>
    )
}

export default Chats