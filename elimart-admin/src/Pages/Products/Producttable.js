import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'
import './ProductTable.css'
import { generatePublicURL } from '../../Redux/helpers/urlConfig'

function Producttable () {
  const [productDetailModal, setProductDetailModal] = useState(false)
  const [productDetails, setProductDetails] = useState(null)

  const product = useSelector(state => state.product)

  function handleCloseProductDetailsModal () {
    setProductDetailModal(false)
  }
  function showroductDetailModal (product) {
    setProductDetailModal(true)
    setProductDetails(product)
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      width: '80%',
      transform: 'translate(-50%, -50%)'
    }
  }
  function numberWithCommas (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  function renderProductDetailsModal () {
    if (!productDetails) {
      return null
    }

    return (
      <Modal
        isOpen={productDetailModal}
        onRequestClose={handleCloseProductDetailsModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className='product-detail-container'>
          <div className='product-content'>
            <div className='product-info-container'>
              <div className='product-info'>
                <label htmlFor=''>Name</label>
                <p>{productDetails.name}</p>
              </div>
              <div className='product-info'>
                <label htmlFor=''>Price</label>
                <p>₦{numberWithCommas(productDetails.price)}</p>
              </div>
            </div>

            <div className='product-info-container'>
              <div className='product-info'>
                <label htmlFor=''>Category</label>
                <p>{productDetails.category.name}</p>
              </div>
              <div className='product-info'>
                <label htmlFor=''>Quantity</label>
                <p>{productDetails.quantity}</p>
              </div>
            </div>

            <div className='product-info-container'>
              <div className='product-info'>
                <label htmlFor=''>Decription</label>
                <p>{productDetails.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='img-container'>
          <label className=''>Product images</label>
          <div className='img-content'>
            {productDetails.productPictures.map(picture => {
              return (
                <div className='product-image-container' key={picture.images}>
                  <img src={generatePublicURL(picture.images)} alt='' />
                </div>
              )
            })}
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <div className='container'>
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              {/* <th>Description</th> */}
              <th>Quantity</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody className='t-body'>
            {product.products.length > 0
              ? product.products.map((product, index) => {
                  return (
                    <tr
                      onClick={() => showroductDetailModal(product)}
                      key={product._id}
                    >
                      <td>{index + 1}</td>
                      <td className='table-name'>{product.name}</td>
                      <td>₦{numberWithCommas(product.price)}</td>
                      {/* <td>{product.description}</td> */}
                      <td>{product.quantity}</td>
                      <td>{product.category.name}</td>
                    </tr>
                  )
                })
              : null}
          </tbody>
        </table>
        {renderProductDetailsModal()}
      </div>
    </div>
  )
}

export default Producttable