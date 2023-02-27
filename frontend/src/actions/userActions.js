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
    console.log(data, "111");
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
    console.log("individual property:", data);

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
    console.log("at it");

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
    console.log(data);
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


