import React from 'react'
import { Link } from 'react-router-dom'

function MobileSideBar () {
  return (
    <>
      <div className='mobile-sidebar-container'>
              <ul className='ul'>
                
          <li className='mobile-li'>
            <Link className='link' to={'/'}>
              <i className='fa-solid fa-house'></i>
            </Link>
          </li>
          <li className='mobile-li'>
            <Link className='link' to={'/products'}>
          <i className='fa-solid fa-arrow-up-a-z'></i>
            </Link>
          </li>
          <li className='mobile-li'>
            <Link className='link' to={'/orders'}>
              <i className='fa-solid fa-star'></i>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default MobileSideBar
