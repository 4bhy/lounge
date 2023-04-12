import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, handleUsers } from '../../../actions/adminActions'
import moment from 'moment'
import PingLoading from '../../Loading/PingLoading'

const Table = () => {

    const dispatch = useDispatch()
    const listUser = useSelector((state) => state.listUsers)

    const { loading, usersList, error } = listUser
    const [blocked, setblocked] = useState("")

    const userHandler = async (id, status) => {

        await dispatch(handleUsers(id, !status))
        dispatch(listUsers())
    }

    useEffect(() => {
        dispatch(listUsers())
    }, [])

    return (
        <div>
            <div class="bg-white p-8 rounded-md w-full">
                <div class=" flex items-center justify-between pb-6">
                    <div>
                        <h2 class="text-gray-600 font-semibold">Users</h2>
                        <span class="text-xs"></span>
                    </div>

                </div>
                <div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            {
                                loading && <div class="z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50"><PingLoading /></div>
                            }
                            { usersList &&
                                <table class="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            products
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Created at
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            STATUS
                                        </th>
                                    </tr>
                                </thead>

                                {
                                    usersList?.map((usersList, index) => (
                                        <tbody key={index}>
                                            <tr>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div class="flex items-center">
                                                        <div class="flex-shrink-0 w-10 h-10">
                                                            <img class="w-full h-full rounded-full"
                                                                src="https://img.freepik.com/free-icon/user_318-219673.jpg"
                                                                alt="" />
                                                        </div>
                                                        <div class="ml-3">
                                                            <p class="text-gray-900 whitespace-no-wrap">
                                                                {usersList.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p class="text-gray-900 whitespace-no-wrap">{usersList.email}</p>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {moment(usersList.createdAt).format("DD/MM/YY")}
                                                    </p>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                                                    <button type="button" onClick={() => {

                                                        setblocked(usersList.blocked)
                                                        userHandler(usersList._id, usersList.blocked)
                                                    }} class={usersList.blocked ? 'inline-block px-6 py-2.5  bg-red-300 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-400 hover:shadow-lg focus:bg-red-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-400 active:shadow-lg transition duration-150 ease-in-out' : 'inline-block px-6 py-2.5  bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out'}>{usersList.blocked ? 'Blocked' : 'Active'}</button>

                                                </td>
                                            </tr>

                                        </tbody>
                                    ))}
                            </table>}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
