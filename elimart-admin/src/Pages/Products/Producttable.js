import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import './ProductTable.css'
import { numberWithCommas } from '../../App'
import { deleteProductById } from '../../Redux/actions'

function Producttable () {
  const [productDetailModal, setProductDetailModal] = useState(false)
  const [productDetails, setProductDetails] = useState(null)

  const product = useSelector(state => state.product)

  const dispatch = useDispatch()

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
  // function numberWithCommas (x) {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  // }

  function deleteProduct (_id) {
    const payload = {
      productId: _id
    }
    dispatch(deleteProductById(payload))
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
                <p>{numberWithCommas(productDetails.price)}</p>
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
                  <img src={picture.images} alt='' />
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
              <th>No.</th>
              <th>Name</th>
              <th>Price</th>

              <th>Quantity</th>
              <th>Category</th>
              <th>Info</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody className='t-body'>
            {product.products.length > 0
              ? product.products.map((product, index) => {
                  return (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td className='table-name'>{product.name}</td>
                      <td className='table-price'>
                        {numberWithCommas(product.price)}
                      </td>
                      {/* <td>{product.description}</td> */}
                      <td>{product.quantity}</td>
                      <td>{product.category.name}</td>
                      <td>
                        <button
                          onClick={() => showroductDetailModal(product)}
                          style={{
                            padding: '3px 15px',
                            borderRadius: '10px',
                            border: 'none',
                            backgroundColor: 'rgb(102, 181, 238)'
                          }}
                        >
                          Info
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          style={{
                            padding: '3px 10px',
                            borderRadius: '10px',
                            border: 'none',
                            backgroundColor: 'red',
                            color: '#fff'
                          }}
                        >
                          Delete
                        </button>
                      </td>
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
