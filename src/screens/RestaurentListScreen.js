import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const RestaurentListScreen = () => {

    const [restaurentData, setRestaurentData] = useState(null)

    const navigate = useNavigate()

    const currentUrl = window.location.href;

    const urlParams = new URLSearchParams(new URL(currentUrl).search);

    const cuisine = urlParams.get("cuisine");

    const ambience = urlParams.get("ambience");

    const city = urlParams.get("city");

    const navigationHandler = (id) => {
        console.log(id)
        navigate(`/menu/${id}`)
    }

    useEffect(() => {
        const getData = async () => {

            let data = []

            if(cuisine) {
                data = await axios.get(`http://127.0.0.1:3001/api/restaurents/cuisine/${cuisine}?city=${city}`)
            } else if(ambience) {
                data = await axios.get(`http://127.0.0.1:3001/api/restaurents/ambience/${ambience}?city=${city}`)
            }

            console.log(data)
            if(data) {
                setRestaurentData(data.data)
            }
        }

        console.log(`printing the ambience ${ambience}`)

        getData()
    }, [cuisine])

    return (
        <div className="w-screen h-fit bg-black text-white px-10 py-6">
            <Navbar isProfile={true} placeholder='search for restaurents'/>
            <div className="flex-grow px-12 py-4 mt-4">
            <div className="grid grid-cols-4 gap-12 w-full h-full overflow-hidden">

                {restaurentData && restaurentData.map((x) => {
                    const address = x.address
                    const parts = address.split(", ");
                    const pincode = parts[parts.length - 1];
                    return (
                        <div className="flex-col rounded-md bg-gray-600">
                            <div className="rounded-md">
                                <img src={x.image} className="h-40 w-full object-cover rounded-md" />
                            </div>
                            <div className="p-2">
                                <h4 className="text-base font-semibold mb-2">{x.restaurant_name}</h4>
                                <h6 className="text-xs mb-1">{x.address}</h6>
                                <h6 className="text-xs">{pincode}, 10k+ reviews</h6>
                            </div>
                            <div className="p-4">
                                <button type="button" class=" text-white font-medium rounded-lg text-sm px-5 py-2 text-center w-full bg-gray-800" onClick={() => navigationHandler(x._id)}>View menu</button>
                            </div>
                        </div>
                    )
                })}

                {/* <div className="flex-col rounded-md bg-gray-600">
                    <div className="rounded-md">
                        <img src="ruchi.jpg" className="h-40 w-full object-cover rounded-md" />
                    </div>
                    <div className="p-2">
                        <h4 className="text-base font-semibold mb-2">Akshaya A/C</h4>
                        <h6 className="text-xs mb-1">Poonkunnam, Thrissur, Kerala</h6>
                        <h6 className="text-xs">680002, 10k+ reviews</h6>
                    </div>
                    <div className="p-4">
                        <button type="button" class=" text-white font-medium rounded-lg text-sm px-5 py-2 text-center w-full bg-gray-800">View menu</button>
                    </div>
                </div>
                <div className="flex-col rounded-md bg-gray-600">
                    <div className="rounded-md">
                        <img src="ruchi.jpg" className="h-40 w-full object-cover rounded-md" />
                    </div>
                    <div className="p-2">
                        <h4 className="text-base font-semibold mb-2">Akshaya A/C</h4>
                        <h6 className="text-xs mb-1">Poonkunnam, Thrissur, Kerala</h6>
                        <h6 className="text-xs">680002, 10k+ reviews</h6>
                    </div>
                    <div className="p-4">
                        <button type="button" class=" text-white font-medium rounded-lg text-sm px-5 py-2 text-center w-full bg-gray-800">View menu</button>
                    </div>
                </div>
                <div className="flex-col rounded-md bg-gray-600">
                    <div className="rounded-md">
                        <img src="ruchi.jpg" className="h-40 w-full object-cover rounded-md" />
                    </div>
                    <div className="p-2">
                        <h4 className="text-base font-semibold mb-2">Akshaya A/C</h4>
                        <h6 className="text-xs mb-1">Poonkunnam, Thrissur, Kerala</h6>
                        <h6 className="text-xs">680002, 10k+ reviews</h6>
                    </div>
                    <div className="p-4">
                        <button type="button" class=" text-white font-medium rounded-lg text-sm px-5 py-2 text-center w-full bg-gray-800">View menu</button>
                    </div>
                </div>
                <div className="flex-col rounded-md bg-gray-600">
                    <div className="rounded-md">
                        <img src="ruchi.jpg" className="h-40 w-full object-cover rounded-md" />
                    </div>
                    <div className="p-2">
                        <h4 className="text-base font-semibold mb-2">Akshaya A/C</h4>
                        <h6 className="text-xs mb-1">Poonkunnam, Thrissur, Kerala</h6>
                        <h6 className="text-xs">680002, 10k+ reviews</h6>
                    </div>
                    <div className="p-4">
                        <button type="button" class=" text-white font-medium rounded-lg text-sm px-5 py-2 text-center w-full bg-gray-800">View menu</button>
                    </div>
                </div>
                <div className="flex-col rounded-md bg-gray-600">
                    <div className="rounded-md">
                        <img src="ruchi.jpg" className="h-40 w-full object-cover rounded-md" />
                    </div>
                    <div className="p-2">
                        <h4 className="text-base font-semibold mb-2">Akshaya A/C</h4>
                        <h6 className="text-xs mb-1">Poonkunnam, Thrissur, Kerala</h6>
                        <h6 className="text-xs">680002, 10k+ reviews</h6>
                    </div>
                    <div className="p-4">
                        <button type="button" class=" text-white font-medium rounded-lg text-sm px-5 py-2 text-center w-full bg-gray-800">View menu</button>
                    </div>
                </div>
                <div className="flex-col rounded-md bg-gray-600">
                    <div className="rounded-md">
                        <img src="ruchi.jpg" className="h-40 w-full object-cover rounded-md" />
                    </div>
                    <div className="p-2">
                        <h4 className="text-base font-semibold mb-2">Akshaya A/C</h4>
                        <h6 className="text-xs mb-1">Poonkunnam, Thrissur, Kerala</h6>
                        <h6 className="text-xs">680002, 10k+ reviews</h6>
                    </div>
                    <div className="p-4">
                        <button type="button" class=" text-white font-medium rounded-lg text-sm px-5 py-2 text-center w-full bg-gray-800">View menu</button>
                    </div>
                </div>
                <div className="flex-col rounded-md bg-gray-600">
                    <div className="rounded-md">
                        <img src="ruchi.jpg" className="h-40 w-full object-cover rounded-md" />
                    </div>
                    <div className="p-2">
                        <h4 className="text-base font-semibold mb-2">Akshaya A/C</h4>
                        <h6 className="text-xs mb-1">Poonkunnam, Thrissur, Kerala</h6>
                        <h6 className="text-xs">680002, 10k+ reviews</h6>
                    </div>
                    <div className="p-4">
                        <button type="button" class=" text-white font-medium rounded-lg text-sm px-5 py-2 text-center w-full bg-gray-800">View menu</button>
                    </div>
                </div> */}
                {/* <div className="flex-col rounded-md bg-gray-600">
                    <div className="rounded-md">
                        <img src="ruchi.jpg" className="h-40 w-full object-cover rounded-md" />
                    </div>
                    <div className="p-2">
                        <h4 className="text-base font-semibold mb-2">Akshaya A/C</h4>
                        <h6 className="text-xs mb-1">Poonkunnam, Thrissur, Kerala</h6>
                        <h6 className="text-xs">680002, 10k+ reviews</h6>
                    </div>
                    <div className="p-4">
                        <button type="button" class=" text-white font-medium rounded-lg text-sm px-5 py-2 text-center w-full bg-gray-800">View menu</button>
                    </div>
                </div> */}
            </div>
            </div>
        </div>
    )

}

export default RestaurentListScreen