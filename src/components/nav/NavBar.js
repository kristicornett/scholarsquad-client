import { useRef, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const NavBar = ({ token, setToken }) => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const navbar = useRef()
    const ham = useRef()

    
    useEffect(() => {
      const tokenUser = JSON.parse(localStorage.getItem('scholarSquad_user'))
      if(tokenUser) setUser(tokenUser);
    },[])

    const showMobileNavbar = () => {
        ham.current.classList.toggle('is-active')
        navbar.current.classList.toggle('is-active')
    }

    const renderUserNavSelections = () => {
      if (user.id) {
        if (user.isStaff){
            return (
            <>
                <Link to="/profile" className="navbar-item">
                  My Profile
                </Link>
                <Link to="/classes" className="navbar-item">
                  My Classes
                </Link>
                <Link to="/quiz" className="navbar-item">
                  My Quizzes
                </Link>
                <Link to="/students" className="navbar-item">
                  My Students
                </Link>
                <Link to="/messages" className="navbar-item">
                  My Messages
                </Link>
                <Link to="schools/:schoolId" className="navbar-item">
                  My School
                </Link>
              
              </>)
        }
        else{  //is not staff, is student
          return (
            <>
                <Link to="/profile" className="navbar-item">
                  My Profile
                </Link>
                <Link to="/teachers" className="navbar-item">
                  Teachers
                </Link>
                <Link to="/quiz" className="navbar-item">
                  My Quizzes
                </Link>
                <Link to="/messages" className="navbar-item">
                  My Messages
                </Link>
                <Link to="schools/:schoolId" className="navbar-item">
                  My School
                </Link>
              
              </>)
        }
      } else {
        return (
          <>
          </>
        )
      }

    }

    return (
        <nav
      className="navbar is-success mb-3"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
         
          <h1 className="title is-4">Scholar Squad</h1>
        </a>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={showMobileNavbar}
          ref={ham}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {token ? (
            renderUserNavSelections()
          ) : (
            ""
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {token ? (
                <button
                  className="button is-outlined"
                  onClick={() => {
                    setToken("");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/register" className="button is-link">
                    Register
                  </Link>
                  <Link to="/login" className="button is-outlined">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
    