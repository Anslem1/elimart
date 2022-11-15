import React from 'react'
import Modal from 'react-modal'

function DeleteCategoryModal (props) {
  const {
    isOpen,
    onRequestClose,
    afterOpenDeleteModal,
    style,
 
    ariaHideApp,
    expandedArray,
    checkedArray,

    confirmDeleteCategory
  } = props
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenDeleteModal}
      onRequestClose={onRequestClose}
      style={style}
      ariaHideApp={ariaHideApp}
    >
      {expandedArray.length > 0 && (
        <>
          <h1
            style={{
              marginBottom: '10px',
              justifyContent: 'space-evenly',
              textAlign: 'center',
              fontFamily: 'Roboto',
              fontWeight: '500'
            }}
          >
            Expanded
          </h1>

          <h2
            style={{
              marginBottom: '20px',
              justifyContent: 'space-evenly',
              textAlign: 'center',
              fontFamily: 'Open sans',
              fontWeight: '500'
            }}
          >
            You expanded{' '}
            {expandedArray.map((item, index) => {
              return <span key={index}>{item.name}</span>
            })}
          </h2>
        </>
      )}

      {checkedArray.length > 0 ? (
        <>
          <h1
            style={{
              justifyContent: 'space-evenly',
              textAlign: 'center',
              fontFamily: 'Roboto',
              fontWeight: '500',
              marginBottom: '10px'
            }}
          >
            Checked
          </h1>
          <h2
            style={{
              marginBottom: '20px',
              justifyContent: 'space-evenly',
              textAlign: 'center',
              fontFamily: 'Open sans',
              fontWeight: '500'
            }}
          >
            Are you sure you want to delete{' '}
            {checkedArray.map((item, index) => {
              return <span key={index}>{item.name}</span>
            })}
            ?
          </h2>
        </>
      ) : (
        <h2
          style={{
            textAlign: 'center',
            fontFamily: 'Open sans',
            fontWeight: '500',
            marginBottom: '10px'
          }}
        >
          Pick something to delete
        </h2>
      )}

      <div
        className='confirm-deletecontainer'
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <button
          style={{
            padding: '10px',
            display: 'flex',
            gap: '3px',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            color: '#fff',
            backgroundColor: 'red',
            border: 'none',
            borderRadius: '10px'
          }}
          onClick={confirmDeleteCategory}
        >
          <i className='fa-solid fa-check'></i>
          Confirm
        </button>
        <button
          style={{
            padding: '5px 10px 5px 10px',
            cursor: 'pointer',
            padding: '10px',
            display: 'flex',
            gap: '3px',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            color: '#fff',
            backgroundColor: '#0892D0',
            border: 'none',
            borderRadius: '10px'
          }}
          onClick={onRequestClose}
        >
          <i className='fa-solid fa-cancel'></i>
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default DeleteCategoryModal
