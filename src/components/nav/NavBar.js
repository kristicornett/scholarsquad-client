import {useRef, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { AdbIcon } from '@mui/material';
import { getUser } from '../../managers/UserManager';
export const NavBar = ({ token, setToken, userToken }) => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const navbar = useRef()
    const ham = useRef()
    const showMobileNavbar = () => {
        ham.current.classList.toggle('is-active')
        navbar.current.classList.toggle('is-active')
    }

    useEffect(() => {
        getUser()
        .then((result) => {
          setUser(result)
        })

    },[])



    const logout = (event) => {
      event.preventDefault()
      setToken("")
      navigate('/login')
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
                <Link to="/my_quiz" className="navbar-item">
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
                <Link className="navbar-item" onClick={logout}>Logout</Link>
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
                <Link to="/my_quizzes" className="navbar-item">
                  My Quizzes
                </Link>
                <Link to="/messages" className="navbar-item">
                  My Messages
                </Link>
                <Link to="/my_schools" className="navbar-item">
                  My School
                </Link>
                <Link className="navbar-item" onClick={logout}>Logout</Link>
              
              </>)
        }
      } else {
        return (
          <>
          </>
        )
      }

    }

    const renderRegisterLogin = () => {
      return (<div className="navbar-end">
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
    </div>)
    }

    return (
      <>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: {md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        LOGO
        
      </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            &nbsp;
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    </>
    //     <nav
    //   className="navbar is-success mb-3"
    //   role="navigation"
    //   aria-label="main navigation"
    // >
    //   <div className="navbar-brand">
    //     <a className="navbar-item" href="/">
         
    //       <h1 className="title is-4">Scholar Squad</h1>
    //     </a>

    //     {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    //     <a
    //       role="button"
    //       className="navbar-burger"
    //       aria-label="menu"
    //       aria-expanded="false"
    //       data-target="navbarBasicExample"
    //       onClick={showMobileNavbar}
    //       ref={ham}
    //     >
    //       <span aria-hidden="true"></span>
    //       <span aria-hidden="true"></span>
    //       <span aria-hidden="true"></span>
    //     </a>
    //   </div>

    //   <div className="navbar-menu" ref={navbar}>
    //     <div className="navbar-start">
    //       {token ? (
    //         renderUserNavSelections()
    //       ) : (
    //         renderRegisterLogin()
    //       )}
    //     </div>

        
    //   </div>
    // </nav>
  );
}
    