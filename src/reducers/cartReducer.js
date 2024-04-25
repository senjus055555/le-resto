import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_CLEAR_ITEMS, SET_TABLE_NUMBER} from '../constants/cartConstants'

export const cartReducer = (
    state = { cartItems: [] },
    action
  ) => {
    switch (action.type) {
      case CART_ADD_ITEM:
        const item = action.payload
        console.log('the item value is', item)
  
        const existItem = state.cartItems.find((x) => x.id === item.id)
  
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.id === existItem.id ? item : x
            ),
          }
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          }
        }
      case CART_REMOVE_ITEM:
        console.log('iam in cart reducer screen')
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.id !== action.payload),
        }
      case CART_CLEAR_ITEMS:
        return {
          ...state,
          cartItems: [],
        }
      default:
        return state
    }
  }


  export const setTableNumberReducer = (state = {}, action) => {
    console.log(`table num is ${action.payload}`)
    switch (action.type) {
      case 'SET_TABLE_NUMBER':
        return {
          tableNumberChange: action.payload,
        };
      default:
        return state;
    }
  } 