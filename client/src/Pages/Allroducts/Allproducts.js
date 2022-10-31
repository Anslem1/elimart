import React, { useEffect, useState } from 'react'
import './Allproducts.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProductBySlug } from '../../Redux/actions'
import { useLocation } from 'react-router-dom'
import { generatePublicURL } from '../../Redux/helpers/urlConfig'

function Allproducts (props) {
  const dispatch = useDispatch()
  const location = useLocation()
  const path = location.pathname.split('/')[1]
  const [priceUnder, setPriceUnder] = useState({
    under30k: 30000,
    under60k: 60000,
    under80k: 80000,
    under100k: 100000,
    under120k: 120000
  })

  const product = useSelector(state => state.products)
  console.log(product)

  function numberWithCommas (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  useEffect(() => {
    dispatch(getProductBySlug(path))
  }, [])

  return (
    <main className='all-product-container'>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <>
            <div className='card'>
              <p>
                {path} devices under ₦{numberWithCommas(priceUnder[key])}
              </p>
              <button>View</button>{' '}
            </div>

            <div className='products'>
              {product.productsByPrice[key].map(product => {
                return (
                  <div className='product-container'>
                    <div>
                      <div className='product-img-container'>
                        <img
                          src={generatePublicURL(
                            product.productPictures[0].images
                          )}
                          alt=''
                        />
                      </div>
                      <div className='product-header'>
                        <p>{product.name}</p>
                        <p>₦{numberWithCommas(product.price)}</p>
                      </div>
                      <div className='rating'>
                        <span>4.3</span>
                        <span>({product.quantity})</span>
                      </div>
                      <p>Add to cart</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )
      })}
    </main>
  )
}

export default Allproducts
