import React from 'react'
import 'react-step-progress-bar/styles.css'
import './CheckoutProgressBar.css'

import { ProgressBar, Step } from 'react-step-progress-bar'

function CheckoutProgressBar (props) {
  return (
    <ProgressBar
      percent={((props.step - 1) * 100) / 3}
      filledBackground='linear-gradient(to right, #fefb72, #f0bb31)'
    >
      <Step transition='scale'>
        {({ accomplished, index }) => (
          <div className='bar'>
            <div className={`step ${accomplished ? 'completed' : ''}`}></div>
            <span className='login-progress'>Login or sign up</span>
          </div>
        )}
      </Step>
      <Step transition='scale'>
        {({ accomplished, index }) => (
          <div className='bar'>
            <div className={`step ${accomplished ? 'completed' : ''}`}></div>
            <span className='login-progress'>Delivery address</span>
          </div>
        )}
      </Step>
      <Step transition='scale'>
        {({ accomplished, index }) => (
          <div className='bar'>
            <div className={`step ${accomplished ? 'completed' : ''}`}></div>
            <span className='login-progress'>Order summary</span>
          </div>
        )}
      </Step>
      <Step transition='scale'>
        {({ accomplished, index }) => (
          <div className='bar'>
            <div className={`step ${accomplished ? 'completed' : ''}`}></div>
            <span className='login-progress'>Payment option</span>
          </div>
        )}
      </Step>
    </ProgressBar>
  )
}

export default CheckoutProgressBar
