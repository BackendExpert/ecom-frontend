import React from 'react'

const Login = () => {
    return (
        <div className="flex items-center justify-center py-16 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-lime-600 text-center">Login</h2>
                <p className="text-gray-500 text-center mt-2">Welcome back! Please log in to your account.</p>

                <form className="mt-8 space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-lime-600"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-lime-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-lime-600 text-white rounded-lg font-medium hover:bg-lime-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    Don’t have an account? <a href="/register" className="text-lime-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    )
}

export default Login
