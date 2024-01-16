import { isAuthenticated } from "../helper/index";
import { Outlet, Navigate } from 'react-router-dom'

const AdminRoute = () => {
    return(
        isAuthenticated() ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default AdminRoute
