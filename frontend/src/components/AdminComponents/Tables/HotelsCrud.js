
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { handleHotels, listHotel, viewProperty } from '../../../actions/adminActions'
import { individualProperty } from '../../../actions/userActions'


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PingLoading from '../../Loading/PingLoading'

const HotelsCrud = () => {

    const listHotels = useSelector((state) => state.listHotels)
    const { loading, errror, hotelsList } = listHotels

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [id, setId] = useState("")

    const hotelsHandler = async (id, status) => {
        await dispatch(handleHotels(id, status))
        await dispatch(listHotel())
    }

    const [open, setOpen] = React.useState(false);
    const individualProperties = useSelector((state) => state.individualProperty)
    const { individualPropertyData } = individualProperties;

    const handleClickOpen = async () => {
        await dispatch(individualProperty(id))
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(listHotel())
    }, [])

    return (
        <div>
            <div class="inline-flex mt-2 xs:mt-0">
            </div>
            <div class="bg-white p-8 rounded-md w-full">
                <div class=" flex items-center justify-between pb-6">
                    <div>
                        <h2 class="text-gray-600 font-semibold">Properties</h2>
                        <span class="text-xs"></span>
                    </div>
                </div>
                <div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            {
                                loading && <div class="z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50"><PingLoading /></div>
                            }
                            {hotelsList &&
                                <table class="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                products
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                STATUS
                                            </th>
                                        </tr>
                                    </thead>

                                    {
                                        hotelsList?.map((hotelsList, index) => (
                                            <tbody>
                                                <tr key={index}>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div class="flex items-center " onClick={() => {
                                                            setId(hotelsList._id)
                                                            handleClickOpen()
                                                        }}>
                                                            <div class="flex-shrink-0 w-10 h-10">
                                                                <img class="w-full h-full rounded-full"
                                                                    src={hotelsList.pic[0]}
                                                                    alt="" />
                                                            </div>
                                                            <div class="ml-3">
                                                                <p class="text-gray-900 whitespace-no-wrap">
                                                                    {hotelsList.pname}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{hotelsList.pstate}</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                            {hotelsList.type}
                                                        </p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <button type="button" onClick={() => {
                                                            hotelsHandler(hotelsList._id, hotelsList.isApproved)
                                                        }} class="inline-block px-6 py-2.5  bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">{hotelsList.isApproved === "true" ? 'Active' : 'Blocked'}</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))
                                    }
                                </table>
                            }           
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogContent>

                    <a class="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                        <img
                            src={individualPropertyData?.propertyInfo?.pic[0]}
                            alt="Home"

                            class="h-56 w-full rounded-md object-cover"
                        />

                        <div class="mt-2">
                            <dl>
                                <div>
                                    <dt class="sr-only">Price</dt>

                                    <dd class="text-sm text-gray-500">{individualPropertyData?.propertyInfo?.pname}</dd>
                                </div>

                                <div>
                                    <dt class="sr-only">Address</dt>

                                    <dd class="font-medium">{individualPropertyData?.propertyInfo?.pstate}</dd>
                                </div>
                            </dl>

                            <div class="mt-6 flex items-center gap-8 text-xs">
                                <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
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

                                    <div class="mt-1.5 sm:mt-0">
                                        <p class="text-gray-500">Parking</p>

                                        <p class="font-medium">2 spaces</p>
                                    </div>
                                </div>

                                <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
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

                                    <div class="mt-1.5 sm:mt-0">
                                        <p class="text-gray-500">Bathroom</p>

                                        <p class="font-medium">2 rooms</p>
                                    </div>
                                </div>

                                <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
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

                                    <div class="mt-1.5 sm:mt-0">
                                        <p class="text-gray-500">Bedroom</p>

                                        <p class="font-medium">4 rooms</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default HotelsCrud
