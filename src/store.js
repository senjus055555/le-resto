import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' 
import { composeWithDevTools } from 'redux-devtools-extension'
import {userRegisterReducer, userLoginReducer, cheffLoginReducer} from "./reducers/userReducer"
import {cartReducer} from './reducers/cartReducer'
import { orderCreateReducer } from './reducers/orderReducer'
import { setTableNumberReducer } from './reducers/cartReducer'


const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    // RestaurentSearchList: RestaurentSearchListReducer,
    // RestaurentAmbienceList: RestaurentAmbienceListReducer,
    // RestaurentCuisineList: RestaurentCuisineListReducer,
    // RestaurentMenuList: RestaurentMenuListReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    // candidateList: candidateListReducer,
    // candidateInfo: candidateReducer,
    // vote: voteReducer,
    tableNumber: setTableNumberReducer,
    cheffLogin: cheffLoginReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

  const tableNumberFromStorage = localStorage.getItem('tableNumber')
  ? JSON.parse(localStorage.getItem('tableNumber'))
  : null

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

  const cheffInfoFromStorage = localStorage.getItem('cheffInfo')
  ? JSON.parse(localStorage.getItem('cheffInfo'))
  : null

const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    userLogin: { userInfo: userInfoFromStorage },
    cheffLogin: {cheffInfo: cheffInfoFromStorage},
    tableNumber: {tableNumber: tableNumberFromStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store