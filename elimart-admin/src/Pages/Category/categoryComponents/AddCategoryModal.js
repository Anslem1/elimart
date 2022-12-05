import Modal from 'react-modal'

function AddCategoryModal (props) {
  const {
    isOpen,
    onAfterOpen,
    style,
    onRequestClose,
    ariaHideApp,
    parentCategoryId,
    setParentCategoryId,
    categoryName,
    setcategoryName,
    handleCategoryImage,
    categoryOptions,
    pageType,
    setPageType,
    submitCategory
  } = props

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      style={style}
      ariaHideApp={ariaHideApp}
    >
      <div className='modal-container'>
        <h2 className='add-category-header'>Add category</h2>
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
            <option value={''}>--select category--</option>
            {categoryOptions.map(option => {
              return (
                <option value={option.value} key={option.value}>
                  {option.name}
                </option>
              )
            })}
          </select>
        </div>
        <input
          type='file'
          multiple = 'multiple'

          name='categoryImage'
          onChange={handleCategoryImage}
        />
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button onClick={submitCategory} className='add-category-btn'>
          Add
        </button>

        <button className='add-category-btn delete' onClick={onRequestClose}>
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default AddCategoryModal
