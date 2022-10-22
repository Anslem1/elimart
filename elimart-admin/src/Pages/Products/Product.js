import React from 'react'
import MobileSideBar from '../../Components/Sidebar/MobileSideBar';
import SidebarNav from '../../Components/Sidebar/Sidebar'

function Product () {
  const token = localStorage.getItem('token')

  return (
    <div className='layout-container'>
     <SidebarNav />
        <MobileSideBar />
      <div className='home-container'>
        <h1 className='home-header-text'>Products</h1>
      </div>
    </div>
  )
}

export default Product
