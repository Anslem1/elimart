import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../Navbar/Navbar'

function Body () {
  const auth = useSelector(state => state.auth)

  return (
    <>
      <Navbar />
    </>
  )
}

export default Body
