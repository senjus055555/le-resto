import React, {useEffect, useState} from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import {useDispatch} from 'react-redux'

const DishInCart = ({id, image, name, price, quantity,}) => {

    const [qty, setQty] = useState(quantity)

    const dispatch = useDispatch()

    useEffect(() => {
        if(quantity) {
            setQty(quantity)
        }
    }, [])

    const increaseQty = () => {
        setQty(prevQty => prevQty + 1)
        console.log(`printing the id value ${id}`)
        console.log(`printing the quantity value ${qty}`)
        dispatch(addToCart(id, qty + 1))
    }

    const decreaseQty = () => {
        setQty (prevQty => prevQty - 1)
        if(qty - 1 < 0) {
            dispatch(removeFromCart(id))
        } else {
            dispatch(addToCart(id, qty - 1))
        }
    }

    const removeFromDine = () => {
        dispatch(removeFromCart(id))
    }

    return (
        <>
            <div className="w-full grid grid-cols-5 gap-4">
                <div className="h-full col-span-1 flex justify-center items-center">
                    <img src={image} className="object-cover h-full rounded-full" />
                </div>
                <div className="h-full col-span-3 flex flex-col justify-evenly">
                    <h3 className="text-base font-semibold">{name}</h3>
                    <h6 className="text-xs">kerala styled chicken biriyani with spicy masala, mayonize mix and garlic cooked</h6>
                    <div className="text-base font-semibold">{price} /-</div>
                </div>
                <div className="h-24 w-full col-span-1 flex justify-evenly items-center">
                    <h6 className="text-xl font-bold mr-2 cursor-pointer outline-none" onClick={() => decreaseQty()}>-</h6>
                    <div className="h-6 w-6 bg-green-400 flex justify-center items-center rounded-full text-base font-medium mr-2 cursor-pointer">{qty}</div>
                    <h6 className="text-xl font-bold mr-2 cursor-pointer outline-none" onClick={() => increaseQty()}>+</h6>
                    <h6 className="h-6 w-6 bg-red-400 flex justify-center items-center rounded-full text-base font-medium cursor-pointer" onClick={() => removeFromDine()}>X</h6>
                </div>
            </div>

            <hr class="h-px my-2 bg-gray-600 border-0"></hr>
        </>
    )
}

export default DishInCart