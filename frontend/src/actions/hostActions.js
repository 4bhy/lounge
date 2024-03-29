import axios from 'axios'
import { handleHostFail, handleHostReq, handleHostSuccess } from '../features/admin/handleHostsSlice';
import { hostRegisterReq, hostRegisterFail, hostRegisterSuccess } from '../features/host/hostRegisterSlice';
import { hostStatFail, hostStatReq, hostStatSucsess } from '../features/host/hostStatSlice';
import { listHostPropertyFail, listHostPropertyReq, listHostPropertySuccess } from '../features/host/listHostPropertiesSlice';
import { hostBooking } from '../features/users/bookingsSlice';
import axiosConfig from '../config/axios';
import { addPropertyFail, addPropertyReq, addPropertySuccess } from '../features/host/addPropertySlice';
export const hostRegister = (fname, lname, newid, zip, email, dob, phone, address, apart, cstate, id, idState, url) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json"
      },
    };
    dispatch(hostRegisterReq());

    const { data } = await axiosConfig.post('/host/register', {
      fname, lname, newid, zip, email, dob, phone, address, apart, cstate, id, idState, url
    },
      config
    );
    dispatch(hostRegisterSuccess(data));

    localStorage.setItem("hostInfo", JSON.stringify(data));

  } catch (error) {
    console.log("error:", error);
    const errorIs = error.response && error.response.data.message ?
      error.response.data.message : error.message;
    dispatch(hostRegisterFail(errorIs));
  }
}

export const addPropertyAction = (pname, pstate, city, pin, description, hostID, url, type, value, amenities) => async (dispatch) => {
  console.log("kk");
  try {
    console.log("fcvbh");
    dispatch(addPropertyReq())
    const config = {
      headers: {
        "Content-type": "application/json"
      },
    };
    const { data } = await axiosConfig.post('/host/add-property', {
      pname, pstate, city, pin, description, hostID, url, type, value, amenities
    }, config)
    console.log(data, "tf data?");
    dispatch(addPropertySuccess(data))
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(addPropertyFail(errorIs))
  }

}


export const listBookingsHost = (id) => async (dispatch) => {

  try {

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }

    const { data } = await axiosConfig.get(`/host/list-bookings/${id}`, config)

    dispatch(hostBooking(data))

  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }

}

export const handleBooking = (id) => async (dispatch) => {

  try {

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }

    const { data } = await axiosConfig.get(`/host/handle-booking/${id}`, config)


  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }

}

export const approveCancellation = (id) => async (dispatch) => {

  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }

    const { data } = await axiosConfig.patch("/host/approve-cancellation/", { id }, config)


  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }

}

export const listHostProperties = () => async (dispatch, getState) => {
  try {

    dispatch(listHostPropertyReq())
    const {
      userLogin: { userInfo },
    } = getState();

    const id = userInfo.host._id;

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    const { data } = await axiosConfig.get(`/host/list-properties/${id}`, config)

    dispatch(listHostPropertySuccess(data))
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(listHostPropertyFail(errorIs))
  }
}

export const getHostStats = () => async (dispatch, getState) => {
  try {

    dispatch(hostStatReq())

    const {
      userLogin: { userInfo },
    } = getState();

    const id = userInfo.host._id;

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    const { data } = await axiosConfig.get(`/host/get-report/${id}`, config)

    dispatch(hostStatSucsess(data))

  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(hostStatFail(errorIs))
  }
}


