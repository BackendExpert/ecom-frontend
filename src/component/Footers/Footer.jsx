import React from 'react'

const Footer = () => {
    return (
        <div className='bg-white p-8 pt-16'>
            <div className="grid xl:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                    <h1 className="text-gray-800 font-semibold text-2xl">About Company</h1>
                    <div className="mt-2">
                        <p className="text-gray-600 leading-relaxed">
                            MyMart offers premium products with unbeatable prices. Trusted by thousands for quality and service.
                        </p>
                    </div>
                </div>

                <div>
                    <h1 className="text-gray-800 font-semibold text-2xl">Our Stores</h1>
                    <ul>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">Delivery Information</a>
                        </li>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                        </li>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
                        </li>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">Support Center</a>
                        </li>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">Careers</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h1 className="text-gray-800 font-semibold text-2xl">Shop Categories</h1>
                    <ul>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">Contact Us</a>
                        </li>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">Information</a>
                        </li>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">About Us</a>
                        </li>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">Careers</a>
                        </li>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">Nest Stories</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h1 className="text-gray-800 font-semibold text-2xl">Useful Links</h1>
                    <ul>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">Cancellation & Returns</a>
                        </li>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">Report Infringement</a>
                        </li>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">Payments</a>
                        </li>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">Shipping</a>
                        </li>
                        <li className='my-4 text-gray-500 hover:text-lime-600'>
                            <a href="" target="_blank" rel="noopener noreferrer">FAQ</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h1 className="text-gray-800 font-semibold text-2xl">Our Newsletter</h1>
                    <div className="text-gray-500">
                        <p className="mt-4">
                            Subscribe to the mailing list to receive updates on the new arrivals and other discounts
                        </p>
                        <form className="my-4 flex border border-gray-300 rounded-lg overflow-hidden">
                            <input
                                type="email"
                                aria-label="Email address"
                                placeholder="Your email address"
                                required
                                className="w-full px-4 py-2 text-gray-700 outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-lime-600 text-white px-5 hover:bg-lime-700 transition-colors duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="form-checkbox text-lime-600" />
                            <span className="ml-2 text-gray-700">I would like to receive news and special offers</span>
                        </label>
                    </div>
                </div>
            </div>
            <hr className='my-8 border border-gray-300' />
            <div className="md:flex justify-between">
                <div>
                    &copy; {new Date().getFullYear()} - MyMart
                </div>
                <div>
                    Developed and Maintained by <a href="http://blackalphalabs.com/" target='_blank' rel="noopener noreferrer" className="underline hover:text-lime-600">BlackAlphaLabs</a>
                </div>
            </div>
        </div>
    )
}

export default Footer
