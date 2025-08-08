import React from 'react'
import { Catogeriesdata } from './Catogerydata'

const Catogeries = () => {
    return (
        <div className="mx-12 my-12">
            <h1 className="text-lime-600 text-3xl font-bold tracking-wide">
                Categories
            </h1>

            <div className="mt-10">
                <div className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-8">
                    {Catogeriesdata.map((data, index) => (
                        <a
                            href={data.link}
                            key={index}
                            className="group bg-white/5 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-2"
                        >
                            <div className="flex items-center justify-center">
                                <data.icon className="h-14 w-auto text-lime-600 group-hover:scale-110 transition duration-300" />
                            </div>
                            <p className="mt-6 text-lg font-medium text-center text-lime-600 group-hover:text-lime-800 transition duration-300">
                                {data.name}
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Catogeries
