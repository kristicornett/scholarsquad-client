import {Navigate, Outlet, useLocation} from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { LeftNav } from "./nav/LeftNav"

export const Authorized = ({token, setToken}) => {
    const location = useLocation()

    if(localStorage.getItem('scholarSquad_user')){
        const userToken = JSON.parse(localStorage.getItem('scholarSquad_user'))
        return <>
                <div className="shell">
                    <div className="shell-top">
                        <div className="shell-lefttop"></div>
                        <div className="shell-navbar">
                            <NavBar token={token} setToken={setToken} userData={userToken}></NavBar>
                        </div>
                    </div>
                    <div className="shell-bottom">
                        <div className="shell-leftnav"><LeftNav userData={userToken} /></div>
                        <div className="shell-body"><Outlet /></div>
                    </div>
                </div>
            </>
        
    }
    else{
        return <Navigate 
        to={`/login/${location.search}`}
        replace
        state={{ location }} />
    }

}