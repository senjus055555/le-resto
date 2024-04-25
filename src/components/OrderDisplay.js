import React, {useState, useEffect} from "react";
import axios from "axios";

const OrderDisplay = ({ order, hours, minutes, seconds, onUpdate }) => {

    const [currentState, changeCurrentState] = useState(order.status)
    console.log('status: ', currentState)

    const changeStatus = async (status, id) => {
        try {
            await axios.put(
                `http://127.0.0.1:3001/api/order/${id}/status`,
                { status },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Update the local state
            changeCurrentState(status);
            // Inform the parent component about the status update
            onUpdate();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };


    return (
        <div className="h-80 w-full bg-gray-100 text-black rounded-md">
            <div className="flex justify-between px-6 py-4">
                <div className="w-full">
                    <div className="font-semibold text-base">
                        Name: {order.customer_name}
                    </div>
                    <div className="font-semibold text-sm">
                        Time ordered: {`${hours}:${minutes}:${seconds}`}
                    </div>
                    <div className=" h-32 w-32 text-center relative">
                        <img src="chair.png" className="h-28 w-28" />
                        <h6 className="text-xs absolute top-3 left-12">A{order.table_number}</h6>
                    </div>
                </div>
                <div className=" h-40 w-full text-center overflow-y-scroll">
                    <div>
                        <h4 className="font-semibold text-base">Items ordered</h4>
                        {order.menu_items.length > 0 && order.menu_items.map((item) => {
                            return (
                                <h3 className="text-sm mt-2">{item.item_name} X {item.quantity}</h3>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="px-6 ">
                <h5 className="font-semibold text-base">Order status</h5>
                <div className="w-full h-14 bg-black mt-1 grid grid-cols-3 gap-2 p-2">
                    <button 
                        type="button" 
                        className={`text-black font-medium rounded-md text-sm ${currentState === 'Confirmed' ? 'bg-green-300' : 'bg-white hover:bg-green-300'}`} 
                        onClick={() => changeStatus('Confirmed', order._id)}
                    >
        Accepted
    </button>

            <button 
                type="button" 
                className={`text-black font-medium rounded-md text-sm ${currentState === 'Prepared' ? 'bg-green-300' : 'bg-white hover:bg-green-300'}`} 
                onClick={() => changeStatus('Prepared', order._id)}
            >
                Prepared
            </button>

            <button 
                type="button" 
                className={`text-black font-medium rounded-md text-sm ${currentState === 'Delivered' ? 'bg-green-300' : 'bg-white hover:bg-green-300'}`} 
                onClick={() => changeStatus('Delivered', order._id)}
            >
                Delivered
            </button>


                </div>
                {console.log(currentState)}
            </div>
        </div>
    );
};


export default OrderDisplay