import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CheckoutAddressForm from './CheckoutAddressForm'

function CheckoutAdress ({ previousButton, nextButton }) {
  const user = useSelector(state => state.user)
  const auth = useSelector(state => state.auth)
  const [address, setAddress] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [edit, setEdit] = useState(false)

  const [confirmAddress, setConfirmAddress] = useState(false)

  const [selectedConfirmAddress, setSelectedConfirmAddress] = useState(null)

  useEffect(() => {
    const isAddress = user.address.map(adr => ({
      ...adr,
      selected: false,
      edit: false
    }))
    setAddress(isAddress)
  }, [user.address])

  function selectAddress (adr) {
    const updatedAddress = address.map(addr =>
      addr._id === adr._id
        ? { ...addr, selected: true }
        : { ...addr, selected: false }
    )

    setAddress(updatedAddress)
   
  }

  function confirmDeliveryAddress (adr) {
    setSelectedConfirmAddress(adr)

    localStorage.setItem('confirmAddress', JSON.stringify(adr))
    setConfirmAddress(true)
  }

  function enableAddressEditForm (adr) {
    const updatedAddress = address.map(addr =>
      addr._id === adr._id
        ? { ...addr, edit: true, selected: false }
        : { ...addr, edit: false }
    )

    setAddress(updatedAddress)
    setEdit(true)
  }

  return (
    <>
      <>
        {confirmAddress ? (
          <div className='address-container'>
            <h2>Deliver to:</h2>
            <div className='delivery-name-container'>
              <div className='shipping-address-container'>
                <span>
                  <i className='fa-regular fa-user'></i>
                  <strong>Shipping Name</strong>
                </span>
                <p>{selectedConfirmAddress.name}</p>
              </div>
              <div className=' shipping-address-container'>
                <span>
                  <i className='fa-solid fa-location-dot'></i>
                  <strong>Shipping address</strong>
                </span>
                <p>{selectedConfirmAddress.address}</p>
              </div>
              <div className=' shipping-address-container'>
                <span>
                  <i className='fa-solid fa-phone'></i>
                  <strong>Number</strong>
                </span>
                <p>{selectedConfirmAddress.mobileNumber}</p>
              </div>
              <div className=' shipping-address-container'>
                <span>
                  <i className='fa-solid fa-building-user'></i>

                  <strong>Address type</strong>
                </span>
                <p>{selectedConfirmAddress.addressType}</p>
              </div>

              <div className='previous-next'>
                <button onClick={() => nextButton()}>Confirm</button>
                <button
                  className='cancel_btn'
                  onClick={() => {
                    setConfirmAddress(false)
                    setEdit(true)
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {address.map((adr, index) => (
              <>
                {!adr.edit ? (
                  <>
                    <div className='address-container'>
                      <p>{index + 1}</p>
                      <div className='radio-input-container'>
                        <input
                          type='radio'
                          name='address'
                          id=''
                          onClick={() => selectAddress(adr)}
                        />
                      </div>

                      <div className='delivery-name-container'>
                        <div className=' shipping-address-container'>
                          <span>
                            <i className='fa-regular fa-user'></i>
                            <strong>Shipping Name</strong>
                          </span>
                          <p>{adr.name}</p>
                        </div>
                        <div className=' shipping-address-container'>
                          <span>
                            <i className='fa-solid fa-location-dot'></i>

                            <strong>Shipping address</strong>
                          </span>
                          <p>{adr.address}</p>
                        </div>
                        <div className=' shipping-address-container'>
                          <span>
                            <i className='fa-solid fa-phone'></i>
                            <strong>Number</strong>
                          </span>
                          <p>{adr.mobileNumber}</p>
                        </div>
                        <div className=' shipping-address-container'>
                          <span>
                            <i className='fa-solid fa-building-user'></i>

                            <strong>Address type</strong>
                          </span>
                          <p>{adr.addressType}</p>
                        </div>
                        {adr.selected && (
                          <div className='previous-next'>
                            <button onClick={() => confirmDeliveryAddress(adr) }>
                              Deliver here
                            </button>

                            <button
                              onClick={() => {
                                enableAddressEditForm(adr)
                                setIsEdit(true)
                              }}
                              className='edit-delivary-btn'
                            >
                              edit
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <CheckoutAddressForm
                    nextButton={nextButton}
                    confirmDeliveryAddress={confirmDeliveryAddress}
                    setIsEdit={setIsEdit}
                    edit={adr.edit}
                    initialData={adr}
                    setEdit={setEdit}
                    setAddressState={setAddress}
                    addressState={address}
                  />
                )}
              </>
            ))}
          </>
        )}

        <>
          {!edit && (
            <CheckoutAddressForm
              isEdit={isEdit}
              nextButton={nextButton}
              selectedConfirmAddress={selectedConfirmAddress}
              confirmDeliveryAddress={confirmDeliveryAddress}
            />
          )}
        </>
      </>
    </>
  )
}

export default CheckoutAdress
