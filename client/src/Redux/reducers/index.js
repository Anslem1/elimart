import { combineReducers } from 'redux'
import CategoryReducer from './Category/CategoryReducer'
import ProductReducer from './Product/ProductReducer'

const rootReducer = combineReducers({
  category: CategoryReducer,
  products: ProductReducer
  // order: orderReducer
})

export default rootReducer
