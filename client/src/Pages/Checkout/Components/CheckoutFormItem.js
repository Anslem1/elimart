import { useSelector } from 'react-redux'
import CheckoutAdress from './CheckoutAdress/CheckoutAdress'
import Checkoutlogin from './Checkoutlogin/Checkoutlogin'
import CheckoutOrderSummary from './CheckoutOrderSummary/CheckoutOrderSummary'
import CheckoutPayment from './CheckoutPayment/CheckoutPayment'

export function CheckoutFormItems ({
  setIndex,
  index,
  previousButton,
  nextButton
}) {
  const auth = useSelector(state => state.auth)

  switch (index) {
    case 1:
      return (
        <>
          {auth.authenticated ? (
            setIndex(index + 1)
          ) : (
            <Checkoutlogin
              index={index}
              setIndex={setIndex}
              previousButton={previousButton}
              nextButton={nextButton}
            />
          )}
        </>
      )

    case 2:
      return (
        <>
          {auth.authenticated ? (
            <CheckoutAdress
              index={index}
              setIndex={setIndex}
              previousButton={previousButton}
              nextButton={nextButton}
            />
          ) : (
            <div className='empty-cart previous-login'>
              <button
                onClick={previousButton}
                className='sign_in_btn previous-button'
              >
                Previous
              </button>

              <h1>You need to login</h1>
            </div>
          )}
        </>
      )

    case 3:
      return (
        <>
          {auth.authenticated ? (
            <CheckoutOrderSummary
              index={index}
              setIndex={setIndex}
              previousButton={previousButton}
              nextButton={nextButton}
            />
          ) : (
            <div className='empty-cart previous-login'>
              <button
                onClick={previousButton}
                className='sign_in_btn previous-button'
              >
                Previous
              </button>

              <h1>You need to login</h1>
            </div>
          )}
        </>
      )

    case 4:
      return (
        <>
          {auth.authenticated ? (
            <CheckoutPayment
              index={index}
              setIndex={setIndex}
              previousButton={previousButton}
              nextButton={nextButton}
            />
          ) : (
            <div className='empty-cart previous-login'>
              <button
                onClick={previousButton}
                className='sign_in_btn previous-button'
              >
                Previous
              </button>

              <h1>You need to login</h1>
            </div>
          )}
        </>
      )
  }
}
