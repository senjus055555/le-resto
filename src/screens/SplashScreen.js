import React from "react";
import Navbar from "../components/Navbar";
import {useNavigate} from 'react-router-dom'

const SplashScreen = () => {

    const navigate = useNavigate()

    const submitHandler = () => {
        navigate('/login')
    }

    return (
        
         <div className="flex flex-col h-screen bg-[url('splash.png')] bg-cover px-10">
         
            <Navbar />
            <div className="h-full w-full px-4 md:px-32">
                <div className="grid grid-cols-1 md:grid-cols-2 pt-24 md:pt-48">
                    <div className="w-full">
                        <h1 className="text-white text-2xl font-semibold mb-4">Bringing life to the table</h1>
                        <h4 className="text-white text-base mb-6">Experience the food culture like never before. Our innovative platform connects you with the best restaurants, personalized your dietary preferences. Discover new flavors, Indulge in healthy options, and elevate your dining experience with ease</h4>
                        <button type="button" class="focus:outline-none text-black bg-white font-semibold rounded-xl text-sm w-40 h-10 px-4 me-2 mb-2" onClick={submitHandler}>Get started</button>
                    </div>
                    <div className="hidden md:block">

                    </div>
                </div>
             {/* <div className="h-full w-1/2 flex items-center">
                <div>
                    <h1 className="text-white text-xl font-semibold mb-4">Bringing life to the table</h1>
                    <h4 className="text-white text-base mb-6">Experience the food culture like never before. Our innovative platform connects you with the best restaurants, personalized your dietary preferences. Discover new flavors, Indulge in healthy options, and elevate your dining experience with ease</h4>
                    <button type="button" class="focus:outline-none text-black bg-white font-semibold rounded-xl text-sm w-40 h-10 px-4 me-2 mb-2">Get started</button>
                </div>
             </div> */}
         </div>
     </div>
    )
}

export default SplashScreen