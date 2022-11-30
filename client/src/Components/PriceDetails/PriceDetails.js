import React from 'react'
import { numberWithCommas } from '../../Midlleware'
import './PriceDetails.css'

export default function PriceDetails ({ totalPrice, totalItem }) {
  return (
    <>
      <div className='page-price-item'>
        <div className='page-details-container'>
          <div className='total-item-container'>
            <span>Total item(s):</span>
            <p> {totalItem} </p>
          </div>
          <div className='total-item-container'>
            <span>Total price:</span>
            <p> {numberWithCommas(totalPrice)} </p>
          </div>
        </div>
      </div>
    </>
  )
}
