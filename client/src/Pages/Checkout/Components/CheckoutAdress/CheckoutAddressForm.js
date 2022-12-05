import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress } from '../../../../Redux/actions'
import CheckoutPayment from '../CheckoutPayment/CheckoutPayment'
import './CheckoutAdress.css'

function CheckoutAddressForm ({
  selectedConfirmAddress,
  confirmDeliveryAddress,
  edit,
  setEdit,
  initialData,
  addressState,
  setAddressState
}) {
  const [showAddAddress, setShowAddAddress] = useState(false)

  const [name, setName] = useState(initialData ? initialData.name : '')
  const [mobileNumber, setMobileNumber] = useState(
    initialData ? initialData.mobileNumber : ''
  )
  const [zipCode, setZipCode] = useState(initialData ? initialData.zipCode : '')
  const [locality, setLocality] = useState(
    initialData ? initialData.locality : ''
  )
  const [address, setAddress] = useState(initialData ? initialData.address : '')
  const [city, setCity] = useState(initialData ? initialData.city : '')
  const [state, setState] = useState(initialData ? initialData.state : '')
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState(
    initialData ? initialData.alternatePhoneNumber : ''
  )
  const [addressType, setAddressType] = useState(
    initialData ? initialData.addressType : ''
  )
  const [id, setid] = useState(initialData ? initialData._id : '')
  const [submitFlag, setSubmitFlag] = useState(false)

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const auth = useSelector(state => state.auth)

  function onAddressSubmit (e) {
    e.preventDefault()
    const payload = {
      address: {
        name,
        mobileNumber,
        zipCode,
        locality,
        address,
        alternatePhoneNumber,
        addressType,
        state,
        city
      }
    }

    if (id) {
      payload.address._id = id
    }

    dispatch(addAddress(payload))
    setShowAddAddress(false)
    setSubmitFlag(true)
  }

  useEffect(() => {
    if (submitFlag) {
      let _address = {}
      if (id) {
        _address = {
          _id: id,
          name,
          mobileNumber,
          zipCode,
          locality,
          address,
          state,
          alternatePhoneNumber,
          addressType
        }
      } else {
        _address = user.address.slice(user.address.length - 1)[0]
      }

      confirmDeliveryAddress(_address)

    }
  }, [user.address])

  function disableAddressEditForm (adr) {
    const updatedAddress = addressState.map(addr =>
      addr._id === adr._id
        ? { ...addr, edit: false, selected: false }
        : { ...addr, edit: false }
    )


    setAddressState(updatedAddress)
    setEdit(false)
  }

  function renderAddressForm () {
    return (
      <>
        <div className='add-address-container'>
          <div className='address-name-number'>
            <div className='address-name'>
              <label>Name</label>
              <input
                type='text'
                name=''
                id='address-name'
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='address-name'>
              <label htmlFor='address-name'>Mobile number</label>
              <input
                type='number'
                name=''
                id=''
                required
                value={mobileNumber.toString()}
                onChange={e => setMobileNumber(e.target.value)}
              />
            </div>
          </div>

          <div className='address-name-number'>
            <div className='address-name'>
              <label>Zipcode</label>
              <input
                type='number'
                name=''
                required
                id='address-name'
                value={zipCode.toString()}
                onChange={e => setZipCode(e.target.value)}
              />
            </div>
            <div className='address-name'>
              <label htmlFor='address-name'>Locality</label>
              <input
                type='text'
                name=''
                id=''
                required
                value={locality}
                onChange={e => setLocality(e.target.value)}
              />
            </div>
          </div>
          <div className='address-name-number address-address'>
            <label>Address</label>
            <input
              type='text'
              name=''
              id='address-name'
              required
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className='address-name-number'>
            <div className='address-name'>
              <label>City</label>
              <input
                type='text'
                name=''
                required
                id='address-name'
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </div>
            <div className='address-name'>
              <label htmlFor='address-name'>State</label>
              <input
                type='text'
                name=''
                id=''
                required
                value={state}
                onChange={e => setState(e.target.value)}
              />
            </div>
          </div>
          <div className='address-name-number'>
            <div className='address-name'>
              <label>Alternate phone number (optional)</label>
              <input
                type='number'
                name=''
                id='address-name'
                value={alternatePhoneNumber.toString()}
                onChange={e => setAlternatePhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className='address-name-number'>
            <div className='address-name'>
              <label>Address type</label>
              <select
                name=''
                id=''
                value={addressType}
                onChange={e => setAddressType(e.target.value)}
              >
                <option> -- home or work --</option>
                <option value={'home'}> Home</option>
                <option value={'work'}> Work</option>
              </select>
            </div>
          </div>
          <div
            className='button-container'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <button
              className='sign_in_btn save-deliver'
              onClick={onAddressSubmit}
            >
              Save and deliver here
            </button>
            {edit && (
              <button
                className='sign_in_btn save-deliver'
                onClick={() => disableAddressEditForm(initialData)}
                style={{
                  backgroundColor: 'red'
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {auth.authenticated ? (
        <>
          {!edit ? (
            <>
              {selectedConfirmAddress ? null : (
                <div className='add-address-btn-container'>
                  <button onClick={() => setShowAddAddress(show => !show)}>
                    {!showAddAddress ? (
                      <p>
                        <i className='fa-solid fa-plus'></i>
                        Add new address
                      </p>
                    ) : (
                      'Close'
                    )}
                  </button>
                </div>
              )}
              {showAddAddress && renderAddressForm()}
            </>
          ) : (
            renderAddressForm()
          )}
        </>
      ) : null}
    </>
  )
}

export default CheckoutAddressForm
