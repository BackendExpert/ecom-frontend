import { Outlet } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import MainNav from '../component/Navs/MainNav'
import MenuNav from '../component/Navs/MenuNav'
import MobileTabNav from '../component/Navs/MobileTabNav'
import Footer from '../component/Footers/Footer'

const BuyerDash = () => {
    const [showMainNav, setShowMainNav] = useState(true)
    const sentinelRef = useRef(null)

    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel) return

        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver(
                ([entry]) => {
                    // entry.isIntersecting === true while the sentinel is visible in viewport
                    setShowMainNav(entry.isIntersecting)
                },
                { root: null, threshold: 0 }
            )
            io.observe(sentinel)
            return () => io.disconnect()
        } else {
            // fallback for very old browsers
            const getY = () => window.pageYOffset || document.documentElement.scrollTop || 0
            const onScroll = () => setShowMainNav(getY() <= 200)
            window.addEventListener('scroll', onScroll, { passive: true })
            onScroll()
            return () => window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return (
        <div className="relative">
            {/* Sentinel placed 200px from top of this container */}
            <div
                ref={sentinelRef}
                style={{ position: 'absolute', top: 110, left: 0, width: 1, height: 1, pointerEvents: 'none' }}
                aria-hidden="true"
            />

            {/* Main Nav (only at top) */}
            <div className="xl:block hidden">
                {showMainNav && (
                    <div className="w-full fixed top-0 z-50">
                        <MainNav />
                    </div>
                )}

                <div
                    className={`w-full fixed z-40 transition-all duration-300 ${showMainNav ? 'top-[180px]' : 'top-0'}`}
                >
                    <MenuNav />
                </div>
            </div>

            <div className="xl:hidden block">
                <div className={`w-full fixed z-40 transition-all duration-300`}>
                    <MobileTabNav />
                </div>
            </div>

            {/* Main Content */}
            <div className="xl:pt-[210px] pt-10">
                <Outlet />
            </div>
            
            <div className="">
                <Footer />
            </div>
        </div>
    )
}

export default BuyerDash