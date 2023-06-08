import logo from './logo.svg';
import './App.css';
import {ApplicationViews} from './components/views/ApplicationViews';
import { useState } from 'react'
import { NavBar } from './components/nav/NavBar';

export const ScholarSquad = () => {
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'))

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken)
    setTokenState(newToken)
  }
  return <>
    <NavBar token={token} setToken={setToken} />
    <ApplicationViews token={token} setToken={setToken} />
  </>
}

