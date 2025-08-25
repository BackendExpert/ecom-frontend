import React, { useState, useEffect } from 'react'
import { FaUser, FaUserEdit } from 'react-icons/fa'
import { useAuth } from '../../../context/AuthContext'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import UpdatePassword from './UpdatePassword'
import UpdateProfileImage from './UpdateProfileImage'
import API from '../../../services/api'

const Profile = () => {
    const { auth } = useAuth()
    const [activeTab, setActiveTab] = useState("profile")
    const [pimg, setPimg] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [imgSrc, setImgSrc] = useState("/default-avatar.png") // fallback
    const token = localStorage.getItem('token')

    // Fetch profile image path from backend
    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const res = await API.get(`/auth/get-profile-img?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                })
                setPimg(res.data.result || null)
            } catch (err) {
                console.error("Failed to fetch profile image:", err)
                setError("Could not load profile image")
                setPimg(null)
            } finally {
                setLoading(false)
            }
        }

        fetchProfileImage()
    }, [token])

    // Fetch actual image blob safely to avoid CORS issues
    useEffect(() => {
        if (pimg?.profile_image) {
            const normalizedPath = pimg.profile_image.replace(/\\/g, "/")
            const url = `${import.meta.env.VITE_APP_API}${normalizedPath.startsWith("/") ? "" : "/"}${normalizedPath}`

            fetch(url)
                .then(res => res.blob())
                .then(blob => {
                    const localUrl = URL.createObjectURL(blob)
                    setImgSrc(localUrl)
                })
                .catch(err => {
                    console.error("Failed to load image blob:", err)
                    setImgSrc("/default-avatar.png")
                })
        } else {
            setImgSrc("/default-avatar.png")
        }
    }, [pimg])

    return (
        <div className="max-w-8xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 rounded-full bg-lime-500 shadow-md">
                    <FaUserEdit className="text-white text-lg" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start">
                {/* Avatar */}
                <div className="relative w-40 h-40">
                    <img
                        src={imgSrc}
                        alt="profile"
                        className="w-40 h-40 rounded-full border-4 border-lime-600 object-cover shadow-md"
                    />
                    <span className="absolute bottom-2 right-2 bg-lime-600 text-white text-xs px-3 py-1 rounded-full shadow">
                        {auth?.role || "User"}
                    </span>
                </div>

                {/* User Info */}
                <div className="mt-6 md:mt-0 md:ml-8 flex-1">
                    <h2 className="uppercase font-bold text-2xl text-gray-800 tracking-wide">
                        {auth?.user?.username || "Guest User"}
                    </h2>
                    <p className="text-gray-500 mt-1">{auth?.user?.email || "No email"}</p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap mt-6 gap-3">
                        <DefaultButton
                            onClick={() => setActiveTab("profile")}
                            type="button"
                            label="Update Profile"
                            className={`px-6 py-2 rounded-xl shadow transition-all duration-200 ${activeTab === "profile"
                                ? "bg-lime-600 text-white"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                        />
                        <DefaultButton
                            onClick={() => setActiveTab("password")}
                            type="button"
                            label="Update Password"
                            className={`px-6 py-2 rounded-xl shadow transition-all duration-200 ${activeTab === "password"
                                ? "bg-lime-600 text-white"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                        />
                    </div>
                </div>
            </div>

            {/* Toggle Section */}
            <div className="mt-8">
                {activeTab === "profile" && (
                    <div className="bg-white rounded-2xl shadow p-6">
                        <UpdateProfileImage />
                    </div>
                )}
                {activeTab === "password" && (
                    <div className="bg-white rounded-2xl shadow p-6">
                        <UpdatePassword />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
