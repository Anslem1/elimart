import React from 'react'
import { Link } from 'react-router-dom'
import './SidebarNav.css'

function SidebarNav () {

  return (
    <>
      <div className='sidebar-container'>
        <div className='ul'>
          <li className='li'>
            <Link className='link' to={'/'}>
              Home
            </Link>
          </li>
          <li className='li'>
            <Link className='link' to={'/products'}>
              Products
            </Link>
          </li>
          <li className='li'>
            <Link className='link' to={'/orders'}>
              Orders
            </Link>
          </li>
          <li className='li'>
            <Link className='link' to={'/category'}>
              Category
            </Link>
          </li>
          <li className='li'>
            <Link className='link' to={'/page-type'}>
              Pages
            </Link>
          </li>
        </div>
      </div>
    </>
  )
}

export default SidebarNav
