import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHostStats } from '../../../actions/hostActions'


const HostCardStats = () => {

    const dispatch = useDispatch()
    const { stats } = useSelector((state) => state.hostStats)

    useEffect(() => {
        dispatch(getHostStats())
    }, [])

    return (
        <div className='flex flex-wrap justify-center '>
            <div class="mt-4 w-full lg:w-6/12 md:w-3/12 xl:w-3/12 px-5 mb-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
                    <div class="flex-auto p-4">
                        <div class="flex flex-wrap">
                            <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 class="text-blueGray-400 uppercase font-bold text-xs"> Total Earnings</h5>
                                <span class="font-semibold text-xl text-blueGray-700">INR {stats?.totals?.earnings}</span>
                            </div>
                            <div class="relative w-auto pl-4 flex-initial">
                                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
                                    <i class="fas fa-chart-bar"></i>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-blueGray-400 mt-4">
                            <span class="text-emerald-500 mr-2"><i class="fas fa-arrow-up"></i> 2,99% </span>
                            <span class="whitespace-nowrap"> Since last month </span></p>
                    </div>
                </div>
            </div>

            <div class=" mt-4 w-full lg:w-6/12 md:w-3/12 xl:w-3/12 px-5">
                <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg">
                    <div class="flex-auto p-4">
                        <div class="flex flex-wrap">
                            <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 class="text-blueGray-400 uppercase font-bold text-xs">Total Bookings</h5>
                                <span class="font-semibold text-xl text-blueGray-700">4</span>
                            </div>
                            <div class="relative w-auto pl-4 flex-initial">
                                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-pink-500">
                                    <i class="fas fa-chart-pie"></i>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-blueGray-400 mt-4">
                            <span class="text-red-500 mr-2"><i class="fas fa-arrow-down"></i>3.4</span>
                            <span class="whitespace-nowrap"> Since last week </span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostCardStats