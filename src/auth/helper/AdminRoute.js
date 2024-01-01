// import React from "react";
// import { Route } from "react-router-dom";
// import { isAdmin } from ".";
// import { useNavigate } from "react-router-dom";

// const AdminRoute = ({ component: Component, ...rest }) => {

//   const navigate = useNavigate();

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return isAdmin() ? (
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
// };

// export default AdminRoute;
