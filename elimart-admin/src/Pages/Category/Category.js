import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MobileSideBar from '../../Components/Sidebar/MobileSideBar'
import SidebarNav from '../../Components/Sidebar/Sidebar'
import {
  addCategory,
  deleteCategories,
  getAllCategory,
  updateCategories
} from '../../Redux/actions'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'

import './Category.css'
import UpdateCategoryModal from './categoryComponents/UpdateCategoriesModal'
import DeleteCategoryModal from './categoryComponents/DeleteCategoryModal'
import AddCategoryModal from './categoryComponents/AddCategoryModal'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '90%',
    diplay: 'block',
    height: '60%',
    overflow: 'auto',
    padding: '10px',
    transform: 'translate(-50%, -50%)'
  }
}
function Category () {
  const disatch = useDispatch()
  const [categoryName, setcategoryName] = useState('')
  const [categoryImage, setcategoryImage] = useState('')
  const [parentCategoryId, setParentCategoryId] = useState('')
  // const [pageType, setPageType] = useState('')
  const [expanded, setExpanded] = useState([])
  const [checked, setChecked] = useState([])
  const [checkedArray, setCheckedArray] = useState([])
  const [expandedArray, setExpandedArray] = useState([])

  const categories = useSelector(state => state.category)
  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false)
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)
  let subtitle
  function openModal () {
    setModalIsOpen(true)
  }
  function afterOpenModal () {
    subtitle.styles.color = '#f00'
  }

  function closeModalWithoutSubmit () {
    setModalIsOpen(false)
    setParentCategoryId('')
    // setcategoryName('')
    setcategoryImage('')
  }

  function afterOpenUpdateModal () {
    subtitle.styles.color = '#f00'
  }

  function closeUpdateModalWithoutSubmit () {
    setUpdateModalIsOpen(false)
  }

  function afterOpenDeleteModal () {
    subtitle.styles.color = '#f00'
  }

  function closeDeleteModalWithoutSubmit () {
    setDeleteCategoryModal(false)
  }

  function submitCategory () {
    const form = new FormData()

    form.append('name', categoryName)
    form.append('parentId', parentCategoryId)
    form.append('categoryImage', categoryImage)
    // form.append('type', pageType)

    if (categoryName) {
      dispatch(addCategory(form))
      setModalIsOpen(false)

      setParentCategoryId('')
      setcategoryName('')
      setcategoryImage('')
    } else {
      alert('Specify what you want to add')
      setParentCategoryId('')
      setcategoryName('')
      setcategoryImage('')

      return
    }
  }

  function renderCategories (categories) {
    let allCategories = []
    for (let category of categories) {
      allCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children)
      })
    }
    return allCategories
  }

  function categoryOptions (categoriesOptions, options = []) {
    for (let categoryOption of categoriesOptions) {
      options.push({
        value: categoryOption._id,
        name: categoryOption.name,
        parentId: categoryOption.parentId,
        pagetype: categoryOption.pagetype
      })

      if (categoryOption.children.length > 0) {
        categoryOptions(categoryOption.children, options)
      }
    }
    return options
  }

  function handleCategoryImage (e) {
    setcategoryImage(e.target.files[0])
  }

  function updatedAndExpandedCategories () {
    const category = categoryOptions(categories.categories)
    const checkedArray = []
    const expandedArray = []

    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const categories = category.find(
          (category, _index) => categoryId === category.value
        )
        category && checkedArray.push(categories)
      })
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const categories = category.find(
          (category, _index) => categoryId === category.value
        )
        category && expandedArray.push(categories)
      })
    setCheckedArray(checkedArray)
    setExpandedArray(expandedArray)
  }

  function openUpdateModal () {
    if (expanded.length > 0 || checked.length > 0) {
      updatedAndExpandedCategories()
      setUpdateModalIsOpen(true)
      checked.length = 0
      checkedArray.length = 0
      expandedArray.length = 0
      expanded.length = 0
    } else {
      alert('Please select what you want to update')
      return
    }
  }

  function updateCategoryForm () {
    const form = new FormData()
    expandedArray.forEach((item, index) => {
      form.append('_id', item.value)
      form.append('name', item.name)
      form.append('parentId', item.parentId ? item.parentId : '')
      form.append('pagetype', item.pagetype)
    })
    checkedArray.forEach((item, index) => {
      form.append('_id', item.value)
      form.append('name', item.name)
      form.append('parentId', item.parentId ? item.parentId : '')
      form.append('pagetype', item.pagetype)
    })

    dispatch(updateCategories(form))
    dispatch(getAllCategory())
    setUpdateModalIsOpen(false)

    checked.length = 0
    expanded.length = 0
  }

  function handleCategoryUpdateInput (key, value, index, type) {
    if (type === 'checked') {
      if (value !== '') {
        const updatedCheckedArray = checkedArray.map((item, _index) =>
          index === _index ? { ...item, [key]: value } : item
        )
        setCheckedArray(updatedCheckedArray)
      } else if (type === 'expanded') {
        const updatedExpandedArray = expandedArray.map((item, _index) =>
          index === _index ? { ...item, [key]: value } : item
        )
        setExpandedArray(updatedExpandedArray)
      }
    } else {
      alert('Feild cannot be empty')
      return
    }
  }

  function deleteCategory () {
    if (checked.length > 0 || expanded.length > 0) {
      updatedAndExpandedCategories()
      setDeleteCategoryModal(true)
      checked.length = 0
      expanded.length = 0
    } else alert('Please select what you want to delete')
    return
  }

  function confirmDeleteCategory () {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value
    }))
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value
    }))
    const idsArray = expandedIdsArray.concat(checkedIdsArray)

    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategories(checkedIdsArray))
      dispatch(getAllCategory())
      setDeleteCategoryModal(false)

      checked.length = 0
      expanded.length = 0
      checkedArray.length = 0
      expandedArray.length = 0
    }
  }

  return (
    <>
      <main className='layout-container'>
        <SidebarNav />
        <MobileSideBar />
        <div className='category-container'>
          <div className='category-header-container'>
            <h1 className='category-header-text'>Category</h1>
          </div>
          <div className='category-modal-container'>
            <CheckboxTree
              nodes={renderCategories(categories.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={checked => setChecked(checked)}
              onExpand={expanded => setExpanded(expanded)}
            />

            {/* ADD CATEGORIES */}

            <AddCategoryModal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModalWithoutSubmit}
              style={customStyles}
              ariaHideApp={false}
              parentCategoryId={parentCategoryId}
              setParentCategoryId={setParentCategoryId}
              categoryName={categoryName}
              handleCategoryImage={handleCategoryImage}
              categoryOptions={categoryOptions(categories.categories)}
              submitCategory={submitCategory}
              setcategoryName={setcategoryName}
            />

            {/* EDIT CATEGORIES AND DELETE CATEGORIES */}

            <div className='delete-edit-container'>
              {
                <>
                  <button className='add-category-btn' onClick={openModal}>
                    <i className='fa-solid fa-plus'></i>
                    Create
                  </button>

                  <button
                    className='add-category-btn edit'
                    onClick={openUpdateModal}
                  >
                    <i className='fa-solid fa-pen'></i>
                    Edit
                  </button>
                  <button
                    className='add-category-btn delete'
                    onClick={deleteCategory}
                  >
                    <i className='fa-solid fa-trash'></i>
                    Delete
                  </button>
                </>
              }

              <UpdateCategoryModal
                isOpen={updateModalIsOpen}
                onAfterOpen={afterOpenUpdateModal}
                onRequestClose={closeUpdateModalWithoutSubmit}
                style={customStyles}
                contentLabel='Example Modal'
                ariaHideApp={false}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryUpdateInput={handleCategoryUpdateInput}
                expanded={expanded}
                checked={checked}
                updateCategoryForm={updateCategoryForm}
                categoryOption={categoryOptions(categories.categories)}
              />

              <DeleteCategoryModal
                isOpen={deleteCategoryModal}
                onAfterOpen={afterOpenDeleteModal}
                onRequestClose={closeDeleteModalWithoutSubmit}
                style={customStyles}
                ariaHideApp={false}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                confirmDeleteCategory={confirmDeleteCategory}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Category
