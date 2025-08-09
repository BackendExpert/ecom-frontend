import React from 'react'
import {
    FaUsers, FaBell, FaCommentDots, FaCheckCircle, FaExclamationTriangle,
    FaUserPlus, FaTrash, FaCalendarAlt, FaInfoCircle, FaEnvelope,
    FaUpload, FaDownload, FaStar, FaCogs, FaLock, FaKey, FaBug,
    FaChartLine, FaGift, FaGlobe, FaHome, FaPhoneAlt,
    FaClipboardList, FaEye
} from "react-icons/fa";


const Notifications = () => {
    const sampledata_notification = [
        {
            id: 1,
            icon: FaUsers,
            name: "New Member Joined",
            desc: "Alice has joined your team.",
            time: "2 minutes ago",
            color: "bg-red-500",
        },
        {
            id: 2,
            icon: FaCommentDots,
            name: "New Message",
            desc: "John sent you a message.",
            time: "5 minutes ago",
            color: "bg-blue-500",
        },
        {
            id: 3,
            icon: FaCheckCircle,
            name: "Task Completed",
            desc: "You completed the project setup.",
            time: "10 minutes ago",
            color: "bg-green-500",
        },
        {
            id: 4,
            icon: FaExclamationTriangle,
            name: "Server Warning",
            desc: "High memory usage detected.",
            time: "15 minutes ago",
            color: "bg-yellow-500",
        },
        {
            id: 5,
            icon: FaUserPlus,
            name: "New Follower",
            desc: "Michael started following you.",
            time: "20 minutes ago",
            color: "bg-indigo-500",
        },
        {
            id: 6,
            icon: FaTrash,
            name: "Item Deleted",
            desc: "You removed a file.",
            time: "30 minutes ago",
            color: "bg-pink-500",
        },
        {
            id: 7,
            icon: FaCalendarAlt,
            name: "Meeting Reminder",
            desc: "Project meeting at 3:00 PM.",
            time: "1 hour ago",
            color: "bg-purple-500",
        },
        {
            id: 8,
            icon: FaInfoCircle,
            name: "System Update",
            desc: "New version available.",
            time: "2 hours ago",
            color: "bg-cyan-500",
        },
        {
            id: 9,
            icon: FaEnvelope,
            name: "Email Sent",
            desc: "Email sent to the client.",
            time: "3 hours ago",
            color: "bg-emerald-500",
        },
        {
            id: 10,
            icon: FaUpload,
            name: "Upload Complete",
            desc: "File uploaded successfully.",
            time: "4 hours ago",
            color: "bg-fuchsia-500",
        },
        {
            id: 11,
            icon: FaDownload,
            name: "Download Ready",
            desc: "Your report is ready to download.",
            time: "5 hours ago",
            color: "bg-teal-500",
        },
        {
            id: 12,
            icon: FaStar,
            name: "Achievement",
            desc: "You earned a new badge!",
            time: "6 hours ago",
            color: "bg-amber-500",
        },
        {
            id: 13,
            icon: FaCogs,
            name: "Settings Updated",
            desc: "Your preferences were saved.",
            time: "7 hours ago",
            color: "bg-lime-500",
        },
        {
            id: 14,
            icon: FaLock,
            name: "Security Alert",
            desc: "New login from unknown device.",
            time: "8 hours ago",
            color: "bg-rose-500",
        },
        {
            id: 15,
            icon: FaKey,
            name: "Password Changed",
            desc: "Your password was updated.",
            time: "9 hours ago",
            color: "bg-lime-500",
        },
        {
            id: 16,
            icon: FaBug,
            name: "Bug Reported",
            desc: "A new bug has been submitted.",
            time: "10 hours ago",
            color: "bg-orange-500",
        },
        {
            id: 17,
            icon: FaChartLine,
            name: "Traffic Spike",
            desc: "Website traffic increased by 30%.",
            time: "Today",
            color: "bg-sky-500",
        },
        {
            id: 18,
            icon: FaGift,
            name: "New Reward",
            desc: "You received 500 bonus points.",
            time: "Today",
            color: "bg-neutral-500",
        },
        {
            id: 19,
            icon: FaGlobe,
            name: "Global Notice",
            desc: "Maintenance scheduled at midnight.",
            time: "Today",
            color: "bg-slate-500",
        },
        {
            id: 20,
            icon: FaHome,
            name: "New Login",
            desc: "You logged in from a new location.",
            time: "Yesterday",
            color: "bg-zinc-500",
        },
        {
            id: 21,
            icon: FaPhoneAlt,
            name: "Contact Request",
            desc: "You received a new call request.",
            time: "Yesterday",
            color: "bg-stone-500",
        },
        {
            id: 22,
            icon: FaClipboardList,
            name: "New Task Assigned",
            desc: "Check your task board.",
            time: "2 days ago",
            color: "bg-gray-500",
        },
        {
            id: 23,
            icon: FaEye,
            name: "Profile Viewed",
            desc: "Anna viewed your profile.",
            time: "2 days ago",
            color: "bg-yellow-400",
        },
        {
            id: 24,
            icon: FaBell,
            name: "Reminder",
            desc: "Submit your project report.",
            time: "3 days ago",
            color: "bg-green-600",
        },
        {
            id: 25,
            icon: FaCommentDots,
            name: "New Comment",
            desc: "Someone commented on your post.",
            time: "4 days ago",
            color: "bg-blue-600",
        },
        {
            id: 26,
            icon: FaUsers,
            name: "Team Invitation",
            desc: "You’ve been invited to a new team.",
            time: "5 days ago",
            color: "bg-purple-600",
        },
    ];


    return (
        <div>
            <div className="flex">
                <div className="p-2 rounded bg-lime-600">
                    <FaBell className='fill-white' />
                </div>
                <div className="">
                    <h1 className="font-bold text-xl ml-2">Notifications</h1>
                </div>
            </div>

            <div className="space-y-4 mt-8">
                {
                    sampledata_notification.map((data, index) => (
                        <div
                            key={index}
                            className="md:flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                        >
                            {/* Icon and text */}
                            <div className="flex items-start space-x-4">
                                <div className={`p-3 rounded-lg ${data.color}`}>
                                    <data.icon className="text-white w-6 h-6" />
                                </div>
                                <div className="text-gray-700">
                                    <h2 className="font-semibold text-base">{data.name}</h2>
                                    <p className="text-sm text-gray-500">{data.desc}</p>
                                </div>
                            </div>

                            {/* Time */}
                            <div className="md:text-left text-right md:mt-0 mt-4 text-sm text-gray-400 whitespace-nowrap ml-4">
                                {data.time}
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Notifications