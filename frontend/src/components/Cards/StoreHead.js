import React from 'react'
import { useState } from "react";
import './StoreHead.css'
import Calendar from 'react-calendar'

const StoreHead = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [change, onChange] = useState(new Date());

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      
    
      <div class="flex flex-col p-16">
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div class="flex flex-col">
              <label for="name" class="font-medium text-sm text-stone-600">Type</label>
              <div class="custom-number-input h-10 w-32 flex flex-col text-right justify-items-end justify-end">
                      <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button data-action="decrement" class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                          <span class="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input type="number" class=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value="0"></input>
                        <button data-action="increment" class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                          <span class="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                    </div>
            </div>

            <div className="relative">
              <button
                className="flex items-center px-2 py-2 border rounded text-sm font-medium focus:outline-none"
                onClick={toggle}
              >
                Dropdown
              </button>
              <div
                className={`${isOpen
                    ? 'block'
                    : 'hidden'
                  } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg`}
              >
                <div className="bg-white rounded-md shadow-xs">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                      Option 1
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                      Option 2
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                      Option 3
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col">
              <label for="date" class="font-medium text-sm text-stone-600">Published Date</label>
              <input
                type="date"
                id="date"
                class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              />
            </div>
            <div class="flex flex-col">
              <label for="date" class="font-medium text-sm text-stone-600">Published Date</label>
              <input
                type="date"
                id="date"
                class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              />
            </div>


          </div>

          <div class="grid md:flex grid-cols-2 justify-end space-x-4 w-full mt-6">
            <button class="px-4 py-2 rounded-lg  bg-stone-400 hover:bg-stone-500 font-bold text-white shadow-lg shadow-stone-200 transition ease-in-out duration-200 translate-10">
              Reset
            </button>

            <button class="px-4 py-2 rounded-lg  bg-blue-400 hover:bg-blue-400 font-bold text-white shadow-lg shadow-blue-200 transition ease-in-out duration-200 translate-10">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreHead