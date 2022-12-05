import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { numberWithCommas } from '../../App'
import MobileSideBar from '../../Components/Sidebar/MobileSideBar'
import SidebarNav from '../../Components/Sidebar/Sidebar'
import { updateOrder } from '../../Redux/actions'

import './Orders.css'

function Orders () {
  const order = useSelector(state => state.order)
  const auth = useSelector(state => state.auth)
  const [type, setType] = useState(null)
  const dispatch = useDispatch()
  let [orderProgress, setOrderProgress] = useState(1)

  function onOrderUpdate (orderId) {
    const payload = {
      orderId,
      type
    }
    auth.authenticated && dispatch(updateOrder(payload))
  }

  function formatDate (date) {
    if (date) {
      const d = new Date(date)
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    }
  }

  return (
    <div className='layout-container'>
      <SidebarNav />
      <MobileSideBar />
      <div className='home-container'>
        <h1 className='home-header-text'>Orders</h1>

        {order.orders.map((orderItem, index) => (
          <>
   
            <div className='order-container' key={orderItem._id}>
              <small> OrderId: {orderItem._id}</small>
              <div className='order-content'>
                <div className='orderTrack'>
                  {orderItem.orderStatus.map(status => (
                    <div
                      className={`orderStatus ${
                        status.isCompleted ? 'active' : ''
                      }`}
                    >
                      <div
                        className={`point ${
                          status.isCompleted ? 'active' : ''
                        }`}
                      ></div>
                      <div className='orderInfo'>
                        <div className='status'>{status.type}</div>
                        <div className='date'>{formatDate(status.date)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className='order-product-container'>
                  <div className='order-product-content'>
                    <div className='other-item-container'>
                      <p>Items</p>
                      {orderItem.items.map((item, index) => (
                        <div>
                          <p>
                            <span>{index + 1}</span> {item.productId.name}
                          </p>
                        </div>
                      ))}
                    </div>
                    <>
                      <div>
                        <p>Total price</p>
                        <p> {numberWithCommas(orderItem.totalAmount)}</p>
                      </div>
                      <div>
                        <p>Payment type</p>
                        <p>
                          {orderItem.paymentType === 'cod'
                            ? 'Cash on delivery'
                            : orderItem.paymentType}
                        </p>
                      </div>
                      <div>
                        <p>Payment status</p>
                        <p>{orderItem.paymentStatus}</p>
                      </div>
                    </>
                  </div>
                </div>
              </div>
              {!orderItem.orderStatus[3].isCompleted && (
                <div className='orderstatus-container'>
                  <select name='' id='' onChange={e => setType(e.target.value)}>
                    <option>Order status</option>

                   
                    {orderItem.orderStatus.map(status => {
                    
                      return (
                        <>
                          {!status.isCompleted && (
                            <option key={status.type} value={status.type}>
                              {status.type}
                            </option>
                          )}
                        </>
                      )
                    })}
                  </select>
                  <button onClick={() => onOrderUpdate(orderItem._id)}>
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default Orders
