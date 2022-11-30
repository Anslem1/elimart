import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductBySlug } from '../../../Redux/actions'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './NonPageProducts.css'
import { log, numberWithCommas } from '../../../Midlleware'

function NonPageProducts ({ product }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const path = location.pathname.split('/')[1]

  useEffect(() => {
    dispatch(getProductBySlug(path))
  }, [])
  log(product)

  return (
    <>
      <Link
        className='link'
        style={{ display: 'block' }}
        to={`/${product.slug}/${product._id}/product`}
      >
        <div className='non-page-content'>
          <div className='non-page-image-container'>
            <img src={product.productPictures[0].images} alt='' />
            <p>{product.name}</p>
            <p>{numberWithCommas(product.price)}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default NonPageProducts
