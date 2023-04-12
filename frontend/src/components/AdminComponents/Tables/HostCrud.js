import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { handleHosts, listHosts } from '../../../actions/adminActions'
import { viewHosts } from '../../../actions/adminActions'
import moment from 'moment'
import PingLoading from '../../Loading/PingLoading'

const HostCrud = () => {

    const listHost = useSelector((state) => state.listHosts)
    const { loading, errror, hostsList } = listHost
    const dispatch = useDispatch()

    const hostHandler = async (id, status) => {
        await dispatch(handleHosts(id, !status))
        await dispatch(listHosts())
    }
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(listHosts())
    }, [])


    return (
        <div>
            <div>
                <div class="bg-white p-8 rounded-md w-full">
                    <div class=" flex items-center justify-between pb-6">
                        <div>
                            <h2 class="text-gray-600 font-semibold">Hosts</h2>
                            <span class="text-xs"></span>
                        </div>

                    </div>
                    <div>
                        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table class="min-w-full leading-normal">
                                    <thead>

                                        <tr>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Created AT
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                STATUS
                                            </th>
                                        </tr>
                                    </thead>
                                    {
                                        loading && <div class="z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50"><PingLoading /></div>
                                    }
                                    {
                                        hostsList?.map((hostsList, index) => (
                                            <tbody>
                                                <tr>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div class="flex items-center">
                                                            <form>
                                                                <div class="flex-shrink-0 w-10 h-10">
                                                                    <button onClick={async (e) => {
                                                                        e.preventDefault()
                                                                        console.log(hostsList._id, "hostCruid");
                                                                        await dispatch(viewHosts(hostsList._id))
                                                                        navigate('/admin/view-host')
                                                                    }}><img class="w-full h-full rounded-full"
                                                                        src={hostsList.avatar}
                                                                        alt="" /></button>
                                                                </div></form>
                                                            <div class="ml-3">
                                                                <p class="text-gray-900 whitespace-no-wrap">
                                                                    {hostsList.fname} {hostsList.lname}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{hostsList.email}</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                            {moment(hostsList.createdAt).format("DD/MM/YY")}
                                                        </p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <button type="button" onClick={() => {


                                                            hostHandler(hostsList._id, hostsList.blocked)
                                                        }} class={hostsList.blocked ? 'inline-block px-6 py-2.5  bg-red-300 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-400 hover:shadow-lg focus:bg-red-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-400 active:shadow-lg transition duration-150 ease-in-out' : 'inline-block px-6 py-2.5  bg-green-400 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out'}>{hostsList.blocked ? 'Blocked' : 'Active'}</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))
                                    }
                                </table>
                                <div
                                    class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                    <span class="text-xs xs:text-sm text-gray-900">
                                        Showing 1 to 4 of 50 Entries
                                    </span>
                                    <div class="inline-flex mt-2 xs:mt-0">
                                        <button
                                            class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                            Prev
                                        </button>
                                        &nbsp; &nbsp;
                                        <button
                                            class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostCrud