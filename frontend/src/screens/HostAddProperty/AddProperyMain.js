import React, { useState } from 'react'
import AddPropertyPrimary from './AddPropertyPrimary'


const AddProperyMain = () => {
    const [toggle, setToggle] = useState('first')
    const data = ["first", "second", "third"]
    const toggleHandler = () => {
        if (toggle == "first") {
            setToggle("second")
        } 
    }
    return (
        <div>
            <div>
                <div
                    class="relative m-4 after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
                    <ol
                        class="relative z-10 flex justify-between text-sm font-medium text-gray-500">
                        <li class="flex items-center bg-white p-2">
                            <span
                                class="h-6 w-6 rounded-full bg-gray-100 text-center text-[10px] font-bold leading-6">
                                1
                            </span>
                            <span class="sm:ml-2 sm:block"> Details </span>
                        </li>
                        <li class="flex items-center bg-white p-2">
                            <span
                                class="h-6 w-6 rounded-full bg-blue-600 text-center text-[10px] font-bold leading-6 text-white">
                                2
                            </span>
                            <span class="sm:ml-2 sm:block"> Address </span>
                        </li>
                        <li class="flex items-center bg-white p-2">
                            <span
                                class="h-6 w-6 rounded-full bg-gray-100 text-center text-[10px] font-bold leading-6">
                                3
                            </span>
                            <span class="sm:ml-2 sm:block"> Payment </span>
                        </li>
                    </ol>
                </div>
            </div>
            {
                toggle === 'first' ? <AddPropertyPrimary /> : null
            }
           
            
            <div className=' m-4 flex justify-center'>
                {
                    toggle === 'third' ? <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        FINSIH
                    </button> : <button onClick={toggleHandler} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        NEXT →
                    </button>
                }
            </div>
        </div>
    )
}

export default AddProperyMain
