import axios from 'axios'
import {CART_CLEAR_ITEMS} from '../../src/constants/cartConstants'
import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
  console.log('printing the orders');
  console.log(order);
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoString);
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`http://127.0.0.1:3001/api/order`, order, config);
    console.log('Axios response:', data); // Log the response

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });
    localStorage.removeItem('cartItems');
  } catch (error) {
    console.log('Error caught:', error); // Log the caught error
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};
