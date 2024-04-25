import React, { useState } from "react";
import Searchbar from "./Searchbar";
import { MdLocationOn } from "react-icons/md";
import Select, { components } from 'react-select';
import {useNavigate} from 'react-router-dom'

// Custom Dropdown Indicator component
const CustomDropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <MdLocationOn />
      </components.DropdownIndicator>
    );
  };
  
  const options = [
    { value: 'kochi', label: 'kochi' },
    { value: 'bangalore', label: 'bangalore' },
    { value: 'chennai', label: 'chennai' },
    { value: 'delhi', label: 'delhi' },
    // Add more options as needed
  ];


const Navbar = ({isProfile, isLocation, setCity, setSearchQuery, serachHandler, placeholder}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/home')
    }

    const customStyles = {
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: '12px',
          padding: '0.05rem', 
          borderWidth: '1px', 
          borderColor: 'none', 
          fontSize: '14px',
          boxShadow: state.isFocused ? '0 0 0 0px none' : 'none',
          '&:hover': {
            borderColor: 'none',
          },
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: 'white', 
          color: 'black',
          borderRadius: '12px',
          padding: '0.05rem', 
          fontSize: '14px',
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          display: 'none', 
        }),
        option: (provided, state) => ({
          ...provided,
          borderBottom: '1px solid #ccc',
          backgroundColor: state.isSelected ? 'black' : 'white',
          ':hover': {
            backgroundColor: 'black', 
            color: 'white'
          },
        }),
      };

    return (
        <nav className="w-full px-2 sm:px-6 lg:px-8 text-white">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="w-full flex gap-10">
                        <div className="flex-shrink-0  flex items-center">
                            <img className="h-5 w-auto hover:cursor-pointer" src="logo.png" alt="Your Company" onClick={navigateToHome} />
                        </div>
                        {
                            isLocation && (
                                <div className="w-2/5">
                                    <Select
                                        options={options}
                                        components={{ DropdownIndicator: CustomDropdownIndicator }}
                                        styles={customStyles}
                                        placeholder="select your location"
                                        onChange={(e) => setCity(e.value)}
                                    />
                                </div>
                            )
                        }
                    </div>
                    {/* Nav Links */}
                    {
                        // isProfile && (
                        //     <Searchbar setSearchQuery={setSearchQuery} serachHandler={serachHandler} placeholder={placeholder}/>
                        // )
                    }
                    <div className="hidden sm:block w-full">
                        {isProfile ?  (
                            <div className="flex items-center justify-end  w-full">
                                <div className="flex flex-col justify-center">
                                    <h6 className="text-sm text-right">Hey Doodle</h6>
                                    <h6 className="text-xs text-right">see your dashboard</h6>
                                </div>
                                <img src="profile.png" className="w-14 h-14 object-contain" />
                        </div>
                        ) : (
                            <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Home</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Contact</a>
                        </div>
                        )}
                    </div>
                    {/* Mobile Hamburger Menu */}
                    <div className="sm:hidden">
                        <button
                            type="button"
                            className="text-gray-400 hover:text-white focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                            onClick={toggleMobileMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            {/* Mobile Menu */}
            <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Home</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Contact</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
