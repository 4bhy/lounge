import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLinkAction, login } from '../../actions/userActions';
import Loading from '../../components/Loading';
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from '../../components/ErrorMessage';
import './LoginScreen.css'
import { userLoginFail, userLogout } from '../../features/users/userLoginSlice';
import logo from '../../components/Header/lounge-high-resolution.png';


const LoginScreen = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState(null)


    const submitHandler = async (e) => {

        e.preventDefault();
        if (!email || !password) {
            toast.error("All fields are mandatory!")
        } else {
            dispatch(login(email, password));
        }

    }

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, loading, error } = userLogin;
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }

    }, [userInfo])

    const forgotHandler = async () => {
        await dispatch(getLinkAction(email))
    }

    if (error) {
        toast.error("Email or Password doesn't match!")
        dispatch(userLogout())
    }

    return (
        <div>
            <div><Toaster /></div>
            <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 backdrop-blur-2xl">
                <div class="mx-auto max-w-lg">
                    <div class="justify-items-center flex justify-center">
                        <img src={logo} alt="Logo" class="h-8 justify-center" />
                    </div>

                    <form action="" onSubmit={submitHandler} class="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
                        <p class="text-lg font-medium">Sign in to your account</p>

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
                                {
                                    loading && <Loading />
                                }



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

                        <div>
                            <label for="password" class="text-sm font-medium">Password</label>

                            <div class="relative mt-1">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter password"
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
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            onSubmit={submitHandler}
                            class="block w-full rounded-lg bg-emerald-500 px-5 py-3 text-sm font-medium text-white"
                        >
                            Sign in
                        </button>

                        <p class="text-center text-sm text-gray-500">

                            <button onClick={() => { forgotHandler() }} class="underline" href="">Forgot Passoword</button>
                        </p>
                    </form>
                    <p class="text-center text-sm text-gray-500">
                        No account?
                        <Link to="/register">
                            <a class="underline" href="">Sign up</a></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen