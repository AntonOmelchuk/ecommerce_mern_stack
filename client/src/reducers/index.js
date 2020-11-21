import { combineReducers } from 'redux'
import authReducer from './auth'
import categoryReducer from './category'
import subReducer from './sub'
import generalReducer from './general'

export default combineReducers({
  auth: authReducer,
  category: categoryReducer,
  sub: subReducer,
  general: generalReducer
})
