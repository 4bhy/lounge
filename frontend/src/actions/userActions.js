import axios from "axios";


import {
  userLoginFail,
  userLoginReq,
  userLoginSuccess,
} from "../features/users/userLoginSlice";

import {
  userRegisterReq,
  userRegisterSuccess,
  userRegisterFail,
} from "../features/users/userRegisterSlice";


import individualPropertySlice, { individualPropertySuccess, individualPropertyReq, individualPropertyFail } from "../features/users/individualPropertySlice";
import { userBooking } from "../features/users/bookingsSlice";
import { async } from "@firebase/util";
import { messageFail, messageSuccess } from "../features/users/messageSlice";
import { availabilityError, availabilityFail, availabilityReq, availabilitySuccess } from "../features/users/availabilitySlice";


export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userLoginReq());

    const { data } = await axios.post(
      `http://localhost:5000/api/users/login`,
      {
        email,
        password,
      },
      config
    );

    dispatch(userLoginSuccess(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLoginFail(errorIs));
  }
};

// export const logout = () => async (dispatch) => {
//   localStorage.removeItem("userInfo");
//   dispatch(userLogout());
// };

export const register = (name, email, password, phoneNumber) => async (dispatch) => {
  try {

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userRegisterReq());

    const { data } = await axios.post(
      `http://localhost:5000/api/users/`,
      {
        name,
        email,
        password,
        phoneNumber
      },
      config
    );

    // console.log(data);
    dispatch(userRegisterSuccess(data));
    dispatch(userLoginSuccess(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userRegisterFail(errorIs));
  }
};

export const individualProperty = (id) => async (dispatch) => {
  try {

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    dispatch(individualPropertyReq())
    const { data } = await axios.get(`http://localhost:5000/api/users/individual-property/${id}`, config)
    dispatch(individualPropertySuccess(data))


  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(individualPropertyFail(errorIs));
  }
}


export const getLinkAction = (email) => async (dispatch) => {

  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }

    const { data } = await axios.post("http://localhost:5000/api/users/get-link", { email }, config)
    console.log(data);

  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(errorIs);
  }

}

export const resetPassword = (email, password) => async (dispatch) => {

  try {
    dispatch(userLoginReq());

    const config = {
      headers: {
        "Content-type": "application/json",

      }
    }

    const { data } = await axios.post("http://localhost:5000/api/users/reset-password", { email, password }, config)

    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLoginFail(errorIs));

  }

}

export const listBookings = (id) => async (dispatch) => {

  try {
    console.log(id);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }

    const { data } = await axios.get(`http://localhost:5000/api/users/list-bookings/${id}`, config)

    dispatch(userBooking(data))

  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }

}

export const userCancellation = (id) => async (dispatch) => {
  try {

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }

    const { data } = await axios.get(`http://localhost:5000/api/users/cancel-booking/${id}`, config)
    dispatch(messageSuccess(data))

  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(messageFail(errorIs))
  }
}

export const submitReview = (pid, uid, rating, title, review) => async (dispatch, getState) => {
  try {

    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo, "getjnjnltate");

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      }
    }
    const { data } = await axios.post("http://localhost:5000/api/users/submit-review", { pid, uid, rating, title, review }, config)

  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(errorIs);
  }
}


export const editProfile = (name, email, phone, password) => async (dispatch, getState) => {
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
    const id = userInfo.user._id;

    const { data } = await axios.post("http://localhost:5000/api/users/edit-profile", { name, email, phone, password, id }, config)
    if (data) {
      dispatch(userLoginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
    }

  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(errorIs);
  }
}

export const checkAvailabilities = (checkIn, checkOut, id) => async (dispatch) => {
  try {
    dispatch(availabilityReq())
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    const { data } = await axios.post("http://localhost:5000/api/users/check-availability", { checkIn, checkOut, id }, config)
    console.log(data, "oo");
    dispatch(availabilitySuccess(data))
    
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        console.log(errorIs, "At error");

    dispatch(availabilityFail(errorIs))
  }
}


