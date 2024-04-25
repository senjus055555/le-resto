import React, {useState} from "react";
import { addToCart } from "../actions/cartActions";
import {useSelector, useDispatch} from 'react-redux'

const MenuItem = ({id, image, name, price, calorie}) => {

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
        <div className="flex-shrink-0  bg-gray-300 text-black p-3 flex gap-6 rounded-md">
            <div>
                <img src={image} className="h-40 w-36 rounded-md object-cover" />
            </div>
            <div className="flex flex-col justify-center">
                <h4 className="text-base font-semibold">{name}</h4>
                <div className="flex justify-between items-center">
                    <h5 className="text-lg font-semibold">₹ {price}</h5>
                    <h5 className="text-sm">{calorie} ♨️</h5>
                </div>
                <div className="w-56 pt-2">
                    <p className="text-xs">Thalasseri Biriyani A customers favorite, marinated chicken pieces layered between rice cooked along with whole spices.</p>
                </div>
                <div className="mt-2">
                        <button type="button" className=" text-white font-medium rounded-md text-sm px-3 py-2 text-center w-full bg-gray-800 flex justify-between">
                            <div>
                                add to dine
                            </div>
                            <div>
                                <span className="ml-4 mr-2" onClick={() => increaseQty(id)}>+</span><span className="mr-2 bg-white rounded-full px-2 text-black py-1">{qty}</span><span onClick={() => decreaseQty(id)}>-</span>
                            </div>
                        </button>
                </div>
            </div>
        </div>

    )
}

export default MenuItem