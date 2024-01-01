// import React from "react";
// import { Route } from "react-router-dom";
// import { isAuthenticated } from ".";
// import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const PrivateRoute = ({ element: Component, ...rest }) => {

//   const navigate = useNavigate();

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return isAuthenticated() ? (
//           <Component {...props} />
//         ) : (
//           <navigate
//             to={{
//               pathname: "/signin",
//               state: { from: props.location },
//             }}
//           />
//         );
//       }}
//     />
//   );


//   return (
//     <Route
//       {...rest}
//       element={
//         isAuthenticated() ? (
//           <Component />
//         ) : (
          
//             <navigate to="/signin" />
          
//         )
//       }
//     />
//   );

  
// };

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const isAuth = isAuthenticated();

//   return (
//     <Route
//       {...rest}
//       element={isAuth ? <Element /> : <Navigate to="/signin" />}
//     />
//   );
// };

// const PrivateRoute = ({ children }) => {
//   const authed = isAuthenticated(); // Update this based on your authentication logic

//   return authed ? children : <Navigate to="/signin" />;
// };

// export default PrivateRoute;