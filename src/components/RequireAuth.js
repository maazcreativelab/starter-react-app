import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth =({allowedRoles})=>{

    const {auth} = useAuth()
    const location = useLocation()
    // console.log("location=>",location)
    // console.log("auth=>",auth)
    console.log(auth.roles)
    console.log(allowedRoles)
    return(
        auth?.roles==allowedRoles
            ? <Outlet/>
            :<Navigate to="/login" state={{from:location}} replace />
    );
 

}

export default RequireAuth;