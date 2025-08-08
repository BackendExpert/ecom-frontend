import React, { useState } from 'react'
import DefaultInput from '../../component/Form/DateInput'
import DateInput from '../../component/Form/DateInput'
import FileInput from '../../component/Form/FileInput'
import TextAreaInput from '../../component/Form/TextAreaInput'
import Dropdown from '../../component/Form/Dropdown'

const TestForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dob: '',
        bio: '',
        gender: '',
        file: null
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: files ? files : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form Submitted:", formData)
        alert("Form submitted! Check console for data.")
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-lime-600 mb-6">Test Form</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
                
                <DefaultInput 
                    label="Full Name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter your name" 
                    required
                />

                <DefaultInput 
                    label="Email" 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Enter your email" 
                    required
                />

                <DateInput 
                    label="Date of Birth" 
                    name="dob" 
                    value={formData.dob} 
                    onChange={handleChange} 
                    required
                />

                <Dropdown 
                    label="Gender" 
                    name="gender" 
                    onChange={handleChange} 
                    required
                    options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' }
                    ]}
                />

                <TextAreaInput 
                    label="Short Bio" 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleChange} 
                    placeholder="Tell us about yourself"
                />

                <FileInput 
                    label="Profile Picture" 
                    name="file" 
                    onChange={handleChange} 
                    accept="image/*"
                />

                <button 
                    type="submit" 
                    className="w-full py-3 mt-4 bg-lime-600 text-white rounded-lg font-medium hover:bg-lime-700 transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default TestForm
