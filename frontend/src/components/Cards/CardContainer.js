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

    await dispatch(individualProperty(id))
    navigate("/details")

  }

  console.log(hotelsList, "4444");

  //   (hotelsList.length).map((dta, i)=>{
  //     return console.log(i+1);
  // })


  //   const pagination = [hotelsList?.map(arr => arr.pname).filter(pname => pname)];
  //   console.log(typeof (pagination), "ooo");
  //   console.log(pagination, "22");

  //   const length = pagination.reduce((acc, val) => acc + 1, 0); // 3

  // console.log(length);

  // const length = pagination 
  //   .map(obj => obj.pname)
  //   .filter(name => name)
  //   .length;

  // console.log(length," :pppp");

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(2)
  

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = hotelsList?.slice(firstPostIndex, lastPostIndex)

  const [search, setSearch]=useState("")
console.log(search);

  return (
    <div>

      <div className='flex justify-center mr-6'>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Search"
            onChange={(e)=>{setSearch(e.target.value)}}
             variant="standard" />
          </Box>
        </Box>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2'>

        {
          currentPosts?.filter((data)=>{
            return search==='' ? data : data.pname.toLowerCase().includes(search.toLowerCase())
          }).map((data, i) => (

            <div className="flex flex-wrap" onClick={() => {
              propertyHandler(data._id)
            }}>
              <a href="#" class="block ml-6 rounded-lg p-6 shadow-sm shadow-indigo-100">
                <img
                  alt="Home"
                  src={data.pic[0]}
                  class="h-56 w-full rounded-md object-cover"
                />
                <div class="mt-2">
                  <dl>
                    <div>
                      <dt class="sr-only">Price</dt>

                      <dd class="text-sm text-gray-500">$240,000</dd>
                    </div>

                    <div>
                      <dt class="sr-only">{data.pname}</dt>

                      <dd class="font-medium">{data.pstate}</dd>
                    </div>
                  </dl>

                  <div class="mt-6 flex items-center gap-8 text-xs">
                    <div class="sm:inline-flex sm:shrink-0 sm:items-center">
                      <svg
                        class="h-4 w-4 text-indigo-700"
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

                      <div class="mt-1.5 sm:ml-3 sm:mt-0">
                        <p class="text-gray-500">Parking</p>

                        <p class="font-medium">2 spaces</p>
                      </div>
                    </div>

                    <div class="sm:inline-flex sm:shrink-0 sm:items-center">
                      <svg
                        class="h-4 w-4 text-indigo-700"
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

                      <div class="mt-1.5 sm:ml-3 sm:mt-0">
                        <p class="text-gray-500">Bathroom</p>

                        <p class="font-medium">2 rooms</p>
                      </div>
                    </div>

                    <div class="sm:inline-flex sm:shrink-0 sm:items-center">
                      <svg
                        class="h-4 w-4 text-indigo-700"
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

                      <div class="mt-1.5 sm:ml-3 sm:mt-0">
                        <p class="text-gray-500">Bedroom</p>

                        <p class="font-medium">4 rooms</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

          ))
        }

      </div>
      <LandingPagination totalPosts={4}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />


    </div>

  )
}

export default CardContainer