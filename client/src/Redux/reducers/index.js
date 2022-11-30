import { combineReducers } from 'redux'
import CategoryReducer from './Category/CategoryReducer'
import ProductReducer from './Product/ProductReducer'
import AuthReducer from './Auth/AuthReducer'
import CartReducer from './Cart/CartReducer'; 
import userReducer from './User/UserReducer'; 

const rootReducer = combineReducers({
  auth: AuthReducer,
  category: CategoryReducer,
  products: ProductReducer,
  cart: CartReducer,
  user: userReducer
  // order: orderReducer
})

export default rootReducer
