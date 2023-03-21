import React, { useState } from 'react'
import HotelCard from './HotelCard'
import { Link } from 'react-router-dom'
import { listHotel } from '../../actions/adminActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { individualProperty } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import LandingPagination from '../Pagination/LandingPagination'

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';



const CardContainer = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(listHotel())
  }, [])

  const listHotels = useSelector((state) => state.listHotels)

  const { hotelsList } = listHotels

  const propertyHandler = async (id) => {

    navigate(`/details/${id}`)

  }



  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(6)


  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = hotelsList?.filter(data => data.isApproved === "true").slice(firstPostIndex, lastPostIndex)

  const [search, setSearch] = useState("")
  console.log(search);

  const [query, setQuery] = useState('');

  function handleQueryChange(event) {
    setQuery(event.target.value);
  }

  const filteredProducts = currentPosts?.filter(product => {
    const regex = new RegExp(query, 'i');
    return regex.test(product.pname);
  });

  return (
    <div>

      <div className='flex justify-center mr-6'>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Search"
              onChange={handleQueryChange}
              variant="standard" />
          </Box>
        </Box>
      </div>

      {/* <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2'>

        {
          filteredProducts?.map((data, i) => (
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
                      <svg
                        className="h-4 w-4 text-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                        />
                      </svg>

                      <div className="mt-1.5 sm:ml-3 sm:mt-0">
                        <p className="text-gray-500">Parking</p>

                        <p className="font-medium">2 spaces</p>
                      </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center">
                      <svg
                        className="h-4 w-4 text-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>

                      <div className="mt-1.5 sm:ml-3 sm:mt-0">
                        <p className="text-gray-500">Bathroom</p>

                        <p className="font-medium">2 rooms</p>
                      </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center">
                      <svg
                        className="h-4 w-4 text-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>

                      <div className="mt-1.5 sm:ml-3 sm:mt-0">
                        <p className="text-gray-500">Bedroom</p>

                        <p className="font-medium">4 rooms</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

          ))
        }
      </div> */}
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2'>

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