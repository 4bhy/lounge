import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { pageTwoSuccess } from '../../features/host/pageTwoSlice'
import { getStorage, ref, uploadBytes } from "firebase/storage";


const AddPropertyToggles = () => {
  const [internet, setInternet] = useState(false)
  const [AC, setAC] = useState(false)
  const [kitchen, setKitchen] = useState(false)
  const [laundry, setLaundry] = useState(false)
  const [TV, setTV] = useState(false)
  const dispatch = useDispatch()
  const [button, setButton] = useState(true)

  console.log(internet, AC, kitchen);

  const submitHandler = (e) => {
    console.log("88");
    e.preventDefault()
    console.log("test");
    dispatch(pageTwoSuccess(internet))
  }
  const pageTwo = useSelector((state) => state.PageTwo)
  console.log(pageTwo, "5678");
  // const {pageTwoInfo}= pageTwo;
  // console.log(pageTwoInfo, "44");

  return (
    <div>
      <div>
        <form onSubmit={submitHandler}>
          <div className='w-auto'>

            <div className="flex  flex-row ">
              <h1 className="font-bold ml-10">
                WiFi and Internet
              </h1>
              <div class="flex flex-row" onChange={(e) => { setInternet(e.target.value) }}>
                <div class="ml-60">
                  <input id="default-radio-1" type="radio" value="yes" name="internet" class="peer opacity-0 w-2 h-2 rounded-xl text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-1" class="flex cursor-pointer p-4 rounded-3xl  bg-gray-200 justify-center items-center h-10 w-full peer-checked:bg-blue-500 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>
                <div class="ml-2">
                  <input id="default-radio-2" type="radio" value="no" name="internet" class="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-2" class="flex cursor-pointer p-4  rounded-3xl bg-gray-200 justify-center items-center h-10 w-full peer-checked:bg-blue-500 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>
              </div>
            </div>

            <div className="flex flex-row ">
              <h1 className="font-bold ml-10">
                Air Conditioning
              </h1>
              <div class=" flex flex-row " onChange={(e) => { setAC(e.target.value) }}>

                <div class="ml-64">
                  <input id="default-radio-11" type="radio" value="true" name="ac" class="peer opacity-0 w-2 h-2 rounded-xl text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-11" class="flex cursor-pointer p-4 rounded-3xl  bg-gray-200 justify-center items-center h-10 w-full peer-checked:bg-blue-500 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>


                <div class="ml-2">
                  <input id="default-radio-22" type="radio" value="false" name="ac" class="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-22" class="flex cursor-pointer p-4 rounded-2xl  bg-gray-200 justify-center items-center h-10 w-full peer-checked:bg-blue-500 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>
              </div>
            </div>

            <div className="flex flex-row row-auto">
              <h1 className="font-bold ml-10">
                Kitchen Facilities
              </h1>
              <div class=" row-auto flex flex-row" onChange={(e) => { setKitchen(e.target.value) }}>

                <div class="ml-64">
                  <input id="default-radio-111" type="radio" value="true" name="kitchen" class="peer opacity-0 w-2 h-2 rounded-xl text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-111" class="flex cursor-pointer p-4 rounded-3xl  bg-gray-200 justify-center items-center h-10 w-full peer-checked:bg-blue-500 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>


                <div class="ml-2">
                  <input id="default-radio-222" type="radio" value="false" name="kitchen" class="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-222" class="flex cursor-pointer p-4 rounded-3xl bg-gray-200 justify-center items-center h-10 w-full peer-checked:bg-blue-500 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>
              </div>
            </div>
            <div className="flex flex-row row-auto ">
              <h1 className="font-bold ml-10 ">
                Television Options
              </h1>
              <div class=" row-auto flex-row flex" onChange={(e) => { setTV(e.target.value) }}>

                <div class="ml-60">
                  <input id="default-radio-1111" type="radio" value="true" name="TV" class="peer  opacity-0 w-2 h-2 rounded-xl text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-1111" class="flex cursor-pointer p-4 rounded-3xl bg-gray-200 justify-center items-center h-10 w-full peer-checked:bg-blue-500 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>

                <div class="ml-2">
                  <input id="default-radio-2222" type="radio" value="false" name="TV" class="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-2222" class="flex cursor-pointer p-4 rounded-3xl  bg-gray-200 justify-center items-center h-10 w-full peer-checked:bg-blue-500 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>

              </div>
            </div>
            <div className="flex flex-row row-auto ">
              <h1 className="font-bold ml-10 ">
                Laundry facilities
              </h1>
              <div class=" row-auto flex flex-row" onChange={(e) => { setLaundry(e.target.value) }}>

                <div class="ml-64">
                  <input id="default-radio-11111" type="radio" value="true" name="laundry" class="peer opacity-0 w-2 h-2 rounded-xl text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-11111" class="flex cursor-pointer p-4 rounded-3xl  bg-gray-200 justify-center items-center h-10 w-full peer-checked:bg-blue-500 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                </div>

                <div class="ml-2">
                  <input id="default-radio-22222" type="radio" value="false" name="laundry" class="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-22222" class="flex cursor-pointer p-4  rounded-2xl bg-gray-200 justify-center items-center h-10 w-full peer-checked:bg-blue-500 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>
              </div>
            </div>

          </div>

          <div className=' m-4 flex justify-center'>
            <button onClick={submitHandler} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              SUBMIT
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddPropertyToggles
