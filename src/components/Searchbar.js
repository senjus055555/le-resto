import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const Searchbar = ({setSearchQuery, serachHandler, placeholder}) => {
  const [searchValue, setSearchValue] = useState("");


  return (
    
<div className="w-1/3">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <input
          type="search"
          id="default-search"
          className="block w-full p-2 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          placeholder= {placeholder ? placeholder : "Search for a cuisine or restaurent"}
          required
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 end-0 flex items-center pr-3 hover:cursor-pointer" onClick={serachHandler}>
          <CiSearch className="w-5 h-5 text-gray-800 hover:cursor-pointer"/>
        </div>
      </div>
    </div>

  );
};

export default Searchbar;
