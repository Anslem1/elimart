import React from 'react'
import { Link } from 'react-router-dom'

function MobileSideBar () {
  return (
    <>
      <div className='mobile-sidebar-container'>
        <div className='ul'>
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
          <li className='mobile-li'>
            <Link className='link' to={'/category'}>
              <i className='fa-solid fa-cubes'></i>
            </Link>
          </li>
          <li className='mobile-li'>
            <Link className='link' to={'/page-type'}>
              <i className='fa-regular fa-note-sticky'></i>
            </Link>
          </li>
        </div>
      </div>
    </>
  )
}

export default MobileSideBar
