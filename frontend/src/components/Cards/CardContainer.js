import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { listHotel } from '../../actions/adminActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LandingPagination from '../Pagination/LandingPagination'

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
  const [postsPerPage, setPostsPerPage] = useState(3)

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

      <div className='flex justify-center mr-6 mt-3'>
        <div class="relative text-gray-600">
          <input onChange={handleQueryChange} type="search" name="serch" placeholder="Search" class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none border" />
          <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{ enableBackground: 'new 0 0 56.966 56.966' }} width="512px" height="512px">
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </div>

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