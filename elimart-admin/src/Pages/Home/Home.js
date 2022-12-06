import React from 'react'
import { useSelector } from 'react-redux'
import MobileSideBar from '../../Components/Sidebar/MobileSideBar'
import SidebarNav from '../../Components/Sidebar/Sidebar'
import './Home.css'

function Home () {
  const auth = useSelector(state => state.auth)
  return (
    <>
      <div className='layout-container'>
        <SidebarNav />
        <MobileSideBar />
        <div className='home-container'>
          <h1 className='home-header-text'>Welcome, {auth.user.username}</h1>
          <a
            href='https://elimart.onrender.com'
            style={{ top: '30px', textDecoration: 'none', color: 'white' }}
          >
            <button
              className='signin'
              style={{
                position: 'absolute',
                textDecoration: 'none',
                top:'20%',
                color: 'white'
              }}
            >
              Go to Elimart
            </button>
          </a>
        </div>
      </div>
    </>
  )
}

export default Home
