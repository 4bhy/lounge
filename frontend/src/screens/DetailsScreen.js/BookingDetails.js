import moment from 'moment'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Header/Navbar'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { userCancellation } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BookingDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const message = useSelector((state) => state.message)
    const { messageData, error } = message;

    const submitHandler = async (id, stat) => {
        console.log("1");
        if (stat == "Approved") {
            console.log("2");
            setOpens(false)
            setOpen(true)
            return
        } else {
            console.log("3");
            setOpens(false)
            await dispatch(userCancellation(id))

            if (messageData != null) {
                console.log("4");
                setOpenSnackbar(true)
                navigate('/dashboard')
            }
            if (error != null) {
                console.log("5");
                console.log(error, "snackbar");
            }
        }

    }

    const [open, setOpen] = React.useState(false);
    const [opens, setOpens] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
       
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloses = () => {
        setOpens(false);
    };

    const [id, setId] = useState('')
    const [status, setStatus] = useState('')
    const { state } = useLocation()

    return (
        <>
            <Navbar />
            <div className="flex p-4 flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-6">
                    <div className="bg-neutral-50 shadow-md rounded-3xl p-6">
                        <img
                            src={state?.current.propertyId?.pic[0]}
                            alt=""
                            className="w-full h-64 rounded-3xl object-cover"
                        />
                        <h2 className="text-xl font-bold mt-6">{state?.current.propertyId?.pname}</h2>
                        <p className="text-gray-600 mt-2">{state?.current.propertyId?.description}</p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-6">
                    <div className="bg-neutral-50 shadow-md rounded-3xl p-10">
                        <h2 className="text-xl text-gray-500 font-bold mb-4">Reservation Details</h2>
                        <hr className=''></hr>
                        <table className="w-full mt-2">
                            <tbody>
                                <tr>
                                    <td className="font-bold">Check In</td>
                                    <td className="text-right">{moment(state?.current.checkIn).format("DD/MM/YY")}</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Check Out</td>
                                    <td className=" text-right justify-items-end justify-end">
                                        {moment(state?.current.checkOut).format("DD/MM/YY")}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Guests</td>
                                    <td className="text-right">
                                        {state?.current.guests}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Amount</td>
                                    <td className="text-right">
                                        {state?.current.amount}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {
                            state?.current.isCancelled == "true" && state?.current.status == "Pending" ? (<p class="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                
                                <button className="inline-block rounded bg-neutral-50 px-6 pb-2 pt-2.5 text-xs border font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]">REQUESTED CANCELLATION
                                </button>
                            </p>) : state?.current.status == "Cancelled" ? null : (
                                <div className="inline-flex flex-col xl:flex-row xl:items-center justify-center w-full text-gray-800">
                                   
                                    <button style={{ cursor: 'pointer' }} onClick={() => {
                                        setId(state?.current._id)
                                        setOpens(true)
                                        setStatus(state?.current.status)
                                    }} className="inline-block rounded-3xl border mt-2 bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-red-500 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] ">CANCEL
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle>
                    <Alert severity="error">Request Denied</Alert>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Sorry, Bookings cant be cancelled after 48 hours!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{
                         setOpen(false)
                    }}>OK</Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={opens}
                onClose={handleCloses}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to cancel this reservation?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloses}>Disagree</Button>
                    <Button onClick={() => { submitHandler(id, status) }} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>


            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Request Submitted!
                </Alert>
            </Snackbar>
            <Footer />
        </>
    )
}

export default BookingDetails
