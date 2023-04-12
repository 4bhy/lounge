import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHostStats } from '../../../actions/hostActions'
import Backdrop from '../../Loading/Backdrop'
import SwingLoad from '../../Loading/SwingLoad'
import PingLoading from '../../Loading/PingLoading'

const HostCardStats = () => {

    const dispatch = useDispatch()
    const { stats, loading, error } = useSelector((state) => state.hostStats)

    useEffect(() => {
        dispatch(getHostStats())
    }, [])

    return (

        <div className='flex flex-wrap justify-center '>
            <div className="mt-4 w-full lg:w-6/12 md:w-3/12 xl:w-3/12 px-5 mb-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-blueGray-400 uppercase font-bold text-xs"> Total Earnings</h5>
                                <span className="font-semibold text-xl text-blueGray-700">INR {stats?.totals?.earnings}</span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
                                    <i className="fas fa-chart-bar"></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">
                            <span className="text-emerald-500 mr-2"><i className="fas fa-arrow-up"></i> 2,99% </span>
                            <span className="whitespace-nowrap"> Since last month </span></p>
                    </div>
                </div>
            </div>
            {
                loading && <div class="z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50"><PingLoading /></div>
            }
            <div className=" mt-4 w-full lg:w-6/12 md:w-3/12 xl:w-3/12 px-5">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">Total Bookings</h5>
                                <span className="font-semibold text-xl text-blueGray-700">4</span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-pink-500">
                                    <i className="fas fa-chart-pie"></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">
                            <span className="text-red-500 mr-2"><i className="fas fa-arrow-down"></i>3.4</span>
                            <span className="whitespace-nowrap"> Since last week </span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostCardStats