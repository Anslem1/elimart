import AuthReducer from './Auth/AuthReducer'
import { combineReducers } from 'redux'
import UserReducer from './User/UserReducer'
import CategoryReducer from './Category/CategoryReducer';
import ProductReducer from './Product/ProductReducer';
import pageTypeReducer from './Page/PageTypeReducer';
import OrderReducer from './Order/OrderReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  category: CategoryReducer,
  product: ProductReducer,
  pagetype: pageTypeReducer,
  order: OrderReducer
})

export default rootReducer
