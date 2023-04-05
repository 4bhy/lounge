import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axiosConfig from '../../config/axios';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#0497c9",
            color: "#333",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" },
        },
        invalid: {
            iconColor: "#FF0000",
            color: "#FF0000",
        },
    },
};


const PaymentForm = ({state, discountPrice, couponId}) => {

    const stripe = useStripe()
    const elements = useElements()
    const userInfo = state.userInfo;
    const propertyData = state.propertyData;
    const checkIn = state.checkIn;
    const checkOut = state.checkOut;
    const guests = state.guests;
    const totalPrice = state.totalPrice;
    const discount= discountPrice

    const handleSubmit = async (e) => {
        setRedirector(false)
        setOpens(true)
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axiosConfig.post("/users/payment", {
                    amount: discount,
                    id,
                    userInfo,
                    propertyData,
                    checkIn,
                    checkOut,
                    guests,
                    couponId
                })

                if (response.data.success) {
                    console.log("Successful payment")
                    setOpens(false);
                    setOpen(true);
                    setRedirector(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }

    const [open, setOpen] = React.useState(false);
    const [opens, setOpens] = React.useState(false);
    const [redirector, setRedirector] = useState(false)
    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                    <div className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors">
                        <CardElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <div className='mt-6'>
                    <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"><i class="mdi mdi-lock-outline mr-1"></i> PAY NOW</button>
                </div>
            </form>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description" >
                <DialogContent>
                    <DialogTitle>
                        <Alert severity="success">Payment Successful!</Alert>
                    </DialogTitle>
                    <DialogContentText id="alert-dialog-slide-description">
                        Your reservation won’t be confirmed until the host accepts your request (within 24 hours).
                        You won’t be charged until then.
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Link to="/"><Button>HOME</Button></Link>
                </DialogActions>
            </Dialog>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={opens}
                onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default PaymentForm