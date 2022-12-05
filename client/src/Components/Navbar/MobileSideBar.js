import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function MobileSideBar () {
  const category = useSelector(state => state.category)
  const [showCategory, setShowCategory] = useState(false)
  const auth = useSelector(state => state.auth)

  function renderCategories (categories) {
    let allCategories = []
    for (let category of categories) {
      allCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <a
              href={`/${category.slug}?cid=${category._id}&pagetype=${category.pagetype}`}
              className='link'
            >
              {category.name}
            </a>
          ) : (
            <span>
              <a
                href={`/${category.slug}?cid=${category._id}&pagetype=${category.pagetype}`}
                className='link'
              >
                {category.name}
              </a>
            </span>
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
      <>
        {auth.authenticated && (
          <Link to='/orders' style={{ textDecoration: 'none' }}>
            <button
              style={{
                margin: '10px',
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: 'rgb(124, 142, 9)',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontFamily: 'Roboto'
              }}
              onClick={() => setShowCategory(show => !show)}
            >
              My orders
            </button>
          </Link>
        )}

        <ul>
          {category.categories.length > 0 &&
            renderCategories(category.categories)}
        </ul>
      </>
    )
  }

  return (
    <>
      <i
        className='fa-solid fa-bars'
        onClick={() => setShowCategory(show => !show)}
      ></i>
      {showCategory && (
        <div className='mobile-sidebar-container'>{categoryHeader()}</div>
      )}
    </>
  )
}

export default MobileSideBar
