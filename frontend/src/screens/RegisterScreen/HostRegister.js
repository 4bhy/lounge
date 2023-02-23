import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hostRegister } from '../../actions/hostActions'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { storage_bucket } from '../../firebase-config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const HostRegister = () => {

    const [email, setEmail] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [dob, setDob] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [apart, setApart] = useState('')
    const [cstate, setCstate] = useState('')
    const [zip, setZip] = useState('')
    const [id, setId] = useState('')
    const [idState, setIdState] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch();
    const [userId, setUserId] = useState("")
    const [open, setOpen] = React.useState(false);
    const hostState = useSelector((state) => state.hostRegister);
    const userLogin = useSelector((state) => state.userLogin);
    const [pic, setPic] = useState()
    const { userInfo } = userLogin;
    const [url, setURL] = useState("")
    const { loading, error, hostInfo } = hostState;
    const navigate = useNavigate();
    const [upload, setUpload] = useState(false)
    let fire = null;
    useEffect(() => {
        console.log("url:",url);
        console.log("userId in useEffect:",userId);
    }, [url,userId]);
    // useEffect(() => {
    //     if (hostInfo) {
    //         navigate("/host/dashboard");
    //     }
    // }, [hostInfo]);

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!lname || !fname || !email || !phone) {
            setMessage("All fields are mandatory");
            return;
        } else {
            setMessage(null)
            setUserId(userInfo.user._id)
            console.log("userId:",userId);
            console.log("front-end log",fname, lname, userId, zip, email, dob, phone, address, apart, cstate, id, idState, url);
            await dispatch(hostRegister(fname, lname, userId, zip, email, dob, phone, address, apart, cstate, id, idState, url))
            if (hostInfo) {
                setOpen(true);
            }
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const uploadFile = async (val) => {

        setUpload(true)

        let file = val;

        let fileRef = ref(storage_bucket, "ProfilePics/" + file.name);

        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is " + progress + "% done.");
            if (progress === 100) {
                console.log(file.name);
                getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
                    if (URL) {
                        fire = URL;
                        setURL(URL);
                        setUpload(false)
                      
                    }
                })
            }
        });
    };

    return (
        <div>
            <div class="h-screen grid place-items-center ">
                <div class="w-full md:w-11/12 lg:w-8/12 sm:mx-auto rounded border mt-4 mx-8">
                    <div class="bg-white p-10  shadow-slate-500 shadow-2xl">
                        <h2 class="text-2xl font-bold justify-center justify-items-center text-gray-800 mb-8">Become a Host</h2>
                        <div class="leading-loose">
                            <form onSubmit={submitHandler} class="">
                                <p class="text-gray-800 font-medium">Customer information</p>
                                <div class="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:w-1/2 sm:pr-1">
                                    <input id="first" type="text" name="fname" onChange={(e) => setFname(e.target.value)} value={fname} class="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 
                                         rounded-md focus:ring-0 group focus:outline-0 border text-sm" />
                                    <label for="first" class="absolute left-2 transition-all bg-white px-1 text-green-600 text-xs top-0">
                                        First Name
                                    </label>
                                </div>
                                <div class="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:-mx-1 sm:pl-1 sm:w-1/2">
                                    <input id="last" type="text" name="lname" onChange={(e) => setLname(e.target.value)} value={lname} class="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 
                                        rounded-md focus:ring-0 group focus:outline-0 border text-sm" />
                                    <label for="last" class="absolute left-2 transition-all bg-white px-1 text-green-600 text-xs top-0">
                                        Last Name
                                    </label>
                                </div>
                                <div class="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:w-1/2 sm:pr-1">
                                    <input id="email" onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" class="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 
                                         rounded-md focus:ring-0 group focus:outline-0 border text-sm" />
                                    <label for="email" class="absolute left-2 transition-all bg-white px-1 text-green-600 text-xs top-0">
                                        Email Address
                                    </label>
                                </div>
                                <div class="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:-mx-1 sm:pl-1 sm:w-1/2">
                                    <input id="phone" type="text" onChange={(e) => setPhone(e.target.value)} value={phone} name="phone" class="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 
                                          rounded-md focus:ring-0 group focus:outline-0 border text-sm" />
                                    <label for="phone" class="absolute left-2 transition-all bg-white px-1 text-green-600 text-xs top-0">
                                        Phone Number
                                    </label>
                                </div>
                                <div x-data x-init="flatpickr($refs.datetimewidget, {wrap: true, dateFormat: 'M j, Y'});"
                                    x-ref="datetimewidget"
                                    class="flatpickr relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:w-1/2 sm:pr-1">
                                    <input id="datetime" type="date" onChange={(e) => setDob(e.target.value)} value={dob} name="dob" x-ref="datetime" data-input class="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 
                                          rounded-md focus:ring-0 group focus:outline-0 border text-sm" />
                                    <label for="datetime" class="absolute left-2 transition-all bg-white px-1 text-green-600 text-xs top-0">
                                        Date of Birth
                                    </label>
                                </div>
                                <div class="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:-mx-1 sm:pl-1 sm:w-1/2">
                                    <input id="socialSecurity" type="text" name="socialSecurity" class="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 
                                           rounded-md focus:ring-0 group focus:outline-0 border text-sm" />
                                    <label for="socialSecurity"
                                        class="absolute left-2 transition-all bg-white px-1 text-green-600 text-xs top-0">
                                        Aadhaar
                                    </label>
                                </div>
                                <p class="text-gray-800 font-medium">Address</p>
                                <div class="relative h-10 input-component mb-5 empty mt-2">
                                    <input id="address" onChange={(e) => setAddress(e.target.value)} value={address} type="text" name="address" class="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 
                                              rounded-md focus:ring-0 group focus:outline-0 border text-sm" />
                                    <label for="address" class="absolute left-2 transition-all bg-white px-1 text-green-600 text-xs top-0">
                                        Street Address
                                    </label>
                                </div>
                                <div class="relative h-10 input-component mb-5 empty inline-block mt-2 w-1/4 pr-1">
                                    <input id="apertNumber" onChange={(e) => setApart(e.target.value)} value={apart} type="text" name="apart" class="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 
                                               rounded-md focus:ring-0 group focus:outline-0 border text-sm" />
                                    <label for="apertNumber" class="absolute left-2 transition-all bg-white px-1 text-green-600 text-xs top-0">
                                        Apert Num
                                    </label>
                                </div>
                                <div class="relative h-10 input-component mb-5 empty inline-block mt-2 -mx-1 pl-1 pr-1 w-1/4">
                                    <input id="zip" type="text" onChange={(e) => setZip(e.target.value)} value={zip} name="zip" class="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 
                                                 rounded-md focus:ring-0 group focus:outline-0 border text-sm" />
                                    <label for="zip" class="absolute left-2 transition-all bg-white px-1 text-green-600 text-xs top-0">
                                        ZIP Code
                                    </label>
                                </div>
                                <div class="relative h-10 input-component mb-5 empty inline-block mt-2 -mx-1 pl-1 w-1/2">
                                    <input id="state" onChange={(e) => setCstate(e.target.value)} value={cstate} type="text" name="cstate" class="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500
                                                  focus:border-green-500 rounded-md focus:ring-0 group focus:outline-0 border text-sm" />
                                    <label for="state" class="absolute left-2 transition-all bg-white px-1 text-green-600 text-xs top-0">
                                        State
                                    </label>
                                </div>
                                <p class="text-gray-800 font-medium">Idenfication</p>

                                <div class="relative h-10 input-component mb-5 empty sm:inline-block mt-2 sm:w-1/2 sm:pr-1">
                                    <input id="identitas" onChange={(e) => setId(e.target.value)} value={id} type="text" name="id" class="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 
                                                 rounded-md focus:ring-0 group focus:outline-0 border text-sm" />
                                    <label for="idNumber" class="absolute left-2 transition-all bg-white px-1 text-green-600 text-xs top-0">
                                        ID Number
                                    </label>
                                </div>
                                <div class="relative input-component mb-5 empty sm:inline-block mt-2 flex flex-col">
                                    {/* <input id="idState" onChange={(e) => setIdState(e.target.value)} value={idState} type="file" name="idState" class="h-full w-full border-gray-300 px-2 transition-all hover:border-gray-500 focus:border-green-500 
                                             rounded-md focus:ring-0 group focus:outline-0 border text-sm" /> */}
                                    <form>
                                        {/* <label for="idState" class="absolute  left-2 transition-all bg-white px-1 text-green-600 text-xs top-0">
                                            ID State
                                        </label> */}
                                        <button className='border-solid border-l-zinc-900' onClick={(e) => {
                                            e.preventDefault()
                                            uploadFile(pic)
                                        }}>UPLOAD</button>
                                        <input class="form-control  block  px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="idState" onChange={(e) => setPic(e.target.files[0])} type="file"  accept="image/png, image/gif, image/jpeg" />
                                    </form>
                                </div>
                                <div className='w-auto justify-center flex flex-col items-center'>
                                    <button onSubmit={() => {
                                        submitHandler()
                                    }} class="bg-green-500 hover:bg-green-700 border-green-500 text-white font-bold py-2 px-4 rounded-full">
                                        SUBMIT
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            YOur request has been submitted! You'll be notified after the approval.
                            Meanwhile take a look at the latest listings
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/"><Button onClick={handleClose} autoFocus>
                            Home
                        </Button></Link>
                    </DialogActions>
                </Dialog>
            </div>

            {upload && <div class="flex justify-center items-center">
                <div class="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>}
        </div>

    )
}

export default HostRegister