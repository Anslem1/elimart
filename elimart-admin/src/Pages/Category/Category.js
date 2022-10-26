import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MobileSideBar from '../../Components/Sidebar/MobileSideBar'
import SidebarNav from '../../Components/Sidebar/Sidebar'
import { addCategory, getAllCategories } from '../../Redux/actions'
import Modal from 'react-modal'
// import 'bootstrap/dist/css/bootstrap.min.css'


import './Category.css'
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
function Category () {
  const disatch = useDispatch()
  const [categoryName, setcategoryName] = useState('')
  const [categoryImage, setcategoryImage] = useState('')
  const [parentCategoryId, setParentCategoryId] = useState('')

  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const toggleModal = () => setOpen(isOpen => !isOpen)
  const [modalIsOpen, setIsOpen] = React.useState(false)
  let subtitle
  function openModal () {
    setIsOpen(true)
  }
  function afterOpenModal () {
    subtitle.styles.color = '#f00'
  }

  function closeModalWithoutSubmit () {
    setIsOpen(false)
  }

  function closeModal () {
    const form = new FormData()

    form.append('name', categoryName)
    form.append('parentId', parentCategoryId)
    form.append('categoryImage', categoryImage)

    if (categoryName || parentCategoryId || categoryImage) {
      dispatch(addCategory(form))
      setParentCategoryId('')
      setcategoryName('')
      setcategoryImage('')
      setIsOpen(false)
    } else {
      setParentCategoryId('')
      setcategoryName('')
      setcategoryImage('')
      setIsOpen(false)
    }
  }

  function renderCategories (categories) {
    let allCategories = []
    for (let category of categories) {
      allCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 && (
            <ul>{renderCategories(category.children)}</ul>
          )}
        </li>
      )
    }
    return allCategories
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

  function handleCategoryImage (e) {
    setcategoryImage(e.target.files[0])
  }

  return (
    <>
      <main className='layout-container'>
        <SidebarNav />
        <MobileSideBar />
        <div className='category-container'>
          <div className='category-header-container'>
            <h1 className='category-header-text'>Category</h1>
            <button className='add-category-btn' onClick={openModal}>
              <i className='fa-solid fa-plus'></i>
              Create
            </button>
          </div>
          <div>
            <ul className='category-ul'>
              {renderCategories(categories.categories)}
            </ul>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModalWithoutSubmit}
              style={customStyles}
              contentLabel='Example Modal'
              ariaHideApp={false}
            >
              <div className='modal-container'>
                <h2 className='add-category-header'>Add new category</h2>
                <div className='category-name-container'>
                  <label>Category name</label>
                  <input
                    type='text'
                    placeholder='Category name'
                    value={categoryName}
                    onChange={e => setcategoryName(e.target.value)}
                  />
                </div>
                <div className='category-name-container'>
                  <label>Category</label>

                  <select
                    value={parentCategoryId}
                    onChange={e => setParentCategoryId(e.target.value)}
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
                <input
                  type='file'
                  name='categoryImage'
                  onChange={handleCategoryImage}
                />
              </div>
              <button onClick={closeModal} className='add-category-btn'>
                Add
              </button>
            </Modal>
          </div>
        </div>
      </main>
    </>
  )
}

export default Category
