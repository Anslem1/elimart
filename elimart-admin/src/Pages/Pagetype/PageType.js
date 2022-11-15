import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import MobileSideBar from '../../Components/Sidebar/MobileSideBar'
import SidebarNav from '../../Components/Sidebar/Sidebar'
import categoryOptions from '../../middlewares/CategoryMiddleware'
import { createPage } from '../../Redux/actions/Pagetype/PageTypeAction'
// import Alert from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { AlertTitle, Button } from '@mui/material'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '90%',
    transform: 'translate(-50%, -50%)'
  }
}

function PageType () {
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [title, setTitle] = useState('')
  const category = useSelector(state => state.category)
  const _pageType = useSelector(state => state.pagetype)

  const [categories, setCategories] = useState([])
  const [bannerImages, setBannerImages] = useState([])
  const [productImages, setProductImages] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [description, setDescription] = useState('')
  const [pageType, setPageType] = useState('')

  const dispatch = useDispatch()

  let subtitle
  function openModal () {
    setModalIsOpen(true)
  }
  function afterOpenModal () {
    subtitle.style.color = '#f00'
  }

  function closeModalWithoutSubmit () {
    setModalIsOpen(false)
  }
  useEffect(() => {
    setCategories(categoryOptions(category.categories))
  }, [category])

  useEffect(() => {
    if (!_pageType.loading) setTitle('')
    setDescription('')
    setDescription('')
    setCategoryId('')

    setBannerImages([])
    setProductImages([])
  }, [_pageType])

  function pageTypeSelect (e) {
    const pageTypeCategory = categories.find(
      category => category.value == e.target.value
    )

    setCategoryId(e.target.value)
    setPageType(pageTypeCategory)
  }

  function handleBannerImages (e) {
    setBannerImages([...bannerImages, e.target.files[0]])
  }
  function handleProductImages (e) {
    setProductImages([...productImages, e.target.files[0]])
  }

  function submitPageType () {
    const form = new FormData()
    if (
      (title &&
        description &&
        categoryId &&
        pageType &&
        bannerImages.length > 0) ||
      productImages.length > 0
    ) {
      form.append('title', title)
      form.append('description', description)
      form.append('category', categoryId)
      form.append('pagetype', pageType)
      setModalIsOpen(false)

      bannerImages.forEach((bannerImage, index) => {
        form.append('bannerImages', bannerImage)
      })

      productImages.forEach((productImage, index) => {
        form.append('productImages', productImage)
      })

      dispatch(createPage(form))
    } else {
      alert('All field required')
    }
  }

  function renderPageTypeModal () {
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModalWithoutSubmit}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel='Example Modal'
        ariaHideApp={false}
      >
        <div className='modal-container'>
          <h2 className='add-category-header' style={{ textAlign: 'center' }}>
            Page type
          </h2>

          <div className='category-name-container'>
            <label>Page title</label>

            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder='page title'
            />
          </div>
          <div className='category-name-container'>
            <label>Page decription</label>

            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder='page description'
            />
          </div>
          <div className='category-name-container'>
            <label>Category</label>
            <select value={categoryId} onChange={pageTypeSelect}>
              <option> select category</option>
              {categories.map(cate => (
                <option key={cate.value} value={cate.value}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>

          <div className='category-name-container'>
            <label>Banner images</label>
            {bannerImages.length > 0
              ? bannerImages.map((bannerimage, index) => {
                  return (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      key={index}
                    >
                      {bannerimage.name}
                    </div>
                  )
                })
              : null}

            <input
              type='file'
              multiple
              name='banners'
              onChange={handleBannerImages}
            />
          </div>
          <div className='category-name-container'>
            <label>Product images</label>
            {productImages.length > 0
              ? productImages.map((productImage, index) => {
                  return (
                    <div
                      style={{ display: 'flex', flexDirection: 'column' }}
                      key={index}
                    >
                      {' '}
                      {productImage.name}
                    </div>
                  )
                })
              : null}

            <input
              type='file'
              multiple
              name='banners'
              onChange={handleProductImages}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={submitPageType} className='add-category-btn'>
            Add
          </button>

          <button
            className='add-category-btn delete'
            onClick={closeModalWithoutSubmit}
          >
            Cancel
          </button>
        </div>
      </Modal>
    )
  }

  return (
    <div className='layout-container'>
      <SidebarNav />
      <MobileSideBar />
      <div className='home-container'>
        <h1 className='home-header-text'>Page type</h1>
        <div className='home-container'>
          <div className='category-header-container'>
            <button className='add-category-btn' onClick={openModal}>
              <i className='fa-solid fa-plus'></i>
              Create
            </button>
          </div>
          {renderPageTypeModal()}
        </div>
      </div>
    </div>
  )
}

export default PageType
