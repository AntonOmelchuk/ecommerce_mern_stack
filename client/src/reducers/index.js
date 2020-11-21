import { combineReducers } from 'redux'
import authReducer from './auth'
import categoryReducer from './category'
import subReducer from './sub'

export default combineReducers({
  auth: authReducer,
  category: categoryReducer,
  sub: subReducer
})
