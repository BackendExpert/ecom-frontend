import React from 'react'
import HeroConent from './HeroSection/HeroConent'
import Catogeries from './Catogeries/Catogeries'

const Home = () => {
    return (
        <div className='mt-8'>
            <div className="">
                <HeroConent />
            </div>
            <div className="">
                <Catogeries />
            </div>
        </div>
    )
}

export default Home