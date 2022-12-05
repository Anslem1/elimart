import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { log } from '../../Midlleware'
import { getProductBySlug } from '../../Redux/actions'
import getParams from '../../Utility/getParams'
import './Allproducts.css'
import NonPageProducts from './NonPageProducts/NonPageProducts'
import ProductPage from './ProductPage/ProductPage'
import ProductStore from './ProductStore/ProductStore'

function Allproducts () {
  const location = useLocation()
  const path = location.pathname.split('/')[1]
  const dispatch = useDispatch()
  const product = useSelector(state => state.products)

  // log(product)

  useEffect(() => {
    dispatch(getProductBySlug(path))
  }, [])

  function renderProducts () {
    const params = getParams(location.search)
    let content = null
    switch (params && params.pagetype) {
      case 'Store':
        content = <ProductStore />
        break
      case 'Page':
        content = <ProductPage />
        break
      default:
        content = (
          <div className='nonpage-container'>
            {product.products.map(product => (
              <NonPageProducts product={product} />
            ))}
          </div>
        )
        // content = null
        break
    }
    return content
  }

  return <main className='all-product-container'>{renderProducts()}</main>
}

export default Allproducts
