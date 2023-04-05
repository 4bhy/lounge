import axios from 'axios'
import { listHostsReq, listHostsFail, listHostsSuccess } from '../features/admin/listHostsSlice';
import { listUsersReq, listUsersSuccess, listUsersFail } from '../features/admin/listUsersSlice';
import { handleUserReq, handleUserFail, handleUserSuccess } from '../features/admin/handleUsersSlice';
import { handleHostFail, handleHostReq, handleHostSuccess } from '../features/admin/handleHostsSlice';
import { listHotelsFail, listHotelsReq, listHotelsSuccess } from '../features/admin/listHotelsSlice';
import { handleHotelsFail, handleHotelsReq, handleHotelsSuccess } from '../features/admin/handleHotelsSlice';
import { viewHostsFail, viewHostsReq, viewHostsSuccess } from '../features/admin/viewHostsSlice';
import { hostPropertySuccess } from '../features/admin/hostPropertySlice';
import { listApprovalsFail, listApprovalsReq, listApprovalsSuccess } from '../features/admin/listApprovalsSlice';
import { listCoupons } from '../features/admin/couponSlice';
import { addCouponsFail, addCouponsReq, addCouponsSuccess } from '../features/admin/addCouponSlice';
import { getStats } from '../features/admin/statsSlice';
export const listUsers = () => async (dispatch, getState) => {

    try {
        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        dispatch(listUsersReq());
        const { data } = await axios.get("http://localhost:5000/api/admin/listusers", config)
        dispatch(listUsersSuccess(data));

    } catch (error) {

        const errorIs = error.response && error.response.data.message ?
            error.response.data.message : error.message;
        dispatch(listUsersFail(errorIs));
    }

}

export const listHosts = () => async (dispatch, getState) => {

    try {

        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        dispatch(listHostsReq())
        const { data } = await axios.get('http://localhost:5000/api/admin/listhosts', config)

        dispatch(listHostsSuccess(data))

    } catch (error) {

        const errorIs = error.response && error.response.data.message ?
            error.response.data.message : error.message;
        dispatch(listHostsFail(errorIs));
    }

}

export const listHotel = () => async (dispatch, getState) => {

    try {
        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        dispatch(listHotelsReq())

        const { data } = await axios.get('http://localhost:5000/api/admin/listhotels', config)
        dispatch(listHotelsSuccess(data))


    } catch (error) {
        const errorIs = error.response && error.response.data.message ?
            error.response.data.message : error.message;
        dispatch(listHotelsFail(errorIs));
    }

}

export const handleUsers = (id, status) => async (dispatch, getState) => {

    try {

        dispatch(handleUserReq())

        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const sendStatus = {
            blocked: status,
        };

        const { data } = await axios.post(`http://localhost:5000/api/admin/handleuser/${id}`, sendStatus, config)

        dispatch(handleUserSuccess(data))

    } catch (error) {
        const message =
            error.response && error.response.data
                ? error.response.data.message
                : error.message;
        dispatch(handleUserFail(message));
    }

}

export const handleHosts = (id, status) => async (dispatch, getState) => {

    try {

        dispatch(handleHostReq())

        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const sendStatus = {
            blocked: status,
        };

        const { data } = await axios.post(`http://localhost:5000/api/admin/handlehost/${id}`, sendStatus, config)



    } catch (error) {
        const message =
            error.response && error.response.data
                ? error.response.data.message
                : error.message;
        dispatch(handleHostFail(message));
    }

}

export const viewProperty = (id) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        // const id={
        //     hostId:id
        // }

        const { data } = await axios.post("http://localhost:5000/api/admin/view-property", { id }, config)
        dispatch(hostPropertySuccess(data))
    } catch (error) {
        const message =
            error.response && error.response.data
                ? error.response.data.message
                : error.message;
    }
}

export const viewHosts = (id) => async (dispatch, getState) => {
    try {

        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        dispatch(viewHostsReq())

        const { data } = await axios.get(`http://localhost:5000/api/admin/view-hosts/${id}`, config)

        dispatch(viewHostsSuccess(data))

    } catch (error) {
        const message =
            error.response && error.response.data
                ? error.response.data.message
                : error.message;
        dispatch(viewHostsFail(message));
    }
}

export const listApprovalsAction = () => async (dispatch, getState) => {

    try {
        dispatch(listApprovalsReq())

        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get("http://localhost:5000/api/admin/list-approvals", config)

        dispatch(listApprovalsSuccess(data))
    } catch (error) {
        const message =
            error.response && error.response.data
                ? error.response.data.message
                : error.message;
        dispatch(listApprovalsFail(message));
    }
}

export const handleHotels = (id, status) => async (dispatch, getState) => {

    try {
        dispatch(handleHotelsReq())

        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const sendStatus = {
            status: status,
        };

        const { data } = await axios.post(`http://localhost:5000/api/admin/handlehotels/${id}`, sendStatus, config)


        dispatch(handleHotelsSuccess(data))

    } catch (error) {
        const message =
            error.response && error.response.data
                ? error.response.data.message
                : error.message;
        dispatch(handleHotelsFail(message));
    }

}
export const handleApproval = (id) => async (dispatch, getState) => {

    try {

        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post("http://localhost:5000/api/admin/handle-approval/", { id }, config)

    } catch (error) {

        const message =
            error.response && error.response.data
                ? error.response.data.message
                : error.message;
        console.log(message);
    }

}

export const hotelApprovalAction = (id) => async (dispatch, getState) => {

    try {
        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.get(`http://localhost:5000/api/admin/hotel-approval/${id}`, config)

    } catch (error) {

        const message =
            error.response && error.response.data
                ? error.response.data.message
                : error.message;
        console.log(message);
    }

}

export const getCoupons = () => async (dispatch, getState) => {
    try {

        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const timestamp = Date.now(); // get current timestamp
        const { data } = await axios.get(`http://localhost:5000/api/admin/get-coupons?timestamp=${timestamp}`, config)
        console.log("after getting 1");
        console.log(data, "data after log, 1");
        dispatch(listCoupons(data))

    } catch (error) {

        console.log("error on getting coupons");
        const message =
            error.response && error.response.data
                ? error.response.data.message
                : error.message;
        console.log(message);
    }
}

export const addCoupon = (cname, discount, vfrom, vto) => async (dispatch, getState) => {

    try {
        dispatch(addCouponsReq())
        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.post("http://localhost:5000/api/admin/add-coupon/", { cname, discount, vfrom, vto }, config)
        dispatch(addCouponsSuccess(data))

    } catch (error) {
        const message =
            error.response && error.response.data
                ? error.response.data.message
                : error.message;
        console.log(message);
        dispatch((addCouponsFail(message)))

    }
}

export const getStat = () => async (dispatch, getState) => {
    try {
        
        const {
            userLogin: { userInfo },
        } = getState();


        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.get("http://localhost:5000/api/admin/get-stats", config)
        dispatch(getStats(data))

    } catch (error) {
        const message =
            error.response && error.response.data
                ? error.response.data.message
                : error.message;
        console.log(message);
    }
}

