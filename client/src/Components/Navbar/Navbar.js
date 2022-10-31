import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../Redux/actions/Category/CategoryAction'
import { Link } from 'react-router-dom'

function Navbar () {
  const [showCategory, setShowCategory] = useState(false)

  const category = useSelector(state => state.category)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategory())
  }, [])

  function renderCategories (categories) {
    let allCategories = []
    for (let category of categories) {
      allCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <a href={category.slug}>{category.name}</a>
          ) : (
            <span>{category.name}</span>
          )}
          {category.children.length > 0 && (
            <ul>{renderCategories(category.children)}</ul>
          )}
        </li>
      )
    }
    return allCategories
  }

  function categoryHeader () {
    return (
      showCategory && (
        <div>
          <ul>
            {category.categories.length > 0
              ? renderCategories(category.categories)
              : null}
          </ul>
        </div>
      )
    )
  }

  return (
    <nav className='navbar-container'>
      <Link to='/' className='link'>
        <h3>
          <i className='fa-solid fa-cart-plus'></i>
          Elimart
        </h3>
      </Link>
      <div className='category-header'>
        <p onClick={() => setShowCategory(show => !show)}>
          Categories
          {showCategory ? (
            <i className='fa-solid fa-angle-up'></i>
          ) : (
            <i className='fa-solid fa-angle-down'></i>
          )}
        </p>

        {categoryHeader()}
      </div>
      <div className='input-container'>
        <input type='text' name='' id='' placeholder='Search' />
        <div className='search-container'>
          <i className='fa-solid fa-magnifying-glass'></i>
        </div>
      </div>
      <p>
        <i className='fa-solid fa-cart-arrow-down'></i>
        Cart
      </p>
      <p>
        <i className='fa-regular fa-user'></i>
        Account
      </p>
    </nav>
  )
}

export default Navbar
