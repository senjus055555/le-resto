import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import DishInCart from "../components/DishInCart";
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';
import { createOrder } from "../actions/orderActions";
import { setTableNum } from "../actions/cartActions";

const CartScreen = () => {

    const dispatch = useDispatch()

    const [tableNumber, setTableNumber] = useState(null)
    const [tablePin, setTablePin] = useState(null)
    const [err, setErr] = useState(null)
    const [toShow, setToShow] = useState(null)
    const [errVisible, setErrVisible] = useState(true)

    const changeTableNumber = (e) => {
        setTableNumber(e.target.value)
    }

    const changeTablePin = (e) => {
        setTablePin(e.target.value)
    }

    const navigate = useNavigate()

    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(new URL(currentUrl).search);
    const id = urlParams.get("id");

    // const {id} = useParams()
    console.log(`checking the id value ${id}`)

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const userLogin = useSelector(state => state.userLogin)
    const {loading, userInfo } = userLogin

    const tableNum = useSelector((state) => state.tableNumber)
    const tableNumberChange = tableNum.tableNumber ? tableNum.tableNumber : tableNum.tableNumberChange ? tableNum.tableNumberChange : tableNum-33
    

    const orderCreate = useSelector((state) => state.orderCreate)
    const { success, error } = orderCreate

    useEffect(() => {

        if(toShow && error) {
            setErr(error)
            setErrVisible(true)
            setTimeout(() => {
                setErr('');
                setErrVisible(false);
              }, 2000);
        }

        if(toShow && success) {
            navigate(`/menu/${id}`)
        }

    }, [success, error, toShow])

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const navigateHandler = () => {
        navigate(`/menu/${id}`)
    }

    const placeOrderHandler = () => {
        const formattedMenuItems = [];

        cartItems.forEach(item => {
            console.log(item)
            const formattedItem = {
                item_id: item.id,
                quantity: item.qty,
                item_name: item.name,
                item_price: item.price,
                price: item.item_stripe_price
            };
                
            formattedMenuItems.push(formattedItem);

        });
            
        dispatch(
            createOrder({
                customer_name: userInfo.username ? userInfo.username : userInfo.userName,
                menu_items: formattedMenuItems,
                restaurant_id: id,
                total_price: totalPrice,
                table_number: tableNumber
            })
            )

        setToShow(true)
        //  if(error) {
        //     setErr(error)
        // }

        // if(success) {
        //     // console.log('hey, success is always success')
        //     navigate(`/menu/${id}`)
        // }
    }

    const checkoutHandler = () => {
        if(tableNumber === '1' && tablePin === '010010') {
            placeOrderHandler()
            const tableno = tableNumber
            dispatch(setTableNum(tableno))
        } else if(tableNumber === '2' && tablePin === '64762') {
            placeOrderHandler()
            const tableno = tableNumber
            dispatch(setTableNum(tableno))
        } else if(tableNumber === '3' && tablePin === '76377') {
            placeOrderHandler()
            const tableno = tableNumber
            dispatch(setTableNum(tableno))
        } else {
            setErr('Invalid pin or table number entered')
            setErrVisible(true)
            setTimeout(() => {
                setErr('');
                setErrVisible(false);
              }, 2000);
        }    
    }

    const payBillHanlder = async () => { 
        await fetch(`http://localhost:3001/api/payment?restaurantId=${id}&tableNumber=${parseInt(tableNumberChange)}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log(response)
            return response.json();
        }).then((response) => {
            if(response.error) {
                setErr(response.error)
                setErrVisible(true)
                setTimeout(() => {
                    setErr('');
                    setErrVisible(false);
                  }, 2000);
            }
            if(response.url) {
                window.location.assign(response.url); // Forwarding user to Stripe
            }
        });
    }
    

    return (
        <div className="w-screen h-screen px-8 pl-16 py-8 bg-black text-white overflow-hidden">
            <img className="h-5 w-auto hover:cursor-pointer" src="logo.png" alt="Your Company" onClick={() => navigateHandler()} />
            <div className="w-full grid grid-cols-5">
                <div className="col-span-3 w-full pt-12">
                    <h3 className="text-xl font-medium">Chef is waiting to serve you</h3>
                    <div className="w-2/3 h-2/3 bg-gray-700 mt-4 rounded-lg p-4 -mb-8 overflow-y-auto">
                        {
                            cartItems && cartItems.map(item => {

                                if(item.qty > 0) {
                                    return (
                                        <DishInCart id={item.id} image={item.image} name={item.name} price={item.price} quantity={item.qty} />
                                    )
                                } else {
                                    return 
                                }
                            })
                        }

                        <div className="w-full h-24 flex justify-between">
                            <div className="h-full w-full flex flex-col justify-center">
                                <h5 className="text-base cursor-pointer" onClick={() => navigateHandler()}><span>+</span><span className="ml-2">Add more items</span></h5>
                            </div>
                            <div className="h-full w-full flex flex-col gap-y-1 justify-center items-end">
                                <h6 className="text-sm">Sub total: <span className="font-semibold pl-3">₹ {totalPrice}</span></h6>
                                <h6 className="text-sm">Net payable: <span className="font-semibold pl-3">₹ {totalPrice} </span></h6>
                            </div>
                        </div> 

                        <hr class="h-px my-2 bg-gray-600 border-0"></hr>

                        <div className="w-full">
                            <div className="grid grid-cols-2 gap-x-16 justify-evenly items-center">
                                <div className="flex justify-end">
                                    <label htmlFor="tableNumber" className="text-white block mt-1">
                                        Enter Table number
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    id="tableNumber"
                                    // value={tableNumber}
                                    onChange={(e) => changeTableNumber(e)}
                                    className="border-b w-2/3 border-white bg-transparent text-white text-sm focus:outline-none mb-2 text-center"
                                />
                            </div>
                        </div>

                        <div className="w-full mb-2">
                            <div className="grid grid-cols-2 gap-x-16 justify-evenly items-center">
                                <div className="flex justify-end">
                                    <label htmlFor="tableNumber" className="text-white block mt-1">
                                        Enter Table PIN
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    id="tableNumber"
                                    // value={tableNumber}
                                    onChange={(e) => changeTablePin(e)}
                                    className="border-b w-2/3 border-white bg-transparent text-white text-sm text-center focus:outline-none mb-2"
                                />
                            </div>
                        </div>

                        {console.log(`current table number is ${tableNumber}`)}
                        {console.log(`current tabkePin is ${tablePin}`)}
                        {console.log(`current error is ${err}`)}

                        <hr class="h-px my-2 bg-gray-600 border-0"></hr>

                        {err && <div className="p-2 my-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                                <span class="font-medium"></span> {err}
                        </div>}

                        <hr class="h-px my-2 bg-gray-600 border-0"></hr>

                        <button type="button" class=" bg-white text-black font-medium rounded-lg text-sm px-5 py-3 text-center w-full mt-2" onClick={() => checkoutHandler()} >{(cartItems.filter(item => item.qty > 0).length) > 0 ? 'checkout' : 'view menu'}</button>

                        <hr class="h-px my-2 bg-gray-600 border-0"></hr>

                        <button type="button" class=" bg-green-400 text-white font-medium rounded-lg text-sm px-5 py-3 text-center w-full mt-2" onClick={() => payBillHanlder()} >Pay bill</button>

                    </div>
                </div>
                <div className="col-span-2 w-full pt-6 flex justify-start">
                    <img src="cheff.png" className="h-screen -mt-24 object-cover -ml-12" />
                </div>
            </div>
            {console.log(tableNum)}
        </div>
    )
}

export default CartScreen