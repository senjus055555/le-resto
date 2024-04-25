import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import {useNavigate} from 'react-router-dom'

const HomeScreen = () => {

    const navigate = useNavigate()

    const [city, setCity] = useState(null)
    const [searchQuery, setSearchQuery] = useState(null)
    const [ambience, setAmbience] = useState(null)
    const [cuisine, setCuisine] = useState(null)
    const [err, setErr] = useState(null)
    const [errVisible, setErrVisible] = useState(true)

    const cuisineSelector = (value) => {
        setCuisine(value)
    }

    const ambienceSelector =  (value) => {
        setAmbience(value)
    }

    useEffect(() => {
        if(city && ambience) {
            navigate(`/restaurents?ambience=${ambience}&city=bangalore`)
        } else if(city && cuisine) {
            navigate(`/restaurents?cuisine=${cuisine}&city=bangalore`)
        }
    }, [ambience, cuisine])

    const serachHandler = () => {
        if(!city) {
            setErr('Please select a city to continue')
            setErrVisible(true)
            setTimeout(() => {
                setErr('');
                setErrVisible(false);
              }, 2000);
        } else if(!searchQuery) {
            setErr('Please enter the dish to continue')
            setErrVisible(true)
            setTimeout(() => {
                setErr('');
                setErrVisible(false);
              }, 2000);
        } else {
            navigate(`/restaurents?query=${searchQuery}&city=${city}`)
        }  
    }

    // const ambienceHandler = async () => {
    //     if(!city) {
    //         setErr('Please select a city to continue')
    //         setErrVisible(true)
    //         setTimeout(() => {
    //             setErr('');
    //             setErrVisible(false);
    //           }, 2000);
    //     } else if(!ambience) {
    //         console.log('i cannot see the ambience')
    //         // console.log(ambience)
    //         // setErr('Please enter the dish to continue')
    //         // setErrVisible(true)
    //         // setTimeout(() => {
    //         //     setErr('');
    //         //     setErrVisible(false);
    //         //   }, 2000);
    //     } else {
    //         navigate(`/restaurents?ambience=${ambience}&city=${city}`)
    //     }  
    // }

    return (
        <div className='bg-black w-screen h-fit pt-5 pb-2 text-white'>
            <div className='w-full h-full  text-white px-8 py-4'>
                <Navbar isProfile={true} isLocation={true} setCity={setCity} setSearchQuery={setSearchQuery} serachHandler={serachHandler}/>
                {err && <div class="p-2 mt-8 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                        <span class="font-medium"></span> {err}
                    </div>}
                <div className='w-full h-40 p-6 mt-4'>
                    <h3 className='text-lg font-medium mb-2'>Find your perfect ambience</h3>
                    <div className='flex justify-start items-center gap-2'>
                        <img src='romantic.png' className='w-24 h-24 object-contain mr-2 cursor-pointer' onClick={() => ambienceSelector('romantic')}/>
                        <img src='livemusic.png' className='w-24 h-24 object-contain mr-2 cursor-pointer' onClick={() => ambienceSelector('livemusic')}/>
                        <img src='retro.png' className='w-24 h-24 object-contain mr-2 cursor-pointer' onClick={() => ambienceSelector('retro')}/>
                        <img src='sportsbar.png' className='w-24 h-24 object-contain mr-2 cursor-pointer' onClick={() => ambienceSelector('sportsbar')}/>
                        <img src='family.png' className='w-24 h-24 object-contain mr-2 cursor-pointer' onClick={() => ambienceSelector('family')}/>
                    </div>
                </div>
                <div className='w-full p-6'>
                    <h3 className='text-lg font-medium mb-2 mt-4'>Explore restaurents by cuisine</h3>
                    <div className=' w-full grid grid-cols-4 gap-4'>
                        <img src='vegetarian.png' className='w-5/6 object-contain cursor-pointer' onClick={() => cuisineSelector('vegetarian')}/>
                        <img src='ricedishes.png' className='w-5/6 object-contain cursor-pointer' onClick={() => cuisineSelector('ricedishes')} />
                        <img src='bbq.png' className='w-5/6 object-contain cursor-pointer' onClick={() => cuisineSelector('bbq')}/>
                        <img src='noodles.png' className='w-5/6 object-contain cursor-pointer' onClick={() => cuisineSelector('noodles')} />
                        <img src='salads.png' className='w-4/5 object-contain cursor-pointer' onClick={() => cuisineSelector('salads')}/>
                        <img src='burgers.png' className='w-4/5 object-contain cursor-pointer' onClick={() => cuisineSelector('burgers')} />
                        <img src='beverage.png' className='w-4/5 object-contain cursor-pointer' onClick={() => cuisineSelector('beverage')}/>
                        <img src='chefspecial.png' className='w-4/5 object-contain cursor-pointer' onClick={() => cuisineSelector('cheffspecials')}/>
                    </div>
                    {/* {console.log(`current ambience value is: ${ambience}`)}
                    {console.log(`current cuisine value is: ${cuisine}`)}
                    {console.log(`current searchquery value is: ${searchQuery}`)}
                    {console.log(`current city value is: ${city}`)} */}
                </div>
            </div>
        </div>
    )
}

export default HomeScreen