import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { handleHosts, viewProperty } from '../../actions/adminActions'
import { listHosts } from '../../actions/adminActions'
import { useDispatch } from 'react-redux'

const HostDetails = () => {

    const dispatch = useDispatch()

    const hostHandler = async (id, status) => {
        console.log(id, status, "11");
        await dispatch(handleHosts(id, !status))
        console.log(viewHostInfo, "00");
    }

    const viewHost = useSelector((state) => state.viewHost)
    const { viewHostInfo } = viewHost
    console.log("viewHostInfoo", viewHostInfo);
    const hostProperty = useSelector((state) => state.hostProperty)

    const { hostPropertyData } = hostProperty


    const propertyHandler = (e) => {
        dispatch(viewProperty(viewHostInfo.host.userId))
    }

    //  useEffect(()=>{
    //     if(viewHostInfo){
    //         console.log("testing..");
    //         dispatch(listHosts())
    //     }
    //  },[viewHostInfo])

    return (
        <div>
            <div class="p-0">
                <div class="p-2 bg-white shadow mt-24">
                    <div class="grid grid-cols-1 md:grid-cols-3">
                        <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                        </div>
                        <div class="relative">

                            <div class="w-24 h-24 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-16 flex items-center justify-center text-indigo-500">

                                <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" viewBox="0 0 20 20" fill="currentColor">

                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
                            </div>
                        </div>
                        <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center"><button onClick={(e) => {
                            e.preventDefault()
                            hostHandler(viewHostInfo.host._id, viewHostInfo.host.blocked)
                        }} class="text-white py-2 px-4 uppercase rounded-lg bg-green-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">{viewHostInfo.host.blocked ? 'UNBLOCK' : 'BLOCK'}</button>
                        </div>
                    </div>
                    <div class="mt-2 text-center pb-4">
                        <h6 class="text-2xl font-medium text-gray-700">{viewHostInfo.host.fname} {viewHostInfo.host.lname} <span class="font-light text-gray-500">27</span></h6>

                        <p class="font-light text-gray-600 mt-2">Bucharest, Romania</p>

                        <p class="mt-8 text-gray-500"> Lorem ipsum dolor</p>
                        <p class="mt-2 text-gray-500"> Lorem ipsum dolor sit amet consectetur, adipisicing elit.!</p>  </div>
                    {/* <div class="mt-12 flex flex-col justify-center">
                        <p class="text-gray-600 text-center font-light lg:px-16">An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
                        <button class="text-indigo-500 py-2 px-4  font-medium mt-4">  Show more</button>
                    </div> */}
                </div>
            </div>


            {/* <div className="py-2 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">

                <div className="mt-10 flex flex-col  xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Your Reservations</p>
                            <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img className="w-full  hidden md:block p-4 rounded-b-sm" src="https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg" alt="dress" />
                                    <img className="w-full  md:hidden p-4" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
                                </div>
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h6 className="text-xl justify-center xl:text-lg sm:ml-3 font-semibold leading-6 text-gray-800">Premium Quaility setCurrentImage</h6>
                                        <div className="flex justify-start md:justify-center sm:ml-3 items-start flex-col space-y-2">
                        x                    <p className="text-sm leading-none text-gray-800">
                                                <span className="text-gray-300 mr-3">Style: </span>Italic Minimal Design
                                            </p>
                                            <p className="text-sm leading-none text-gray-800">
                                                <span className="text-gray-300 mr-3">Size: </span>Single
                                            </p>
                                            <p className="text-sm leading-none text-gray-800">
                                                <span className="text-gray-300 mr-3">Color: </span>Light Blue
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                        <p className="text-base xl:text-lg leading-6 sm:ml-3">
                                            $20.00 <span className="text-red-300 line-through"> $30.00</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
                {viewHostInfo?.hotel?.map((hotel) => (
                    <div class="" onClick={propertyHandler}>
                        <div class="ml-6 relative mx-auto p-4 ">
                            <a href="#" class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                                <div class="shadow p-4 rounded-lg bg-white">
                                    <div class="flex justify-center relative rounded-lg overflow-hidden h-52">
                                        <div class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                                            <div class="absolute inset-0 opacity-3">
                                                <img src={hotel.pic[0]} className="bg-cover" />
                                            </div>
                                        </div>

                                        <div class="absolute flex justify-center bottom-0 mb-3">
                                            <div class="flex bg-white px-4 py-1 space-x-5 rounded-lg overflow-hidden shadow">
                                                <p class="flex items-center font-medium text-gray-800">
                                                    <svg class="w-5 h-5 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480,226.15V80a48,48,0,0,0-48-48H80A48,48,0,0,0,32,80V226.15C13.74,231,0,246.89,0,266.67V472a8,8,0,0,0,8,8H24a8,8,0,0,0,8-8V416H480v56a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V266.67C512,246.89,498.26,231,480,226.15ZM64,192a32,32,0,0,1,32-32H208a32,32,0,0,1,32,32v32H64Zm384,32H272V192a32,32,0,0,1,32-32H416a32,32,0,0,1,32,32ZM80,64H432a16,16,0,0,1,16,16v56.9a63.27,63.27,0,0,0-32-8.9H304a63.9,63.9,0,0,0-48,21.71A63.9,63.9,0,0,0,208,128H96a63.27,63.27,0,0,0-32,8.9V80A16,16,0,0,1,80,64ZM32,384V266.67A10.69,10.69,0,0,1,42.67,256H469.33A10.69,10.69,0,0,1,480,266.67V384Z"></path></svg>
                                                    3 + 1
                                                </p>

                                                <p class="flex items-center font-medium text-gray-800">
                                                    <svg class="w-5 h-5 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512"><path d="M423.18 195.81l-24.94-76.58C387.51 86.29 356.81 64 322.17 64H157.83c-34.64 0-65.34 22.29-76.07 55.22L56.82 195.8C24.02 205.79 0 235.92 0 271.99V400c0 26.47 21.53 48 48 48h16c26.47 0 48-21.53 48-48v-16h256v16c0 26.47 21.53 48 48 48h16c26.47 0 48-21.53 48-48V271.99c0-36.07-24.02-66.2-56.82-76.18zm-310.99-66.67c6.46-19.82 24.8-33.14 45.64-33.14h164.34c20.84 0 39.18 13.32 45.64 33.13l20.47 62.85H91.72l20.47-62.84zM80 400c0 8.83-7.19 16-16 16H48c-8.81 0-16-7.17-16-16v-16h48v16zm368 0c0 8.83-7.19 16-16 16h-16c-8.81 0-16-7.17-16-16v-16h48v16zm0-80.01v32H32v-80c0-26.47 21.53-48 48-48h320c26.47 0 48 21.53 48 48v48zM104.8 248C78.84 248 60 264.8 60 287.95c0 23.15 18.84 39.95 44.8 39.95l10.14.1c39.21 0 45.06-20.1 45.06-32.08 0-24.68-31.1-47.92-55.2-47.92zm10.14 56c-3.51 0-7.02-.1-10.14-.1-12.48 0-20.8-6.38-20.8-15.95S92.32 272 104.8 272s31.2 14.36 31.2 23.93c0 7.17-10.53 8.07-21.06 8.07zm260.26-56c-24.1 0-55.2 23.24-55.2 47.93 0 11.98 5.85 32.08 45.06 32.08l10.14-.1c25.96 0 44.8-16.8 44.8-39.95 0-23.16-18.84-39.96-44.8-39.96zm0 55.9c-3.12 0-6.63.1-10.14.1-10.53 0-21.06-.9-21.06-8.07 0-9.57 18.72-23.93 31.2-23.93s20.8 6.38 20.8 15.95-8.32 15.95-20.8 15.95z"></path></svg>
                                                    2
                                                </p>

                                                <p class="flex items-center font-medium text-gray-800">
                                                    <svg class="w-5 h-5 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504,256H64V61.25a29.26,29.26,0,0,1,49.94-20.69L139.18,65.8A71.49,71.49,0,0,0,128,104c0,20.3,8.8,38.21,22.34,51.26L138.58,167a8,8,0,0,0,0,11.31l11.31,11.32a8,8,0,0,0,11.32,0L285.66,65.21a8,8,0,0,0,0-11.32L274.34,42.58a8,8,0,0,0-11.31,0L251.26,54.34C238.21,40.8,220.3,32,200,32a71.44,71.44,0,0,0-38.2,11.18L136.56,18A61.24,61.24,0,0,0,32,61.25V256H8a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H32v96c0,41.74,26.8,76.9,64,90.12V504a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V480H384v24a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V474.12c37.2-13.22,64-48.38,64-90.12V288h24a8,8,0,0,0,8-8V264A8,8,0,0,0,504,256ZM228.71,76.9,172.9,132.71A38.67,38.67,0,0,1,160,104a40,40,0,0,1,40-40A38.67,38.67,0,0,1,228.71,76.9ZM448,384a64.07,64.07,0,0,1-64,64H128a64.07,64.07,0,0,1-64-64V288H448Z"></path></svg>
                                                    3
                                                </p>
                                            </div>
                                        </div>
                                        <button><span class="absolute top-0 right-0 inline-flex mt-3 ml-3 mr-3 px-3 py-2 rounded-3xl z-10 bg-blue-500 hover:bg-blue-400 text-sm font-medium text-white select-none">
                                            X
                                        </span></button>
                                    </div>

                                    <div class="mt-4">
                                        <h2 class="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title="New York">
                                            {hotel.pname}
                                        </h2>
                                        <p class="mt-2 text-sm text-gray-800 line-clamp-1" title="New York, NY 10004, United States">
                                            {hotel.pstate}  {hotel.city}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>

    )
}

export default HostDetails
