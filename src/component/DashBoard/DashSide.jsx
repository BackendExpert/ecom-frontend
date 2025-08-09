import React from 'react'
import {
    MdDashboard,
    MdPeople,
    MdSettings,
    MdAssessment,
    MdEmail,
    MdLogout
} from 'react-icons/md'
import { useAuth } from '../../context/AuthContext'

const DashSide = () => {
    const menuItems = [
        { name: 'Overview', icon: <MdDashboard />, active: true },
        { name: 'Users', icon: <MdPeople /> },
        { name: 'Reports', icon: <MdAssessment /> },
        { name: 'Messages', icon: <MdEmail /> },
        { name: 'Settings', icon: <MdSettings /> },
        { name: 'Logout', icon: <MdLogout /> },
    ]
    const { auth, logout } = useAuth()
    return (
        <aside className="h-screen w-64 border-r border-lime-200 shadow-lg flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-lime-200 shrink-0">
                <MdDashboard className="h-7 w-7 text-lime-600" />
                <h1 className="text-2xl font-bold text-lime-700 tracking-tight">
                    Dashboard
                </h1>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-4 px-6 py-6 border-b border-lime-100 shrink-0">
                <img
                    src="https://demo.bootstrapdash.com/purple-admin-free/dist/themes/assets/images/faces/face1.jpg"
                    alt="Profile"
                    className="w-14 h-14 rounded-full border-2 border-lime-400 shadow-md"
                />
                <div>
                    <h2 className="text-md font-semibold text-gray-800">
                        {auth.user?.username}
                    </h2>
                    <p className="text-sm text-gray-500">{auth.role}</p>
                </div>
            </div>

            {/* Menu Items */}
            <nav className="px-4 mt-4 space-y-1 shrink-0">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`group flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all
                            ${item.active
                                ? 'bg-lime-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-lime-100 hover:text-lime-700'}
                        `}
                    >
                        <span className={`text-xl transition-all ${item.active ? 'text-white' : 'group-hover:text-lime-700 text-lime-500'}`}>
                            {item.icon}
                        </span>
                        <span className="text-sm font-medium tracking-wide">
                            {item.name}
                        </span>
                    </div>
                ))}
            </nav>

            {/* Footer Spacer */}
            <div className="mt-auto p-4 text-center text-xs text-gray-400 shrink-0">
                © 2025 YourCompany
            </div>
        </aside>
    )
}

export default DashSide