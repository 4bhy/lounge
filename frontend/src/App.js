import React from "react";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import LandingScreen from "./screens/LandingScreen/LandingScreen";
import FindMore from "./screens/FindScreen/FindMore";
import DetailsScreen from "./screens/DetailsScreen.js/DetailsScreen";
import CheckoutPage from "./screens/Checkout/Checkout";
import UserDashboard from "./screens/Dashboard/UserDashboard";
import HostLanding from "./screens/LandingScreen/HostLanding";
import HostDashboard from "./screens/Dashboard/HostDashboard";
import HostPropertyList from "./screens/HostPropertyList/HostPropertyList";
import HostReservation from "./screens/HostReservation/HostReservation";

import AdminDashboard from "./screens/Dashboard/AdminDashboard";
import HostRegister from "./screens/RegisterScreen/HostRegister";
import { authentication } from "./firebase-config";
import { useSelector } from "react-redux";
import CheckoutPayment from "./screens/Checkout/CheckoutPayment";
import ErrorScreen from "./screens/ErrorScreen/ErrorScreen";
import IndividualProperty from "./screens/IndividualProperty/IndividualProperty";
import AddPropertyPrimary from "./screens/HostAddProperty/AddPropertyPrimary";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Prompt from "./screens/PromptScreen/Prompt";
import HostDetails from "./screens/DetailsScreen.js/HostDetails";
import ForgotPassword from "./screens/LoginScreen/ForgotPassword";
import ProductPage from "./components/test/ProductPage";
import EditUserProfile from "./screens/Dashboard/EditUserProfile";
import ResetPassword from "./screens/LoginScreen/ResetPassword";


function App() {

  const hostRegister = useSelector((state) => state.hostRegister)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  const { loading, error, hostInfo } = hostRegister;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/reset-password/:id/:token" element={<ForgotPassword />} />
          <Route path="/register" element={userInfo ? <Navigate to="/" /> : <RegisterScreen />} />
          <Route path="/findmore" element={<FindMore />} />
          <Route path="/details/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout-payment" element={<CheckoutPayment />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/user/edit-profile" element={<EditUserProfile/>}/>
          <Route path="/host" element={<HostLanding />}></Route>
          <Route path="/host/dashboard" element={<HostDashboard />} />
          <Route path="/host/reservations" element={<HostReservation />} />
          <Route path="/host/property-list" element={<HostPropertyList />} />
          {/* <Route path="/host/add-property" element={userInfo ? (userInfo.host?hostAccess ? <AddPropertyPrimary /> : <Navigate to="/" />) : <Navigate to="/" />} /> */}
          <Route path="/host/add-property" element={userInfo?(userInfo.host?(userInfo.host.hostAccess?<AddPropertyPrimary />: <Navigate to="/" />):<Navigate to="/" />):<Navigate to="/" />}/>
          <Route path="/admin" element={userInfo ? (userInfo?.user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />) : <Navigate to="/" />} />
          <Route path="/host/view-property" element={<IndividualProperty />} />
          <Route path="/host/register" element={userInfo ? <HostRegister /> : <Prompt />}></Route>
          <Route path="/admin/view-host" element={<HostDetails />} />
          <Route path="/admin/view-property/:id" element={<IndividualProperty />} />
          <Route path="*" element={<ErrorScreen />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
