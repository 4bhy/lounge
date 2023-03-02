import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getLinkAction, login } from '../../actions/userActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import './LoginScreen.css'


const LoginScreen = () => {
    
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState(null)

    const submitHandler = async (e) => {

        e.preventDefault();
        if (!email || !password) {
            setMessage("All fields are mandatory")
        } else {
            setMessage(null)
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

    const forgotHandler=async()=>{
        await dispatch(getLinkAction(email))
    }

    return (
        <div>
            <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 backdrop-blur-2xl">
                <div class="mx-auto max-w-lg">
                    <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                        Get started today
                    </h1>

                    <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt
                        dolores deleniti inventore quaerat mollitia?
                    </p>

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
                                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}


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

                                {
                                    message && <div class="flex items-center slide-top -z-0  bg-blue-500 rounded-xl text-white text-sm font-bold px-2 py-3" role="alert">
                                        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                                        <p>All fields are mandatory!!</p>
                                    </div>
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
                            class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            Sign in
                        </button>

                        <p class="text-center text-sm text-gray-500">
                            No account?
                            <Link to="/register">
                                <a class="underline" href="">Sign up</a></Link>
                        </p>
                    </form>
                        <p class="text-center text-sm text-gray-500">
 
                        <button onClick={()=>{forgotHandler()}} class="underline" href="">Forgot Passoword</button>
                        </p>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen