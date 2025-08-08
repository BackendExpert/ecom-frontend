import React from 'react'

const DefaultButton = ({ 
    label = "Click the Button", 
    onClick, 
    type = "button", 
    disabled = false 
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`mt-6 px-6 py-3 rounded-lg font-medium text-white transition duration-300 
                ${disabled 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2'}
            `}
        >
            {label}
        </button>
    )
}

export default DefaultButton
