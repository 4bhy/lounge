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


import { individualPropertySuccess, individualPropertyReq, individualPropertyFail } from "../features/users/individualPropertySlice";
import { userBooking, userBookingFail, userBookingReq } from "../features/users/bookingsSlice";
import { messageFail, messageSuccess } from "../features/users/messageSlice";
import { availabilityError, availabilityFail, availabilityReq, availabilitySuccess } from "../features/users/availabilitySlice";
import { searchFail, searchReq, searchSuccess } from "../features/users/searchSlice";
import axiosConfig from "../config/axios";

export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userLoginReq());

    const { data } = await axiosConfig.post(
      `/users/login`,
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


export const register = (name, email, password, phoneNumber) => async (dispatch) => {
  try {

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userRegisterReq());

    const { data } = await axiosConfig.post(
      `/users/`,
      {
        name,
        email,
        password,
        phoneNumber
      },
      config
    );


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

    dispatch(individualPropertyReq())
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    const { data } = await axiosConfig.get(`/users/individual-property/${id}`, config)
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

    const { data } = await axiosConfig.post("/users/get-link", { email }, config)


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

    const { data } = await axiosConfig.post("/users/reset-password", { email, password }, config)

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
    dispatch(userBookingReq())
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }

    const { data } = await axiosConfig.get(`/users/list-bookings/${id}`, config)

    dispatch(userBooking(data))

  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userBookingFail(errorIs))

  }

}

export const userCancellation = (id) => async (dispatch) => {
  try {

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }

    const { data } = await axiosConfig.get(`/users/cancel-booking/${id}`, config)
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


    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      }
    }
    const { data } = await axiosConfig.post("/users/submit-review", { pid, uid, rating, title, review }, config)

  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(errorIs);
    messageFail(errorIs)
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

    const { data } = await axiosConfig.post("/users/edit-profile", { name, email, phone, password, id }, config)
    if (data) {
      dispatch(userLoginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));

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
    const { data } = await axiosConfig.post("/users/check-availability", { checkIn, checkOut, id }, config)

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

export const searchBar = (location, checkIn, checkOut, guests) => async (dispatch) => {
  try {
    dispatch(searchReq())
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    const { data } = await axiosConfig.post("/users/search-bar", { location, checkIn, checkOut, guests }, config)

    dispatch(searchSuccess(data))
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(searchFail(errorIs))
  }
}


