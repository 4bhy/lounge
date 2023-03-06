import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleApproval, hotelApprovalAction, listApprovalsAction } from '../../../actions/adminActions'

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

const ApprovalDataTable = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listApprovalsAction())
    }, [])

    const submitHandler = (id) => {

        if (age == "hosts") {
            handleClose()
            dispatch(handleApproval(id))
            dispatch(listApprovalsAction())
        } else {
            handleClose()
            dispatch(hotelApprovalAction(id))
            dispatch(listApprovalsAction())

        }

    }

    const listApprovals = useSelector((state) => state.listApprovals)
    const { approvalsData } = listApprovals


    const [id, setId] = useState("")
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
    };
    const [toggle, setToggle] = useState("false")

    const [age, setAge] = useState('hosts');

    const handleChange = (event) => {
        console.log(age, "33");
        setAge(event.target.value);
    };

    return (

        <div>
            <div class="inline-flex mt-2 xs:mt-0">
                <div class="bg-white p-8 rounded-md w-full">
                    <div class=" flex items-center justify-between pb-6">
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">Options</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={age}
                                    label="Options"
                                    onChange={handleChange}>
                                    <MenuItem value={"hosts"}>HOSTS</MenuItem>
                                    <MenuItem value={"hotels"}>HOTELS</MenuItem>
                                </Select>
                            </FormControl>
                            {/* <h2 class="text-gray-600 font-semibold"><Link to="/host/reservations"><button>Reservations</button></Link></h2> */}
                            <span class="text-xs"></span>
                        </div>

                        <div class="flex items-center justify-between">
                            <div class="flex bg-gray-50 items-center p-2 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd" />
                                </svg>
                                <input class="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
                            </div>

                            <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">


                                <button onClick={() => { setToggle("true") }} class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:text-gray-700  hover:text-gray-500">
                                    Monitored
                                </button>

                                <button onClick={() => { setToggle("false") }} class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:text-gray-700 hover:text-gray-500">
                                    Unmonitored
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                {
                                    age === "hosts" ? (
                                        <table class="min-w-full leading-normal">
                                            <thead>

                                                <tr>
                                                    <th
                                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Name
                                                    </th>
                                                    <th
                                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Email
                                                    </th>
                                                    <th
                                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Created AT
                                                    </th>
                                                    <th
                                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        STATUS
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {
                                                    approvalsData?.hosts.filter(data => data.isApproved == toggle).map((data, index) => (
                                                        // console.log(data)
                                                        <tr>
                                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <div class="flex items-center">
                                                                    <form>
                                                                        <div class="flex-shrink-0 w-10 h-10">
                                                                            <button ><img class="w-full h-full rounded-full"
                                                                                src={data.URL}
                                                                                alt="" /></button>
                                                                        </div></form>
                                                                    <div class="ml-3">
                                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                                            {data.fname} {data.lname}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p class="text-gray-900 whitespace-no-wrap">{data.email}</p>
                                                            </td>
                                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p class="text-gray-900 whitespace-no-wrap">
                                                                    {data.createdAt}
                                                                </p>
                                                            </td>
                                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                {
                                                                    toggle == "false" ? (
                                                                        <button type="button" onClick={() => {
                                                                            setId(data._id)
                                                                            handleClickOpen()

                                                                        }} class="inline-block px-6 py-2.5  bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"> APPROVE</button>
                                                                    ) : (
                                                                        <button type="button" onClick={() => {
                                                                            setId(data._id)
                                                                            handleClickOpen()

                                                                        }} class="inline-block px-6 py-2.5  bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"> BLOCK</button>
                                                                    )
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>

                                        </table>

                                    ) : (
                                        <table class="min-w-full leading-normal">
                                            <thead>

                                                <tr>
                                                    <th
                                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Name
                                                    </th>
                                                    <th
                                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Email
                                                    </th>
                                                    <th
                                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Created AT
                                                    </th>
                                                    <th
                                                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        STATUS
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {
                                                    approvalsData?.hotels.filter(data => data.isApproved == "false").map((data, index) => (
                                                        // console.log(data)S
                                                        <tr>
                                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <div class="flex items-center">
                                                                    <form>
                                                                        <div class="flex-shrink-0 w-10 h-10">
                                                                            <button ><img class="w-full h-full rounded-full"
                                                                                src={data.pic[0]}
                                                                                alt="" /></button>
                                                                        </div></form>
                                                                    <div class="ml-3">
                                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                                            {data.pname}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p class="text-gray-900 whitespace-no-wrap">{data.pstate}</p>
                                                            </td>
                                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p class="text-gray-900 whitespace-no-wrap">
                                                                    {data.createdAt}
                                                                </p>
                                                            </td>
                                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                {
                                                                    toggle == "false" ? (
                                                                        <button type="button" onClick={() => {
                                                                            handleClickOpen()
                                                                            setId(data._id)

                                                                        }} class="inline-block px-6 py-2.5  bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"> APPROVE</button>
                                                                    ) : (
                                                                        <button type="button" onClick={() => {
                                                                            handleClickOpen()
                                                                            setId(data._id)

                                                                        }} class="inline-block px-6 py-2.5  bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"> BLOCK</button>
                                                                    )
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    )
                                }

                                <div
                                    class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                                    <span class="text-xs xs:text-sm text-gray-900">
                                        Showing 1 to 4 of 50 Entries
                                    </span>
                                    <div class="inline-flex mt-2 xs:mt-0">
                                        <button
                                            class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                            Prev
                                        </button>
                                        &nbsp; &nbsp;
                                        <button
                                            class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
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
                <DialogTitle id="alert-dialog-title">
                    {"Confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to approve this host?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => { submitHandler(id) }} autoFocus>
                        Approve
                    </Button>
                </DialogActions>
            </Dialog>

        </div>

    )
}

export default ApprovalDataTable