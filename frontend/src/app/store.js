import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userLoginReducer from "../features/users/userLoginSlice";
import userRegisterReducer from "../features/users/userRegisterSlice";
import hostRegisterReducer from "../features/host/hostRegisterSlice";
import listUsersSliceReducer from "../features/admin/listUsersSlice";
import listHostsReducer from "../features/admin/listHostsSlice";
import thunk from "redux-thunk";
import handleUsersReducer from "../features/admin/handleUsersSlice";
import handleHostsReducer from "../features/admin/handleHostsSlice";
import pageOneReducer from "../features/host/pageOneSlice";
import pageTwoReducer from "../features/host/pageTwoSlice";
import pageThreeReducer from "../features/host/pageThreeSlice";
import listHotelsReducer from "../features/admin/listHotelsSlice";
import viewHostsReducer from "../features/admin/viewHostsSlice";
import hostPropertyReducer from "../features/admin/hostPropertySlice";
import individualPropertyReducer from "../features/users/individualPropertySlice";

const store = configureStore({
    reducer: {
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        hostRegister: hostRegisterReducer,
        listUsers: listUsersSliceReducer,
        listHosts: listHostsReducer,
        handleUsers: handleUsersReducer,
        handleHosts: handleHostsReducer,
        pageOne: pageOneReducer,
        pageTwo: pageTwoReducer,
        pageThree: pageThreeReducer,
        listHotels: listHotelsReducer,
        viewHost: viewHostsReducer,
        hostProperty: hostPropertyReducer,
        individualProperty: individualPropertyReducer
    }
})

export default store;