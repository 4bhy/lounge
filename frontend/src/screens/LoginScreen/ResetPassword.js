import React, { useState } from 'react'
import Loading from '../../components/Loading'
import logo from '../../components/Header/lounge-high-resolution.png';
import toast, { Toaster } from 'react-hot-toast';
import { getLinkAction } from '../../actions/userActions';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ResetPassword = () => {

    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const forgotHandler = async () => {
        if (!email) {
            toast.error("Please enter your registered email!")
        } else {
            await dispatch(getLinkAction(email)).then((data) => {
                toast.success("A link has been sent to your registered Email")
            }).catch((err) => {
                toast.error("Invalid Email")
            })
        }
    }

    return (
        <div>
            <div><Toaster /></div>
            <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 backdrop-blur-2xl">
                <div class="mx-auto max-w-lg">
                    <Link to="/">
                        <div class="justify-items-center flex justify-center">
                            <img src={logo} alt="Logo" class="h-8 justify-center" />
                        </div></Link>

                    <form action="" class="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
                        <p class="text-lg font-medium">Reset Password</p>

                        <div>
                            <label for="email" class="text-sm font-medium">Email</label>

                            <div class="relative mt-1">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                />

                                <span class="absolute inset-y-0 right-4 inline-flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <button

                            onClick={(e) => {
                                e.preventDefault()
                                forgotHandler()
                            }}
                            class="block w-full rounded-lg bg-emerald-500 px-5 py-3 text-sm font-medium text-white"
                        >
                            Get Link
                        </button>

                        <p class="text-center text-sm text-gray-500">

                            <Link to="/login"> <button class="underline">Go Back</button></Link>
                        </p>
                    </form>
                    <p class="text-center text-sm text-gray-500">
                        No account?
                        <Link to="/register">
                            <a class="underline">Sign up</a></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
