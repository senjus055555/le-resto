import React, {useEffect} from "react";
import Lottie from "lottie-react";
import animationData from '../assets/Animation - 1707220395272.json'
import { useNavigate } from 'react-router-dom';

const SuccessScreen = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/home'); // Replace '/home' with the route to your home screen
          }, 5000);
      
          // Clear the timeout when the component unmounts
          return () => clearTimeout(timeoutId);
    }, [navigate])

    return (
        <div className="h-screen w-screen p-6 flex justify-center items-center bg-black text-white">
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <Lottie animationData={animationData} className="w-1/2 h-1/2" />
                    <h2 className="text-lg font-bold pt-3">Hurrayy!!🔥. Thanks for choosing Le-Resto</h2>
                </div>
            </div>
        </div>
    )
}

export default SuccessScreen

