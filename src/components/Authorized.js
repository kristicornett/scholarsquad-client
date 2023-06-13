import {Navigate, Outlet, useLocation} from "react-router-dom"
import { NavBar } from "./nav/NavBar"

export const Authorized = ({token}) => {
    const location = useLocation()

    if(localStorage.getItem('scholarSquad_user')){
        return <><NavBar token={token} /><Outlet /></>
        
    }
    else{
        return <Navigate 
        to={`/login/${location.search}`}
        replace
        state={{ location }} />
    }

}