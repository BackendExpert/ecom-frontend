import React from 'react'

const DateInput = ({ label, name, value, onChange, placeholder, required = false }) => {
    return (
        <div className="mb-5">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                type="date"
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:border-lime-600 transition"
            />
        </div>
    )
}

export default DateInput
