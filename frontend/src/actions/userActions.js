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
// import {
//   userUpdateReq,
//   userUpdateSuccess,
//   userUpdateFail,
// } from "../features/users/userUpdateSlice";

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

// export const updateProfile = (user) => async (dispatch, getState) => {
//   try {
//     dispatch(userUpdateReq());

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.post(`${URL}/api/users/profile`, user, config);

//     dispatch(userUpdateSuccess(data));

//     dispatch(userLoginSuccess(data));

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     const errorIs =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch(userUpdateFail(errorIs));
//   }
// };
