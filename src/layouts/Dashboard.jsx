import React, { useState } from 'react'
import DashSide from '../component/DashBoard/DashSide'
import { Outlet } from 'react-router-dom'
import DashNav from '../component/Navs/DashNav'
import DashFooter from '../component/Footers/DashFooter'
import { MdOutlineClose } from 'react-icons/md'
import { TiThMenu } from 'react-icons/ti'

const Dashboard = () => {
    const [openside, setOpenSide] = useState(false)

    const headlemenuopen = () => setOpenSide(prev => !prev)

    return (
        <div className="h-screen w-screen overflow-hidden flex bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-screen w-64 z-30 bg-white shadow-md transform transition-transform duration-300 ease-in-out
                    ${openside ? 'translate-x-0' : '-translate-x-full'}
                    xl:translate-x-0 xl:static xl:flex
                `}
            >
                <DashSide />
            </aside>

            {/* Overlay for mobile and tablet */}
            {openside && (
                <div
                    className="fixed inset-0 bg-opacity-50 z-20 xl:hidden"
                    onClick={() => setOpenSide(false)}
                />
            )}

            {/* Toggle button for all screens smaller than xl */}
            <button
                className="xl:hidden fixed top-2 left-2 z-50 bg-white p-2 rounded font-semibold "
                onClick={headlemenuopen}
                aria-label="Toggle sidebar"
            >
                {openside ? (
                    <MdOutlineClose className="fill-[#7829e1] h-8 w-auto" />
                ) : (
                    <TiThMenu className="fill-[#7829e1] h-8 w-auto" />
                )}
            </button>

            {/* Main content area */}
            <div className="flex-1 flex flex-col h-screen ml-0 ">
                {/* Fixed Top Nav */}
                <header className="fixed top-0 left-0 xl:left-64 w-full xl:w-[calc(100%-16rem)] z-20 bg-white shadow">
                    <DashNav />
                </header>

                {/* Scrollable Content */}
                <div className="pt-16 px-4 pb-4 overflow-y-auto flex-1 mt-8">
                    <Outlet />

                    {/* Footer that scrolls with content */}
                    <footer className="mt-4">
                        <DashFooter />
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Dashboard