import React from 'react'

function Empty (props) {
  return (
    <>
      <div className='empty-cart'>
        <h1>
          {props.title}
          <i className='fa-solid fa-magnifying-glass'></i>{''}
        </h1>
      </div>
    </>
  )
}

export default Empty
