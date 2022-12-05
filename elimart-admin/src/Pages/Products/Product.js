import React, { useState } from 'react'
import MobileSideBar from '../../Components/Sidebar/MobileSideBar'
import SidebarNav from '../../Components/Sidebar/Sidebar'
import './Product.css'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../Redux/actions'
import Producttable from './Producttable'

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

function Product () {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  let [productPicture, setProductPicture] = useState([])
  const [category, setCategory] = useState('')
  const categories = useSelector(state => state.category)

  const dispatch = useDispatch()

  const token = localStorage.getItem('token')
  const [open, setOpen] = useState(false)
  const [modalIsOpen, setIsOpen] = React.useState(false)
  let subtitle
  function openModal () {
    setIsOpen(true)
  }
  function afterOpenModal () {
    subtitle.style.color = '#f00'
  }
  function closeModalWithoutSubmit () {
    setIsOpen(false)
  }
  function closeModal () {
    const form = new FormData()
    form.append('name', name)
    form.append('price', price)
    form.append('description', description)
    form.append('category', category)
    form.append('quantity', quantity)

    for (let picture of productPicture) {
      form.append('productPicture', picture)
    }
    if (
      name ||
      price ||
      description ||
      category ||
      quantity ||
      productPicture.length === 0
    ) {
      dispatch(addProduct(form))
      setIsOpen(false)
      setName('')
      setCategory('')
      setDescription('')
      setPrice('')
      setProductPicture([])
      setCategory('')
    } else setIsOpen(false)
  }




  function handleProductPicture (e) {
    setProductPicture([...e.target.files])
  }

  function categoryOptions (categoriesOptions, options = []) {
    for (let categoryOption of categoriesOptions) {
      options.push({ value: categoryOption._id, name: categoryOption.name })

      if (categoryOption.children.length > 0) {
        categoryOptions(categoryOption.children, options)
      }
    }
    return options
  }

  return (
    <>
      <main className='layout-container'>
        <SidebarNav />
        <MobileSideBar />
        <div className='home-container'>
          <h1 className='home-header-text'>Products</h1>
          <div className='category-header-container'>
            <button className='add-category-btn' onClick={openModal}>
              <i className='fa-solid fa-plus'></i>
              Create
            </button>
          </div>
          <div className='table-container'>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModalWithoutSubmit}
              onAfterOpen={afterOpenModal}
              style={customStyles}
              contentLabel='Example Modal'
              ariaHideApp={false}
            >
              <div className='modal-container'>
                <h2 className='add-category-header'>Add new product</h2>
                <div className='category-name-container'>
                  <label>Product name</label>
                  <input
                    type='text'
                    placeholder='Product name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className='category-name-container'>
                  <label>Product price</label>
                  <input
                    type='number'
                    placeholder='Product price'
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                </div>
                <div className='category-name-container'>
                  <label>Product description</label>
                  <input
                    type='text'
                    placeholder='Product description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
                <div className='category-name-container'>
                  <label>Product quantity</label>
                  <input
                    type='number'
                    placeholder='Product quantity'
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                  />
                </div>
                <div className='category-name-container'>
                  <label>Category</label>

                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option>--select category--</option>
                    {categoryOptions(categories.categories).map(
                      categoryOption => {
                        return (
                          <option
                            value={categoryOption.value}
                            key={categoryOption.value}
                          >
                            {categoryOption.name}
                          </option>
                        )
                      }
                    )}
                  </select>
                </div>

                {/* {productPicture.length > 0
                  ? productPicture.map((picture, index) => {
                      return <div key={index}>{picture.name}</div>
                    })
                  : null} */}
                <input
                  type='file'
                  name='categoryImage'
                  multiple
                  onChange={handleProductPicture}
                />
              </div>
              <div
                style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
              >
                <button onClick={closeModal} className='add-category-btn'>
                  Add
                </button>

                <button
                  onClick={closeModalWithoutSubmit}
                  className='add-category-btn delete'
                >
                  Cancel
                </button>
              </div>
            </Modal>
            <Producttable />
          </div>
        </div>
      </main>
    </>
  )
}

export default Product
