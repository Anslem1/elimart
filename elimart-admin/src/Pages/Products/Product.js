import React, { useState } from 'react'
import MobileSideBar from '../../Components/Sidebar/MobileSideBar'
import SidebarNav from '../../Components/Sidebar/Sidebar'
import './Product.css'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../Redux/actions';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '50vh',
    transform: 'translate(-50%, -50%)'
  }
}

function Product () {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [productPicture, setProductPicture] = useState([])
  const [category, setCategory] = useState('')
  const categories = useSelector(state => state.categories)

  const dispatch = useDispatch()

  const token = localStorage.getItem('token')
  const [open, setOpen] = useState(false)
  const toggleModal = () => setOpen(isOpen => !isOpen)
  const [modalIsOpen, setIsOpen] = React.useState(false)
  let subtitle
  function openModal () {
    setIsOpen(true)
  }
  function afterOpenModal () {
    subtitle.style.color = '#f00'
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
    dispatch(addProduct(form))
    setIsOpen(false)
  }

  function handleProductPicture (e) {
    setProductPicture([...productPicture, e.target.files[0]])
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
    <main className='layout-container'>
      <SidebarNav />
      <MobileSideBar />
      <div className='home-container'>
        <h1 className='home-header-text'>Products</h1>
        <div className='category-container'>
          <div className='category-header-container'>
            <button className='add-category-btn' onClick={openModal}>
              <i className='fa-solid fa-plus'></i>
              Create
            </button>
          </div>
          <div>
            {/* <ul className='category-ul'>
              {renderCategories(categories.categories)}
            </ul> */}
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
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
                    type='text'
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
                    type='text'
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

                {productPicture.length > 0
                  ? productPicture.map((picture, index) => {
                      return <div key={index}>{picture.name}</div>
                    })
                  : null}
                <input
                  type='file'
                  name='categoryImage'
                  onChange={handleProductPicture}
                />
              </div>
              <button onClick={closeModal} className='add-category-btn'>
                Add
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Product