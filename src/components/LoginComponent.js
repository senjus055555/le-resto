import React, {useState, useEffect} from "react";
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdPassword } from 'react-icons/md';
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const LoginComponent = () => {

    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setAdmin] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const submit = async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
        }

        console.log('sending requests..')

        // navigate(`/home`, { state: { name: 'Zack' } })

        const { data } = await axios.post(
            'https://jellyfish-app-wmpnc.ondigitalocean.app/api/teachers/login',
            { phoneNumber, password },
            config
        )

        const {message, name} = data

        if(name) {
            navigate(`/home`, { state: { name: name } })
        } else if(message) {
            setError(message)
        }


        // console.log('sent request..')
        // console.log('data received', data)
      
    }

    return ( 
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-10 xl:grid-cols-11 h-full overflow-y-hidden ">
            <div className="w-full bg-slate-200 rounded-xl md:col-span-1 lg:col-span-4 xl:col-span-3 sm:pb-4 sm:px-2">
                <div className="flex justify-center">
                    <img src="./linfield-logo.png" className="max-[520px]:w-3/12  max-[520px]:h-3/12 max-[640px]:w-2/12  max-[640px]:h-2/12 sm:w-2/12 sm:h-2/12 md:w-3/12 md:h-3/12 rounded-md pt-3 md:pt-6"/>
                </div>
                
            </div>
            <div className="max-[640px]:hidden w-full h-full rounded-lg md:col-span-1 lg:col-span-6 xl:col-span-8 md:flex md:justify-center md:align-middle">
                <div className="w-full h-full flex justify-center md:-mb-20  ">
                    <img src="login-img.png" className="rounded-md md:w-full lg:w-3/5 h-3/5 object-cover" />
                </div>
            </div>
        </div>
    )
}

export default LoginComponent