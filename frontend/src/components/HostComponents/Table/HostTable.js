import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approveCancellation, handleBooking, listBookingsHost } from '../../../actions/hostActions'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment';

const HostTable = () => {

    const dispatch = useDispatch()
    const [toggle, setToggle] = useState('Pending')
    const [id, setId] = useState('')
    const [open, setOpen] = React.useState(false);

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const bookings = useSelector((state) => state.bookings)
    const { hostBookingData } = bookings

    const clickHandler = async (id) => {

        if (options == "false") {
            setOpen(false)
            await dispatch(handleBooking(id))
            await dispatch(listBookingsHost(userInfo.host._id))
        } else {
            setOpen(false)
            await dispatch(approveCancellation(id))
            await dispatch(listBookingsHost(userInfo.host._id))
        }

    }

    const handleClose = () => {
        setOpen(false);
    };

    const [options, setOptions] = useState("false")
    const handleChange = async (e) => {
        await setOptions(e.target.value)
    };

    useEffect((state) => {
        dispatch(listBookingsHost(userInfo.host._id))
    }, [])

    return (

        <div>
            <div>
                <div class="inline-flex mt-2 xs:mt-0">
                </div>
                <div class="bg-white p-8 rounded-md w-full">
                    <div class=" flex items-center justify-between pb-6">

                        <div>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">Options</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={options}
                                    label="Options"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"false"}>Reservations</MenuItem>
                                    <MenuItem value={"true"}>Cancellations</MenuItem>
                                </Select>
                            </FormControl>

                        </div>
                        <div class="flex items-center justify-between">

                            <button onClick={() => { setToggle("Approved") }} class={toggle == "Approved" ? 'px-5 py-2 text-xs font-medium border text-gray-600 transition-colors duration-200 bg-gray-500 sm:text-sm dark:text-gray-700  hover:text-gray-100' : 'px-5 py-2 text-xs font-medium border text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:text-gray-700  hover:text-gray-500'}>
                                UPCOMING
                            </button>

                            <button onClick={() => { setToggle("Pending") }} class={toggle === "Pending" ? 'px-5 py-2 text-xs font-medium border text-gray-600 transition-colors duration-200 bg-gray-500 sm:text-sm dark:text-gray-700  hover:text-gray-100' : 'px-5 py-2 text-xs font-medium border text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:text-gray-700  hover:text-gray-500'}>
                                EXIPRED
                            </button>
                        </div>
                    </div>

                    <div>
                        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table class="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Property
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Booked By
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Booked At
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Check In
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Check Out
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Amount
                                            </th>
                                         
                                        </tr>
                                    </thead>
                                    {
                                        hostBookingData?.bookingData?.filter(data => data.isCancelled == options).filter(data => data.status === toggle).map((data, i) => (

                                            <tbody>
                                                <tr>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div class="flex items-center">
                                                            <div class="flex-shrink-0 w-10 h-10">
                                                                <img class="w-full h-full rounded-full"
                                                                    src={data.propertyId.pic[0]}
                                                                    alt="" />
                                                            </div>
                                                            <div class="ml-3">
                                                                <p class="text-gray-900 whitespace-no-wrap">
                                                                    {data.propertyId.pname}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{data.userId.name}</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                            {moment(data.createdAt).format("DD/MM/YY")}
                                                        </p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                            {moment(data.checkIn).format("DD/MM/YY")}
                                                        </p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                            {moment(data.checkOut).format("DD/MM/YY")}

                                                        </p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                            ₹ {data.amount}
                                                        </p>
                                                    </td>
                                                    
                                                </tr>

                                            </tbody>
                                        ))
                                    }

                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to approve this reservation?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={() => { clickHandler(id) }} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default HostTable