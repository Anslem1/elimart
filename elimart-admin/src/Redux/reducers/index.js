import AuthReducer from './Auth/AuthReducer'
import { combineReducers } from 'redux'
import UserReducer from './User/UserReducer'
import CategoryReducer from './Category/CategoryReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  categories: CategoryReducer,
  // product: productReducer,
  // order: orderReducer
})

export default rootReducer
