import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/HomePage/Home'
import MainNav from './component/Navs/MainNav'
import MenuNav from './component/Navs/MenuNav'
import { useEffect, useState } from 'react'
import MobileTabNav from './component/Navs/MobileTabNav'

function App() {
    const [showMainNav, setShowMainNav] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setShowMainNav(true) // Show only at top
            } else {
                setShowMainNav(false) // Hide when scrolling down
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <BrowserRouter>
            <div className="relative">
                {/* Main Nav (only at top) */}
                <div className="xl:block hidden">
                    {showMainNav && (
                        <div className="w-full fixed top-0 z-50">
                            <MainNav />
                        </div>
                    )}

                    {/* Menu Nav (always visible on top, below MainNav if shown) */}
                    <div
                        className={`w-full fixed z-40 transition-all duration-300 ${showMainNav ? 'top-[180px]' : 'top-0'
                            }`}
                    >
                        <MenuNav />
                    </div>
                </div>

                <div className="xl:hidden block">
                    <div
                        className={`w-full fixed z-40 transition-all duration-300 `}
                    >
                        <MobileTabNav />
                    </div>
                </div>

                {/* Main Content */}
                <div className="xl:pt-[210px] pt-10">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
