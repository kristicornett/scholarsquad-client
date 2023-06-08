import logo from './logo.svg';
import './App.css';
import {ApplicationViews} from './components/views/ApplicationViews';
import { useState } from 'react'
import { NavBar } from './components/nav/NavBar';

export const ScholarSquad = () => {
  const [token, setTokenState] = useState(localStorage.getItem('scholarSquad_token'))

  const setToken = (newToken) => {
    localStorage.setItem('scholarSquad_token', newToken)
    setTokenState(newToken)
  }
  return <>
    <NavBar token={token} setToken={setToken} />
    <ApplicationViews token={token} setToken={setToken} />
  </>
}

