import React, { useEffect, useState } from 'react'
import StripeContainer from '../../components/Stripe/StripeContainer'
import './CheckoutPayment.css'
import { useLocation } from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons } from '../../actions/adminActions';

import toast, { Toaster } from 'react-hot-toast';


const CheckoutPayment = () => {

    const { state } = useLocation()
    const [discountPrice, setDiscountPrice] = useState(state.totalPrice)
    const [checker, setChecker] = useState(false)
    const [currentCoupon, setCurrentCoupon] = useState({
        name: '',
        discount: 0,
        minValue: 0,
        usedBy: [],
        id:""
    })

    const couponId= currentCoupon?  currentCoupon.id : null;

    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = async () => {
        await dispatch(getCoupons())
        console.log(couponsList)
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const couponData = useSelector((state) => state.couponData)

    const { couponsList } = couponData
    const userLogin = useSelector((state) => state.userLogin)

    const { userInfo } = userLogin

    const applyCoupon = () => {
        try {
            if (currentCoupon.usedBy.includes(userInfo._id)) {

                toast.error("Sorry, you've already used this coupon! ")
                
            } else {
                console.log(currentCoupon);
                setOpen(false)
                const newPrice = state.totalPrice - (state.totalPrice * (currentCoupon.discount / 100))
                console.log(state.totalPrice);
                console.log(newPrice);
                console.log(currentCoupon.minValue);
                if (newPrice >= currentCoupon.minValue) {
                    setDiscountPrice(newPrice)
                    setChecker(true)
                    toast.success("Coupon Applied!")
                } else {
                    toast.error("Failed to add Coupon 😓")
                }
            }

        } catch (error) {
        
            toast.error("Something went wrong")
        }

    }

    const removeCoupon = () => {
        setChecker(false)
        toast('Coupon Removed!', {
            icon: '❌',
        });
        setDiscountPrice(state.totalPrice)
    }


    return (
        <div>
            <div><Toaster /></div>
            <div class="p-16 min-w-screen min-h-screen bg-gray-50 py-5">
                <div class="px-5">
                    <div class="mb-2">
                        <a href="#" class="focus:outline-none hover:underline text-gray-500 text-sm"><i class="mdi mdi-arrow-left text-gray-400"></i>Back</a>
                    </div>
                    <div class="mb-2">
                        <h1 class="text-3xl md:text-5xl font-bold text-gray-600">REQUEST TO BOOK</h1>
                    </div>
                    <div class="mb-5 text-gray-400">
                        <a href="#" class="focus:outline-none hover:underline text-gray-500"></a><a href="#" class="focus:outline-none hover:underline text-gray-500"></a>  <span class="text-gray-600">Checkout</span>
                    </div>
                </div>
                <div class="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
                    <div class="w-full">
                        <div class="-mx-3 md:flex items-start">
                            <div class="px-3 md:w-7/12 lg:pr-10">
                                <div class="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                    <div class="w-full flex items-center">
                                        <div class="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                            <img src={state.propertyData.pic[0]} alt="" />
                                        </div>
                                        <div class="flex-grow pl-3">
                                            <h6 class="font-semibold uppercase text-gray-600">{state.propertyData.pname}</h6>
                                            <p class="text-gray-400">{state.propertyData.pstate}</p>
                                        </div>
                                        <div>
                                            <span class="font-semibold text-gray-600 text-xl">INR {state.propertyData.price}</span><span class="font-semibold text-gray-600 text-sm">.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-6 pb-6 border-b border-gray-200">
                                    <div class="-mx-2 flex items-end justify-end">

                                        <div class="px-2">

                                            <button onClick={handleClickOpen} class="text-green-600 font-semibold border-4 border-lime-400 rounded-2xl px-4 text-sm ml-1">Add Coupons</button>

                                        </div>
                                    </div>
                                </div>
                                <div class="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                    <div class="w-full flex mb-3 items-center">
                                        <div class="flex-grow">
                                            <span class="text-gray-600">Check In</span>
                                        </div>
                                        <div class="pl-3">
                                            <span class="font-semibold">{state.checkIn}</span>
                                        </div>
                                    </div>
                                    <div class="w-full flex mb-3 items-center">
                                        <div class="flex-grow">
                                            <span class="text-gray-600">Check Out</span>
                                        </div>
                                        <div class="pl-3">
                                            <span class="font-semibold">{state.checkOut}</span>
                                        </div>
                                    </div>
                                    <div class="w-full flex mb-3 items-center">
                                        <div class="flex-grow">
                                            <span class="text-gray-600">Guests</span>
                                        </div>
                                        <div class="pl-3">
                                            <span class="font-semibold">{state.guests}</span>
                                        </div>
                                    </div>
                                    <div class="w-full flex mb-3 items-center">
                                        <div class="flex-grow">
                                            <span class="text-gray-600">Subtotal</span>
                                        </div>
                                        <div class="pl-3">
                                            <span class="font-semibold">{discountPrice}</span>
                                        </div>
                                    </div>
                                    {
                                        checker && <div class="w-full flex mb-3 items-center">
                                            <div class="flex-grow">
                                                <span class="text-gray-600">Coupon Applied</span>
                                            </div>
                                            <div class="flex">
                                                <span class="font-semibold"> <div class=" pt-1 text-xs sm:flex sm:flex-row-reverse">
                                                    <a className=' ml-2 justify-end'>
                                                      
                                                    </a>
                                                    <div
                                                        class="w-full p-2 font-mono text-lg text-center text-gray-600 border-4 border-lime-500 border-dashed rounded select-all">
                                                        {currentCoupon.name}</div>
                                                </div></span>
                                                <i onClick={removeCoupon} class="fa fa-times-circle text-red-600" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    }

                                    <div class="w-full flex items-center">
                                        <div class="flex-grow">
                                            <span class="text-gray-600">Taxes (GST)</span>
                                        </div>
                                        <div class="pl-3">
                                            <span class="font-semibold">1459.09</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                    <div class="w-full flex items-center">
                                        <div class="flex-grow">
                                            <span class="text-gray-600">Total</span>
                                        </div>
                                        <div class="pl-3">
                                            <span class="font-semibold text-gray-400 text-sm">INR</span> <span class="font-semibold">{discountPrice + 1459.09}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-3 md:w-5/12">
                                <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                                    <div class="w-full flex mb-3 items-center">
                                        <div class="w-32">
                                            <span class="text-gray-600 font-semibold">Contact</span>
                                        </div>
                                        <div class="flex-grow pl-3">
                                            <span>{state.userInfo.name}</span>
                                        </div>
                                    </div>
                                    <div class="w-full flex items-center">
                                        <div class="w-32">
                                            <span class="text-gray-600 font-semibold">Billing Address</span>
                                        </div>
                                        <div class="flex-grow pl-3">
                                            <span>{state.userInfo.phoneNumber}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                                    <div class="w-full p-3 border-b border-gray-200">
                                        <div class="mb-5">
                                            <label for="type1" class="flex items-center cursor-pointer">
                                                {/* <input type="radio" class="form-radio h-5 w-5 text-indigo-500" name="type" id="type1" checked/> */}
                                                <img src="https://paymentsplugin.com/assets/blog-images/stripe-badge-white.png" class="h-36" />
                                            </label>
                                        </div>
                                        <div>
                                            <div class="mb-3">
                                                <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">Name on card</label>
                                                <div>
                                                    <input class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Smith" type="text" />
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                               
                                                <StripeContainer couponId={couponId}  state={state} discountPrice={discountPrice} />
                                            </div>

                                        </div>
                                    </div>
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
            <div>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">
                        {"ADD COUPONS"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {
                                couponsList?.coupons?.map((data, i) => (
                                    <div class="bg-white pl-0 mt-0 mr-auto mb-0 ml-auto">
                                        <div class="pt-0 pr-2 pb-0 pl-2 mt-0 mr-auto mb-0 ml-auto max-w-7xl sm:px-2 ">
                                            <div class="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-4xl sm:px-6 lg:px-8">
                                                <div class="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-2 pr-6 pb-2 pl-6 flow-root rounded-lg sm:py-1">
                                                    <div class="pt--10 pr-0 pb-10 pl-0">
                                                        <div class="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
                                                            <div class="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                                                <div class="flex items-center flex-1 min-w-0">
                                                                    <img
                                                                        src="https://w7.pngwing.com/pngs/423/371/png-transparent-discounts-and-allowances-computer-icons-coupon-sale-miscellaneous-text-logo-thumbnail.png" class="flex-shrink-0 object-cover rounded-full btn- w-10 h-10" />
                                                                    <div class="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                                                                        <p class="text-lg font-bold text-gray-800 truncate">{data.title}</p>
                                                                        <p class="text-gray-600 text-md">{data.couponName}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                                                                    <button onClick={() => {
                                                                        setCurrentCoupon({
                                                                            name: data.couponName,
                                                                            discount: data.discount,
                                                                            minValue: data.minvalue,
                                                                            usedBy: data.usedBy,
                                                                            id:data._id
                                                                        })
                                                                        applyCoupon()
                                                                    }} class="bg-gray-800 px-6 py-1 rounded-full text-lg font-medium text-gray-100 transition-all duration-200 hover:bg-gray-700 ">Apply</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={handleClose} autoFocus>
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default CheckoutPayment