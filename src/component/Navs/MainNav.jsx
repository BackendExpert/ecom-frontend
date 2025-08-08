import React from 'react'
import TopNav from './TopNav'
import SecNav from './SecNav'
import BigNav from './BigNav'

const MainNav = () => {
  return (
    <div>
        <div className="">
            <TopNav />
        </div>
        <div className="">
            <SecNav />
        </div>
        <div className="">
            <BigNav />
        </div>
    </div>
  )
}

export default MainNav