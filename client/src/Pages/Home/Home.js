import React from 'react'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'

function Home () {
  const category = useSelector(state => state.category)

  function renderCategories (categories) {
    let allCategories = []
    for (let category of categories) {
      allCategories.push(
        <>
          <a
            href={`/${category.slug}?cid=${category._id}&pagetype=${category.pagetype}`}
            className='link'
            // style={{ width: '100px' }}
          >
            <img
              src={category.categoryImage}
              alt=''
              className='home-category-image'
              style={{ display: 'inline-block' }}
            />
            <p
              style={{
                textAlign: 'center',
                fontFamily: 'Open sans',
                fontSize: '15px'
              }}
            >
              {category.name}
            </p>
          </a>
          {category.children.length > 0 && !category.parentId && (
            <p style={{ inlineSize: '150px', fontFamily: 'Roboto' }}>
              categories under {category.name}
            </p>
          )}
          <div className='children'>{renderCategories(category.children)}</div>
        </>
      )
    }
    return allCategories
  }

  function categoryHeader () {
    return (
      <div className='hone-content'>
        {category.categories.length > 0
          ? renderCategories(category.categories)
          : null}
      </div>
    )
  }

  return (
    <>
      <div className='home-container'>{categoryHeader()}</div>
    </>
  )
}

export default Home
