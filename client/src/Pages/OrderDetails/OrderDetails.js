import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../../Redux/actions'
import './OrderDetails.css'

function OrderDetails () {
  const dispatch = useDispatch()
  const params = useParams()
  const orderDetails = useSelector(state => state.user.orderDetails)

  useEffect(() => {
    const { orderId } = params

    const payload = {
      orderId
    }
    dispatch(getOrder(payload))
  }, [])

  const formatDate = date => {
    if (date) {
      const d = new Date(date)
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    }
    return ''
  }

  const formatDate2 = date => {
    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]
    if (date) {
      const d = new Date(date)
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    }
  }

  if (!(orderDetails && orderDetails.address)) return null

  return (
    <>
      <div className='order-details-container'>
        <div className='order-details-content'>
          <p>
            <strong>Delivering at</strong>
          </p>
          <p>{orderDetails.address.address}</p>
        </div>
        <div className='order-details-content'>
          <p>
            <strong>Devlivering to</strong>
          </p>
          <p>{orderDetails.address.name}</p>
        </div>
        <div className='order-details-content'>
          <p>
            <strong>Mobile number</strong>
          </p>

          <p>{orderDetails.address.mobileNumber}</p>
        </div>
        <div className='order-details-content'>
          <p>
            <strong>Item</strong>
          </p>

          {orderDetails.items.map((item, index) => (
            <>
            
              <div className='flexRow'>
                <div className='delItemImgContainer'>
                  <img src={item.productId.productPictures[0].images} alt='' />
                </div>
                <div style={{ width: '250px', fontFamily: 'Roboto' }}>
                  <div className='delItemName'>{item.productId.name}</div>
                  <p
                    style={{
                      marginTop: '10px',
                      fontFamily: 'Open sans',
                      fontSize: '15px'
                    }}
                  >
                    Quanity: {item.purchasedQuantity}
                  </p>
                  {/* <Price value={item.payablePrice} /> */}
                </div>
              </div>
              <div style={{ padding: '25px 50px' }}>
                <div className='orderTrack'>
                  {orderDetails.orderStatus.map(status => (
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
              <div style={{ fontWeight: '500', fontSize: 14 }}>
                {orderDetails.orderStatus[3].isCompleted &&
                  `Delivered on ${formatDate2(
                    orderDetails.orderStatus[3].date
                  )}`}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default OrderDetails
