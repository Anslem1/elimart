import { useLocation } from 'react-router-dom'
import getParams from '../../Utility/getParams'
import './Allproducts.css'
import Product from './Product/Product'
import ProductPage from './ProductPage/ProductPage'
import ProductStore from './ProductStore/ProductStore'

function Allproducts () {
  const location = useLocation()

  function renderProducts () {
    const params = getParams(location.search)

    console.log(params)

    let content = null
    switch (params.pagetype) {
      case 'Store':
        content = <ProductStore />
        break
      case 'Page':
        content = <ProductPage />
        break
      case 'Product':
        content = <Product />
        break

      default:
        content = null
        break
    }
    return content
  }

  return (
    <main className='all-product-container'>
      {renderProducts()}
    </main>
  )
}

export default Allproducts
