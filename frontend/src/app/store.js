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
import listApprovalsReducer from "../features/admin/listApprovalsSlice";
import bookingsReducer from "../features/users/bookingsSlice";
import messageSlice from "../features/users/messageSlice";
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
        listApprovals: listApprovalsReducer,
        individualProperty: individualPropertyReducer,
        bookings: bookingsReducer,
        messageSlice:messageSlice
    }
})

export default store;