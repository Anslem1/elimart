import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { numberWithCommas } from '../../Midlleware'
import { Link } from 'react-router-dom'

import './Order.css'

function Order () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <>
      <div className='order-container'>
        {user.orders.map(order => {
          return order.items.map((item, index) => {
            // console.log({item})
            return (
              <Link className='link' to={`/order_details/${order._id}`}>
                <div className='order-content'>
                  <div className='order-image-container'>
                    <img
                      src={item.productId.productPictures[0].images}
                      alt=''
                    />
                    <div className='order-name-qunatity'>
                      <p>{item.productId.name}</p>
                      <p>Qty: {item.purchasedQuantity}</p>
                    </div>
                  </div>

                  <div className='payment-status-price'>
                    <p>Payment confirmed</p>
                    <p>{numberWithCommas(item.payablePrice)}</p>
                  </div>
                </div>
              </Link>
            )
          })
        })}
      </div>
    </>
  )
}

export default Order
