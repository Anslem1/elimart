import React from 'react'
import Modal from 'react-modal'

function UpdateCategoryModal (props) {
  const {
    isOpen,
    onAfterOpen,
    onRequestClose,
    checkedArray,
    expandedArray,
    categoryOption,
    style,
    handleCategoryUpdateInput,
    ariaHideApp,
    expanded,
    checked,
    updateCategoryForm
  } = props


  return (
    <>
      <Modal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onRequestClose}
        style={style}
        ariaHideApp={ariaHideApp}
      >
        <></>
        <h1
          style={{
            textAlign: 'center',
            fontFamily: 'Open sans',
            fontWeight: 'normal',
            marginBottom: '30px'
          }}
        >
          Update category
        </h1>
        <div className='modal-container'>
          {expandedArray.length > 0 && (
            <h2 className='add-category-header'>Expanded</h2>
          )}

          {expandedArray.length > 0 &&
            expandedArray.map((item, index) => {
              return (
                <>
                  <div className='category-name-container' key={index}>
                    <label>Category name</label>
                    <input
                      type='text'
                      placeholder='Category name'
                      value={item.name}
                      onChange={e =>
                        handleCategoryUpdateInput(
                          'name',
                          e.target.value,
                          index,
                          'expanded'
                        )
                      }
                    />
                  </div>
                  <div className='category-name-container'>
                    <label>Category</label>

                    <select
                      value={item.parentId}
                      onChange={e =>
                        handleCategoryUpdateInput(
                          'parentId',
                          e.target.value,
                          index,
                          'expanded'
                        )
                      }
                    >
                      <option value=''>--select category--</option>
                      {categoryOption.map(option => {
                        return (
                          <option value={option.value} key={option.value}>
                            {option.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div className='category-name-container'>
                    <label>Page type</label>

                    <select
                      value={item.pagetype}
                      onChange={e =>
                        handleCategoryUpdateInput(
                          'pagetype',
                          e.target.value,
                          index,
                          'expanded'
                        )
                      }
                    >
                      <option value=''>--Select page type --</option>
                      <option>Page</option>
                      <option>Store</option>
                      <option>Product</option>
                    </select>
                  </div>
                </>
              )
            })}
          {checkedArray.length > 0 && expandedArray.length > 0 && <hr />}
          {checkedArray.length > 0 && (
            <h2 className='add-category-header'>Checked</h2>
          )}

          {checkedArray.length > 0 &&
            checkedArray.map((item, index) => {
  
              return (
                <>
                  <div className='category-name-container' key={index}>
                    <label>Category name</label>
                    <input
                      type='text'
                      placeholder='Category name'
                      value={item.name}
                      onChange={e =>
                        handleCategoryUpdateInput(
                          'name',
                          e.target.value,
                          index,
                          'checked'
                        )
                      }
                    />
                  </div>
                  <div className='category-name-container'>
                    <label>Category</label>

                    <select
                      value={item.parentId}
                      onChange={e =>
                        handleCategoryUpdateInput(
                          'parentId',
                          e.target.value,
                          index,
                          'checked'
                        )
                      }
                    >
                      <option>--select category--</option>
                      {categoryOption.map(option => {
                
                        return (
                          <option value={option.value} key={option.value}>
                            {option.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div className='category-name-container'>
                    <label>Page type</label>

                    <select
                      value={item.pagetype}
                      onChange={e =>
                        handleCategoryUpdateInput(
                          'pagetype',
                          e.target.value,
                          index,
                          'checked'
                        )
                      }
                    >
                      <option >--Select type --</option>
                      <option>Page</option>
                      <option>Store</option>
                      <option>Product</option>
                    </select>
                  </div>
                </>
              )
            })}
        </div>
        <div    style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={updateCategoryForm} className='add-category-btn'>
            Save changes
          </button>
          <button onClick={onRequestClose} className='add-category-btn delet'>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  )
}

export default UpdateCategoryModal
