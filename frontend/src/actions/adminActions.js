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
export const listUsers = () => async (dispatch) => {

    try {
        // const {
        //     userLogin: { userInfo },
        // } = getState();

        // console.log(userInfo);

        const config = {
            headers: {
                "Content-type": "application/json"
            },
        };

        dispatch(listUsersReq());
        const { data } = await axios.get("http://localhost:5000/api/admin/listusers", config)
        dispatch(listUsersSuccess(data));

    } catch (error) {

        const errorIs = error.response && error.response.data.message ?
            error.response.data.message : error.message;
        dispatch(listUsersFail(errorIs));
    }

}

export const listHosts = () => async (dispatch) => {

    try {
        const config = {
            headers: {
                "Content-type": "application/json"
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

export const listHotel = () => async (dispatch) => {

    try {
        const config = {
            headers: {
                "Content-type": "application/json"
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

export const handleUsers = (id, status) => async (dispatch) => {

    try {

        dispatch(handleUserReq())

        const config = {
            headers: {
                "Content-type": "application/json"
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

export const handleHosts = (id, status) => async (dispatch) => {

    try {
      
        dispatch(handleHostReq())

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const sendStatus = {
            blocked: status,
        };

        const { data } = await axios.post(`http://localhost:5000/api/admin/handlehost/${id}`, sendStatus, config)
     

        dispatch(handleHostSuccess(data))

    } catch (error) {
        const message =
            error.response && error.response.data
                ? error.response.data.message
                : error.message;
        dispatch(handleHostFail(message));
    }

}

export const viewProperty = (id) => async (dispatch) => {
    try {


        const config = {
            headers: {
                "Content-type": "application/json"
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

export const viewHosts = (id) => async (dispatch) => {
    try {
   
        const config = {
            headers: {
                "Content-type": "application/json"
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

export const listApprovalsAction = () => async (dispatch) => {
    console.log("testing..");
    try {
        dispatch(listApprovalsReq())

        const config = {
            headers: {
                "Content-type": "application/json"
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

export const handleHotels = (id, status) => async (dispatch) => {

    try {
        dispatch(handleHotelsReq())

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const sendStatus = {
            blocked: status,
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

