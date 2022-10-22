import AuthReducer from './Auth/AuthReducer'
import { combineReducers } from 'redux'
import UserReducer from './User/UserReducer'

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer
})

export default rootReducer
