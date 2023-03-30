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
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const messageSlice = useSelector((state) => state.messageSlice)
    const { messageData, error } = messageSlice;

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
        setOpenSnackbar(false);
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
                        <h2 className="text-xl font-bold mb-4">Reservation Details</h2>
                        <table className="w-full">
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
                                <svg className="inline-block w-5 h-5 xl:w-4 xl:h-4 mr-3 fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M532.01 386.17C559.48 359.05 576 325.04 576 288c0-80.02-76.45-146.13-176.18-157.94 0 .01.01.02.01.03C368.37 72.47 294.34 32 208 32 93.12 32 0 103.63 0 192c0 37.04 16.52 71.05 43.99 98.17-15.3 30.74-37.34 54.53-37.7 54.89-6.31 6.69-8.05 16.53-4.42 24.99A23.085 23.085 0 0 0 23.06 384c53.54 0 96.67-20.24 125.17-38.78 9.08 2.09 18.45 3.68 28 4.82C207.74 407.59 281.73 448 368 448c20.79 0 40.83-2.41 59.77-6.78C456.27 459.76 499.4 480 552.94 480c9.22 0 17.55-5.5 21.18-13.96 3.64-8.46 1.89-18.3-4.42-24.99-.35-.36-22.39-24.14-37.69-54.88zm-376.59-72.13l-13.24-3.05-11.39 7.41c-20.07 13.06-50.49 28.25-87.68 32.47 8.77-11.3 20.17-27.61 29.54-46.44l10.32-20.75-16.49-16.28C50.75 251.87 32 226.19 32 192c0-70.58 78.95-128 176-128s176 57.42 176 128-78.95 128-176 128c-17.73 0-35.42-2.01-52.58-5.96zm289.8 100.35l-11.39-7.41-13.24 3.05A234.318 234.318 0 0 1 368 416c-65.14 0-122-25.94-152.43-64.29C326.91 348.62 416 278.4 416 192c0-9.45-1.27-18.66-3.32-27.66C488.12 178.78 544 228.67 544 288c0 34.19-18.75 59.87-34.47 75.39l-16.49 16.28 10.32 20.75c9.38 18.86 20.81 35.19 29.53 46.44-37.19-4.22-67.6-19.41-87.67-32.47zM233.38 182.91l-41.56-12.47c-4.22-1.27-7.19-5.62-7.19-10.58 0-6.03 4.34-10.94 9.66-10.94h25.94c3.9 0 7.65 1.08 10.96 3.1 3.17 1.93 7.31 1.15 10-1.4l11.44-10.87c3.53-3.36 3.38-9.22-.54-12.11-8.18-6.03-17.97-9.58-28.08-10.32V104c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v13.4c-21.85 1.29-39.38 19.62-39.38 42.46 0 18.98 12.34 35.94 30 41.23l41.56 12.47c4.22 1.27 7.19 5.62 7.19 10.58 0 6.03-4.34 10.94-9.66 10.94h-25.94c-3.9 0-7.65-1.08-10.96-3.1-3.17-1.94-7.31-1.15-10 1.4l-11.44 10.87c-3.53 3.36-3.38 9.22.54 12.11 8.18 6.03 17.97 9.58 28.08 10.32V280c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-13.4c21.85-1.29 39.38-19.62 39.38-42.46 0-18.98-12.35-35.94-30-41.23z"></path></svg>
                                <span className="mt-2 xl:mt-0 text-red-900 rounded-3xl text-sm ">REQUESTED CANCELLATION
                                </span>
                            </p>) : state?.current.status == "Cancelled" ? null : (
                                <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                                    <svg className="inline-block w-5 h-5 xl:w-4 xl:h-4 mr-3 fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M532.01 386.17C559.48 359.05 576 325.04 576 288c0-80.02-76.45-146.13-176.18-157.94 0 .01.01.02.01.03C368.37 72.47 294.34 32 208 32 93.12 32 0 103.63 0 192c0 37.04 16.52 71.05 43.99 98.17-15.3 30.74-37.34 54.53-37.7 54.89-6.31 6.69-8.05 16.53-4.42 24.99A23.085 23.085 0 0 0 23.06 384c53.54 0 96.67-20.24 125.17-38.78 9.08 2.09 18.45 3.68 28 4.82C207.74 407.59 281.73 448 368 448c20.79 0 40.83-2.41 59.77-6.78C456.27 459.76 499.4 480 552.94 480c9.22 0 17.55-5.5 21.18-13.96 3.64-8.46 1.89-18.3-4.42-24.99-.35-.36-22.39-24.14-37.69-54.88zm-376.59-72.13l-13.24-3.05-11.39 7.41c-20.07 13.06-50.49 28.25-87.68 32.47 8.77-11.3 20.17-27.61 29.54-46.44l10.32-20.75-16.49-16.28C50.75 251.87 32 226.19 32 192c0-70.58 78.95-128 176-128s176 57.42 176 128-78.95 128-176 128c-17.73 0-35.42-2.01-52.58-5.96zm289.8 100.35l-11.39-7.41-13.24 3.05A234.318 234.318 0 0 1 368 416c-65.14 0-122-25.94-152.43-64.29C326.91 348.62 416 278.4 416 192c0-9.45-1.27-18.66-3.32-27.66C488.12 178.78 544 228.67 544 288c0 34.19-18.75 59.87-34.47 75.39l-16.49 16.28 10.32 20.75c9.38 18.86 20.81 35.19 29.53 46.44-37.19-4.22-67.6-19.41-87.67-32.47zM233.38 182.91l-41.56-12.47c-4.22-1.27-7.19-5.62-7.19-10.58 0-6.03 4.34-10.94 9.66-10.94h25.94c3.9 0 7.65 1.08 10.96 3.1 3.17 1.93 7.31 1.15 10-1.4l11.44-10.87c3.53-3.36 3.38-9.22-.54-12.11-8.18-6.03-17.97-9.58-28.08-10.32V104c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v13.4c-21.85 1.29-39.38 19.62-39.38 42.46 0 18.98 12.34 35.94 30 41.23l41.56 12.47c4.22 1.27 7.19 5.62 7.19 10.58 0 6.03-4.34 10.94-9.66 10.94h-25.94c-3.9 0-7.65-1.08-10.96-3.1-3.17-1.94-7.31-1.15-10 1.4l-11.44 10.87c-3.53 3.36-3.38 9.22.54 12.11 8.18 6.03 17.97 9.58 28.08 10.32V280c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-13.4c21.85-1.29 39.38-19.62 39.38-42.46 0-18.98-12.35-35.94-30-41.23z"></path></svg>
                                    <span style={{ cursor: 'pointer' }} onClick={() => {
                                        setId(state?.current._id)
                                        setOpens(true)
                                        setStatus(state?.current.status)
                                    }} className="mt-2 xl:mt-0 text-teal-500  text-sm rounded-3xl  ">CANCEL
                                    </span>
                                </p>
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
                        Sorry, Bookings cant be cancelled after approval!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSnackbar}>OK</Button>
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