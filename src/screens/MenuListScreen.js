import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import MenuItem from "../components/MenuItem";
import SmallMenuItem from "../components/SmallMenuItem";
import { IoFastFoodOutline } from "react-icons/io5";
import {useNavigate} from 'react-router-dom'

const MenuListScreen = () => {

    const [menu, setMenu] = useState(null)
    const [restaurentInfo, setRestaurentInfo] = useState(null)

    const {id} = useParams()
    console.log(`Printing the restaurent id ${id}`)

    const navigate = useNavigate()

    const cartNavigator = () => {
        navigate(`/cart?id=${id}`)
    }

    useEffect(() => {
        const getRestaurentMenu = async () => {
            if(id) {
                const {data} = await axios.get(`http://127.0.0.1:3001/api/restaurents/${id}`)
                console.log('printing the menu data')
                console.log(data)
                setMenu(data)
            }
        }

        const getRestaurentInfo = async () => {
            if(id) {
                const {data} = await axios.get(`http://127.0.0.1:3001/api/restaurents/info/${id}`)
                console.log(data)
                setRestaurentInfo(data)
            }
        }

        getRestaurentMenu()
        getRestaurentInfo()
    }, [id])

    return (
        <div className="w-screen bg-black p-12">
            
            <div className="h-28 flex justify-between">
                <div className="flex">
                    <div>
                        <img src={restaurentInfo && restaurentInfo.image} className="h-28 w-32 rounded-md mr-6"/>
                    </div>
                    <div className="flex flex-col justify-center items-center p-2">
                        <div>
                            <h3 className="text-white text-2xl font-semibold">{restaurentInfo && restaurentInfo.restaurant_name}</h3>
                        </div>
                    <div>
                            <h6 className="text-white text-lg font-medium">Non vegetarian dishes</h6>
                    </div>
                    </div>
                </div>
                <div className="h-full flex text-white gap-2">
                    <IoFastFoodOutline  className="w-8 h-8 text-white cursor-pointer" onClick={() => cartNavigator()} /><span className="pt-1 cursor-pointer" onClick={() => cartNavigator()}>view dine</span>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-white text-lg font-medium">Starters & popular drinks</h2>
                <div className="flex overflow-x-auto max-w-screen-2xl gap-3 py-1">
                    {
                        menu && menu.map((x) => {
                            if (x.category === "starters" && x.remaining > 0) {
                            return (
                                <SmallMenuItem id={x._id} image={x.item_image} name={x.item_name} calorie={x.calorie} price={x.item_price}/>
                            );
                            } else {
                            return null; // or any other default content for other categories
                            }
                        })
                    }
     
                </div>

                <div className="mt-8">
                    <h2 className="text-white text-lg font-medium mb-2">Non vegetarian dishes</h2>
                    <div className="flex overflow-x-auto max-w-screen-2xl gap-4 py-1">
                        {
                            menu && menu.map((x) => {
                                if(x.category === 'main course' && x.remaining > 0) {
                                    return (
                                        <MenuItem id={x._id} image={x.item_image} name={x.item_name} price={x.item_price} calorie={x.calorie} />
                                    )
                                } else {
                                    return null
                                }
                            })
                        }

                        {/* <div className="flex-shrink-0 bg-gray-300 text-black p-3 flex gap-6 rounded-md">
                            <div>
                                <img src="https://b.zmtcdn.com/data/pictures/3/19718913/5a1034a8a2e6ac2ee2d9509b21470a23_o2_featured_v2.jpg" className="h-40 w-32 rounded-md object-cover" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h4 className="text-base font-semibold">chicken biriyani</h4>
                                <div className="flex justify-between items-center">
                                    <h5 className="text-lg font-semibold">₹ 199</h5>
                                    <h5 className="text-sm">300 ♨️</h5>
                                </div>
                                <div className="w-56 pt-2">
                                    <p className="text-xs">Thalasseri Biriyani A customers favorite, marinated chicken pieces layered between rice cooked along with whole spices.</p>
                                </div>
                            </div>
                        </div> */}

                        {/* <div className="flex-shrink-0 bg-gray-300 text-black p-3 flex gap-6 rounded-md">
                            <div>
                                <img src="https://b.zmtcdn.com/data/pictures/3/19718913/5a1034a8a2e6ac2ee2d9509b21470a23_o2_featured_v2.jpg" className="h-40 w-32 rounded-md object-cover" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h4 className="text-base font-semibold">chicken biriyani</h4>
                                <div className="flex justify-between items-center">
                                    <h5 className="text-lg font-semibold">₹ 199</h5>
                                    <h5 className="text-sm">300 ♨️</h5>
                                </div>
                                <div className="w-56 pt-2">
                                    <p className="text-xs">Thalasseri Biriyani A customers favorite, marinated chicken pieces layered between rice cooked along with whole spices.</p>
                                </div>
                            </div>
                        </div> */}

                        {/* <div className="flex-shrink-0 bg-gray-300 text-black p-3 flex gap-6 rounded-md">
                            <div>
                                <img src="https://b.zmtcdn.com/data/pictures/3/19718913/5a1034a8a2e6ac2ee2d9509b21470a23_o2_featured_v2.jpg" className="h-40 w-32 rounded-md object-cover" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h4 className="text-base font-semibold">chicken biriyani</h4>
                                <div className="flex justify-between items-center">
                                    <h5 className="text-lg font-semibold">₹ 199</h5>
                                    <h5 className="text-sm">300 ♨️</h5>
                                </div>
                                <div className="w-56 pt-2">
                                    <p className="text-xs">Thalasseri Biriyani A customers favorite, marinated chicken pieces layered between rice cooked along with whole spices.</p>
                                </div>
                            </div>
                        </div> */}

                        {/* <div className="flex-shrink-0 bg-gray-300 text-black p-3 flex gap-6 rounded-md">
                            <div>
                                <img src="https://b.zmtcdn.com/data/pictures/3/19718913/5a1034a8a2e6ac2ee2d9509b21470a23_o2_featured_v2.jpg" className="h-40 w-32 rounded-md object-cover" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h4 className="text-base font-semibold">chicken biriyani</h4>
                                <div className="flex justify-between items-center">
                                    <h5 className="text-lg font-semibold">₹ 199</h5>
                                    <h5 className="text-sm">300 ♨️</h5>
                                </div>
                                <div className="w-56 pt-2">
                                    <p className="text-xs">Thalasseri Biriyani A customers favorite, marinated chicken pieces layered between rice cooked along with whole spices.</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                        
                </div>
            </div>
        </div>

    )
}

export default MenuListScreen