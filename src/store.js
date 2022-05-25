import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { AdminLoginReducer } from './reducers/adminReducers'

const reducer = combineReducers({
  
  adminLogin: AdminLoginReducer,
})


const adminInfoFromStorage = localStorage.getItem('adminInfo')
  ? JSON.parse(localStorage.getItem('adminInfo'))
  : null

const initialState = {
    adminLogin: { adminInfo: adminInfoFromStorage },

}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store