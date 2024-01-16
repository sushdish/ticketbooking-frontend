import { isAuthenticated } from "../helper/index";
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    return(
        isAuthenticated() ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default PrivateRoute