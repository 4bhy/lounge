import React, { useState, useEffect } from 'react'
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { register } from '../../actions/userActions';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from '../../firebase-config';

const RegisterScreen = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("")
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;
    const navigate = useNavigate();
    const [OTP, setOTP] = useState("")
    const [button, setButton] = useState(false)
    const [startTimer, setStartTimer] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [resend, setResend] = useState(false)


    const startCountdown = () => {
        setStartTimer(true);
        const intervalId = setInterval(() => {
            setTimeLeft((time) => {
                if (time === 0) {
                    clearInterval(intervalId);
                    setStartTimer(false);
                }
                return time - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!fname || !email || !password || !confirmPassword) {
            setMessage("All fields are mandatory");
            return;
        }
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            setMessage(null);
            dispatch(register(fname, email, password, phoneNumber));
        }
    };

    

    const resetTimer = (e) => {
        e.preventDefault()
        setResend(true)
        setTimeLeft(60);
        startCountdown();

    };

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.

            }
        }, authentication);
    }

    const requestOTP = async (e) => {

        e.preventDefault();
        if (phoneNumber.length >= 10) {
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
                .then(confirmationResult => {
                    window.confirmationResult = confirmationResult;
                    if (window.confirmationResult) {

                        startCountdown()
                    }
                }).catch((error) => {
                    console.log(error);
                })
        }

    }

    const verifyOTP = (e) => {
        let otp = e.target.value;
        if (otp.length === 6) {
            console.log(otp);
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp).then((result) => {
                const user = result.user
                if (user) {
                    setButton(true)
                }
                console.log(user, "33");
            }).catch((error) => {
                console.log(error.message);
            })
        }
    }

    return (
        <div>
            <div class="container mx-auto p-4 bg-white">
                <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
                    <h1 class="text-lg font-bold justify-center justify-items-center">Register</h1>
                    <form onSubmit={submitHandler} class="flex flex-col mt-4">
                        <div className='flex gap-2'>
                            <input
                                type="text"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                name="full-name"
                                class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                                placeholder="Full Name"
                            />
                            <input
                                type="text"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                name="full-name"
                                class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                                placeholder="Last Name"
                            />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                            placeholder="Email address"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                            placeholder="Password"
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            name="repeat-password"
                            class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                            placeholder="Repeat Password"
                        />
                        <div>
                            <form onSubmit={requestOTP}>
                                <div className='flex gap-2'>
                                    <input
                                        type="text"
                                        value={phoneNumber}
                                        // onChange={(e) => setOTP(e.target.value)}
                                        name="phoneNumber"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                                        placeholder="Phone Number" />
                                    {
                                        timeLeft <= 1 || resend ? <button
                                            onClick={() => {
                                                resetTimer()
                                                requestOTP()
                                            }}
                                            class="mt-4 py-3 leading-6 text-base grid-flow-col col-span-10 rounded-md border border-transparent text-white-100  bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex  w-full justify-center items-center font-medium focus:outline-none"
                                        >
                                            Resend OTP
                                        </button> : <button
                                            onClick={requestOTP}
                                            class="mt-4 py-3 leading-6 text-base grid-flow-col col-span-10 rounded-md border border-transparent text-white-100  bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex  w-full justify-center items-center font-medium focus:outline-none"
                                        >
                                            Get OTP
                                        </button>
                                    }


                                </div>
                            </form>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setOTP(OTP)
                                    verifyOTP(e)
                                }}

                                name="otp"
                                class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                                placeholder="OTP" />
                            {startTimer ? <div className='px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm'>
                                {startTimer ? (
                                    <p>Time left: {timeLeft} seconds</p>
                                ) : (
                                    null
                                )}
                            </div> : null}
                        </div>

                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                        {
                            loading && <Loading />
                        }
                        {
                            button ? <button
                                onClick={submitHandler}
                                class="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white-100  bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex  w-full justify-center items-center font-medium focus:outline-none"
                            >
                                Register
                            </button> : <button
                                disabled
                                class="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white-100  bg-blue-300 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex  w-full justify-center items-center font-medium focus:outline-none"
                            >
                                Register
                            </button>
                        }

                        <div class="flex flex-col items-center mt-5">
                            <p class="mt-1 text-xs font-light text-gray-500">
                                Already a member?<Link to="/login"><a class="ml-1 font-medium text-blue-400">Sign in now</a></Link>
                            </p>
                        </div>
                        <div id="recaptcha-container"></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen       