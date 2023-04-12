import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { listHotel } from '../../actions/adminActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LandingPagination from '../Pagination/LandingPagination'
import { searchBar } from '../../actions/userActions'
import { toast, Toaster } from 'react-hot-toast'
import { searchFail, searchSuccess } from '../../features/users/searchSlice'
import Loading from '../Loading'
import { TextField } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import SimpleBackdrop from '../Loading/Backdrop'
import SwingLoad from '../Loading/SwingLoad'


const CardContainer = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(listHotel())
  }, [])

  const listHotels = useSelector((state) => state.listHotels)
  const { searchLoading, searchList, searchError } = useSelector((state) => state.search)

  const { hotelsList, loading, error } = listHotels

  const propertyHandler = async (id) => {
    navigate(`/details/${id}`)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(3)

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage
  let currentPosts = []

  if (searchList != null) {
    currentPosts = searchList?.final?.filter(data => data.isApproved === "true")
      .slice(firstPostIndex, lastPostIndex)
  } else {  
    currentPosts = hotelsList?.filter(data => data.isApproved === "true")
      .slice(firstPostIndex, lastPostIndex)
  }

  const [query, setQuery] = useState('');

  function handleQueryChange(event) {
    setQuery(event.target.value);
  }

  const filteredProducts = currentPosts?.filter(product => {
    const regex = new RegExp(query, 'i');
    return regex.test(product.pname);
  });

  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("")

  const submitHandler = () => {
    if (!location || !checkIn || !checkOut || !guests) {
      toast.error("Please include all fields!")
    } else {
      dispatch(searchBar(location, checkIn, checkOut, guests))

    }
  }
  const clearHandler = () => {
    setLocation(null)
    setCheckIn(null)
    setCheckOut(null)
    setGuests(null)
    dispatch(searchSuccess(null))
    dispatch(searchFail(null))
  }


  return (
    <div>
      <div><Toaster /></div>
      <div className='flex justify-center'>
        <div className="bar mt-10 w-650 bg-white shadow-md rounded-full flex justify-center text-sm">
          <div className="location w-34 px-6 py-2 rounded-full transition-colors duration-250 ease">
            <p className='text-green-500'>Location</p>
            <input onChange={(e) => setLocation(e.target.value)} value={location} type="text" placeholder="Where are you going?" className="bg-transparent border-none mt-2 placeholder-gray-500 focus:outline-none" />
          </div>
          <div className="check-in w-22 px-6 py-2 rounded-full transition-colors duration-250 ease">
            <p className='text-green-500'>Check in</p>
            <input onChange={(e) => setCheckIn(e.target.value)} value={checkIn} type="date" placeholder="Add dates" className="bg-transparent border-none mt-2 placeholder-gray-500 focus:outline-none" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Check In"
                value={checkIn}
                onChange={(newValue) => {
                  setCheckIn(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                inputProps={{}} // Set inputProps to an empty object to prevent Mui-error class from being added
              />
            </LocalizationProvider>

          </div>
          <div className="check-out w-22 px-6 py-2 rounded-full transition-colors duration-250 ease">
            <p className='text-green-500'>Check out</p>
            <input onChange={(e) => setCheckOut(e.target.value)} type="date" value={checkOut} placeholder="Add dates" className="bg-transparent border-none mt-2 placeholder-gray-500 focus:outline-none" />
          </div>
          <div className="guests w-22 px-6 py-2 rounded-full relative transition-colors duration-250 ease">
            <p className='text-green-500'>Guests</p>
            <input onChange={(e) => setGuests(e.target.value)} value={guests} type="text" placeholder="Add guests" className="bg-transparent border-none placeholder-gray-500 mt-2 focus:outline-none" />
            <button onClick={submitHandler} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-600 text-white rounded-full text-xs px-4 py-1"><i class="fa fa-search" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
      {
        (searchError || searchList) && <div className="justify-center justify-items-center mt-2 flex">
          <button onClick={clearHandler} className="text-green-500 border border-green-500 hover:bg-teal-500 hover:text-white active:bg-green-600 font-bold uppercase px-6 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
            Clear
          </button>
        </div>

      }

      {
        searchLoading && <SwingLoad />
      }
      {
        loading &&  <SwingLoad/>
      }

      {
        searchError ? (<div className="bg-neutral-50 justify-items-center justify-center " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.dribbble.com/users/88213/screenshots/8560585/media/7263b7aaa8077a322b0f12a7cd7c7404.png" className="" style={{ margin: 'auto' }} />

        </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1'>
            {filteredProducts?.map((data, i) => (
              <div className="flex flex-wrap" onClick={() => {
                propertyHandler(data._id)
              }}>
                <a href="#" className="block ml-6 rounded-lg p-6 shadow-sm shadow-indigo-100">
                  <img
                    alt="Home"
                    src={data.pic[0]}
                    className="h-56 w-full rounded-md object-cover"
                  />
                  <div className="mt-2">
                    <dl>
                      <div>
                        <dt className="sr-only">Price</dt>
                        <dd className="text-sm text-gray-500">₹{data.price}</dd>
                      </div>
                      <div>
                        <dt className="sr-only">{data.pname}</dt>
                        <dd className="font-medium">{data.pname}</dd>
                      </div>
                    </dl>
                    <div className="mt-6 flex items-center gap-8 text-xs">
                      <div className="sm:inline-flex sm:shrink-0 sm:items-center">
                        {/* Parking SVG here */}
                        <div className="mt-1.5 sm:ml-3 sm:mt-0">
                          <p className="text-gray-500">Parking</p>
                          <p className="font-medium">2 spaces</p>
                        </div>
                      </div>
                      <div className="sm:inline-flex sm:shrink-0 sm:items-center">
                        {/* Bathroom SVG here */}
                        <div className="mt-1.5 sm:ml-3 sm:mt-0">
                          <p className="text-gray-500">Bathroom</p>
                          <p className="font-medium">2 rooms</p>
                        </div>
                      </div>
                      <div className="sm:inline-flex sm:shrink-0 sm:items-center">
                        {/* Bedroom SVG here */}
                        <div className="mt-1.5 sm:ml-3 sm:mt-0">
                          <p className="text-gray-500">Bedroom</p>
                          <p className="font-medium">4 rooms</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )
      }

      <div className='mt-8'>
        <LandingPagination totalPosts={4}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>

  )
}

export default CardContainer