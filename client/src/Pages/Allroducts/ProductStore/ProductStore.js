import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductBySlug } from '../../../Redux/actions'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import './ProductStore.css'
import { numberWithCommas } from '../../../Midlleware'
function ProductStore () {
  // const [showProduct, swtShowProduct] = useState(false)

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
  const priceRange = product.priceRange

  useEffect(() => {
    dispatch(getProductBySlug(path))
  }, [])

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <>
            <div className='card'>
              <p>
                {path} under {numberWithCommas(priceRange[key])}
              </p>
              <button>View</button>{' '}
            </div>

            <div className='products'>
              {product.productsByPrice[key].map(product => {
                return (
                  <Link
                    className='product-container link'
                    style={{ display: 'block' }}
                    to={`/${product.slug}/${product._id}/product`}
                  >
                    <div>
                      <div className='product-img-container'>
                        <img src={product.productPictures[0].images} alt='' />
                      </div>
                      <div className='product-header'>
                        <p>{product.name}</p>
                        <p>{numberWithCommas(product.price)}</p>
                      </div>
                      <div className='rating'>
                        <span>({product.quantity})</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )
      })}
    </>
  )
}

export default ProductStore
