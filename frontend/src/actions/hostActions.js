import axios from 'axios'
import { handleHostFail, handleHostReq, handleHostSuccess } from '../features/admin/handleHostsSlice';
import { hostRegisterReq, hostRegisterFail, hostRegisterSuccess } from '../features/host/hostRegisterSlice';
import { hostBooking } from '../features/users/bookingsSlice';

export const hostRegister = (fname, lname, newid, zip, email, dob, phone, address, apart, cstate, id, idState, url) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json"
      },
    };
    dispatch(hostRegisterReq());
    console.log("Actions log:", fname, lname, newid, zip, email, dob, phone, address, apart, cstate, id, idState, url);
    const { data } = await axios.post('http://localhost:5000/api/host/register', {
      fname, lname, newid, zip, email, dob, phone, address, apart, cstate, id, idState, url
    },
      config
    );
    dispatch(hostRegisterSuccess(data));
    console.log(data);
    localStorage.setItem("hostInfo", JSON.stringify(data));
  } catch (error) {
    console.log("error:", error);
    const errorIs = error.response && error.response.data.message ?
      error.response.data.message : error.message;
    dispatch(hostRegisterFail(errorIs));
  }
}

export const addProperty = (pname, pstate, city, pin, description, hostID, url, type, value, amenities) => async (dispatch) => {
  try {
    console.log(url, "url66");
    console.log("testting..");
    const config = {
      headers: {
        "Content-type": "application/json"
      },
    };
    const { data } = await axios.post('http://localhost:5000/api/host/add-property', {
      pname, pstate, city, pin, description, hostID, url, type, value, amenities
    }, config)

  } catch (error) {

  }

}


export const listBookingsHost = (id) => async (dispatch) => {

  try {
    console.log(id);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }

    const { data } = await axios.get(`http://localhost:5000/api/host/list-bookings/${id}`, config)
    console.log(data, "actions");
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
    console.log(id);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }

    const { data } = await axios.get(`http://localhost:5000/api/host/handle-booking/${id}`, config)
    console.log(data, "actions");

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

    const { data } = await axios.patch("http://localhost:5000/api/host/approve-cancellation/", { id }, config)
    console.log(data, "actions");

  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }

}



