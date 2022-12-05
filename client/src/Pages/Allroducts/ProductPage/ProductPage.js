import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getProductPageType } from '../../../Redux/actions'
import getParams from '../../../Utility/getParams'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import './ProductPage.css'

function ProductPage () {
  const dispatch = useDispatch()
  const product = useSelector(state => state.products)
  const { Page } = product

  const location = useLocation()

  useEffect(() => {
    const params = getParams(location.search)



    const payload = {
      params
    }
    dispatch(getProductPageType(payload))
  }, [])
  
  return (
    <>
      <h1 className='page-title'>{Page.title}</h1>
      <div
        className='carousel-container'
        style={{
          width: '90%',
          heigth: '100px',
          display: 'table',
          margin: '0 auto'
        }}
      >
        <Carousel
          renderThumbs={() => {}}
          infiniteLoop='true'
          dynamicHeight='true'
        >
          {Page.bannerImages &&
            Page.bannerImages.map((bannerImage, index) => {
              return (
                <a
                  key={index}
                  style={{ display: 'block' }}
                  href={bannerImage.navigateTo}
                >
                  <img src={bannerImage.images} alt='' />
                </a>
              )
            })}
        </Carousel>
      </div>
      <div className='productpage-content'>
        <div className='page-product-container'>
          {Page.productImages &&
            Page.productImages.map((productImage, index) => {
              return (
                <a key={index} href={productImage.navigateTo}>
                  <img src={productImage.images} alt='' />
                </a>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default ProductPage
