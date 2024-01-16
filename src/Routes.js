import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Homev2 from "./core/Homev2";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import PrivateRoute from "./auth/helper/PrivateRoute";
import AdminRoute from "./auth/helper/AdminRoute";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategoriesV2";
import AddTrips from "./admin/AddTrips";
import ManageTrips from "./admin/ManageTrips";
import MyBookingsV2 from './core/components/MyBookingsV2';
import MyCancellations from './core/components/CancellationV2'
import AdminCancellations from "./admin/AdminCancellationsV2";
import RequestSolved from "./core/components/ResolvedQueryV2";
import AdminSolvedReq from "./admin/AdminAllSolvedReqV2";


const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Homev2 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/user/userdashboard" element={<UserDashBoard />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/user/mybookings"  element={<MyBookingsV2 />} />
        </Route>

        
        <Route element={<PrivateRoute />}>
          <Route path="/user/mycancellations"  element={<MyCancellations />} />
        </Route>  

        <Route element={<PrivateRoute />}>
          <Route path="/user/requestsolved"  element={<RequestSolved />} />
        </Route> 

            {/*Admin Routes  */}

        <Route element={<AdminRoute />}>
          <Route path="/admin/admindashboard" element={<AdminDashBoard />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/create/category" element={<AddCategory />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/categories/:categoryId" element={<ManageCategories />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/create/product" element={<AddTrips />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/product/update/:productId" element={<ManageTrips />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/cancellation/update" element={<AdminCancellations />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/cancellation/adminsolved" element={<AdminSolvedReq />} />
        </Route>
      </Routes>

    </Router>
  );
};

export default App;
