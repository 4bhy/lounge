import React, { useEffect, useState } from 'react'
import StripeContainer from '../../components/Stripe/StripeContainer'
import './CheckoutPayment.css'
import { useLocation } from 'react-router-dom'

const CheckoutPayment = () => {

    const { state } = useLocation()
    console.log("00000");
    console.log(state.userInfo);
    const [cin, setCin] = useState()
    const [cout, SetCout] = useState()

    return (
        <div>
            <div class="p-16 min-w-screen min-h-screen bg-gray-50 py-5">
                <div class="px-5">
                    <div class="mb-2">
                        <a href="#" class="focus:outline-none hover:underline text-gray-500 text-sm"><i class="mdi mdi-arrow-left text-gray-400"></i>Back</a>
                    </div>
                    <div class="mb-2">
                        <h1 class="text-3xl md:text-5xl font-bold text-gray-600">REQUEST TO BOOK</h1>
                    </div>
                    <div class="mb-5 text-gray-400">
                        <a href="#" class="focus:outline-none hover:underline text-gray-500"></a><a href="#" class="focus:outline-none hover:underline text-gray-500">Cart</a> / <span class="text-gray-600">Checkout</span>
                    </div>
                </div>
                <div class="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
                    <div class="w-full">
                        <div class="-mx-3 md:flex items-start">
                            <div class="px-3 md:w-7/12 lg:pr-10">
                                <div class="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                    <div class="w-full flex items-center">
                                        <div class="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                            <img src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="" />
                                        </div>
                                        <div class="flex-grow pl-3">
                                            <h6 class="font-semibold uppercase text-gray-600">{state.propertyData.pname}</h6>
                                            <p class="text-gray-400">x 1</p>
                                        </div>
                                        <div>
                                            <span class="font-semibold text-gray-600 text-xl">{state.propertyData.price}</span><span class="font-semibold text-gray-600 text-sm">.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-6 pb-6 border-b border-gray-200">
                                    <div class="-mx-2 flex items-end justify-end">
                                        <div class="flex-grow px-2 lg:max-w-xs">
                                            <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">Discount code</label>
                                            <div>
                                                <input class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="XXXXXX" type="text" />
                                            </div>
                                        </div>
                                        <div class="px-2">
                                            <button class="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">APPLY</button>
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
                                            <span class="font-semibold">{state.totalPrice}</span>
                                        </div>
                                    </div>
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
                                            <span class="font-semibold text-gray-400 text-sm">INR</span> <span class="font-semibold">{state.totalPrice+1459.09}</span>
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
                                                {/* <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">Card number</label>
                                                        <div>
                                                            <input class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text" />
                                                        </div> */}
                                                <StripeContainer state={state} />
                                            </div>

                                        </div>
                                    </div>
                                    {/* <div class="w-full p-3">
                                            <label for="type2" class="flex items-center cursor-pointer">
                                                <input type="radio" class="form-radio h-5 w-5 text-indigo-500" name="type" id="type2"/>
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" width="80" class="ml-3" />
                                            </label>
                                        </div> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPayment