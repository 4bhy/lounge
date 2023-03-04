import React from 'react'
import { useState } from "react";
// import './StoreHead.css'


const StoreHead = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [change, onChange] = useState(new Date());

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className='flex justify-center'>
<div className="bar mt-10 w-650 bg-white shadow-md rounded-full flex justify-center text-sm">
  <div className="location w-34 px-6 py-2 rounded-full transition-colors duration-250 ease hover:bg-gray-100">
    <p className='text-green-500'>Location</p>
    <input type="text" placeholder="Where are you going?" className="bg-transparent border-none mt-2 placeholder-gray-500 focus:outline-none"/>
  </div>
  <div className="check-in w-22 px-6 py-2 rounded-full transition-colors duration-250 ease hover:bg-gray-100">
    <p className='text-green-500'>Check in</p>
    <input type="text" placeholder="Add dates" className="bg-transparent border-none mt-2 placeholder-gray-500 focus:outline-none"/>
  </div>
  <div className="check-out w-22 px-6 py-2 rounded-full transition-colors duration-250 ease hover:bg-gray-100">
    <p className='text-green-500'>Check out</p>
    <input type="text" placeholder="Add dates" className="bg-transparent border-none mt-2 placeholder-gray-500 focus:outline-none"/>
  </div>
  <div className="guests w-22 px-6 py-2 rounded-full relative transition-colors duration-250 ease hover:bg-gray-100">
    <p className='text-green-500'>Guests</p>
    <input type="text" placeholder="Add guests" className="bg-transparent border-none placeholder-gray-500 mt-2 focus:outline-none"/>
    <span className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-600 text-white rounded-full text-xs px-3 py-1"><i className="lni lni-search-alt"></i></span>
  </div>
</div>


    </div>
  )
}

export default StoreHead