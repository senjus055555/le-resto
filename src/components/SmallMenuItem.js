import React, {useState} from "react";
import { addToCart } from "../actions/cartActions";
import {useSelector, useDispatch} from 'react-redux'


const SmallMenuItem = ({id, image, name, calorie, price}) => {

    const dispatch = useDispatch()

    const [qty, setQty] = useState(0)

    const increaseQty = (id) => {
        setQty(prevQty => prevQty + 1)
        dispatch(addToCart(id, qty + 1))
    }

    const decreaseQty = (id) => {
        setQty (prevQty => prevQty - 1)
        if(qty - 1 < 0) {
            return 
        } else {
            dispatch(addToCart(id, qty - 1))
        }
    } 

    return (
        <div className="flex-shrink-0  bg-gray-300 text-black p-3 w-40 gap-6 rounded-md" key={id}>
        <div className="flex justify-center items-center">
            <img src={image} className="w-24 h-24 rounded-full object-cover" alt={name} />
        </div>
        <div className="text-black flex flex-col items-center">
            <h4 className="text-sm font-semibold">{name}</h4>
            <h5 className="text-xs">{calorie} ♨️ <span className="ml-2">₹{price}</span></h5>
        </div>
        <div className="mt-2">
            <button type="button" className="text-white font-medium rounded-md text-sm px-3 py-1.5 text-center w-full bg-gray-800">
            <span className="mr-2" onClick={() => increaseQty(id)}>+</span><span className="mr-2 bg-white rounded-full px-2 text-black py-1">{qty}</span><span onClick={() => decreaseQty(id)}>-</span>
            </button>
        </div>
        </div>
    )
}

export default SmallMenuItem