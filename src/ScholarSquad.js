import {ApplicationViews} from './components/views/ApplicationViews';
import { useState } from 'react'

export const ScholarSquad = () => {
  const [token, setTokenState] = useState(localStorage.getItem('scholarSquad_token'))

  const setToken = (newToken) => {
    localStorage.setItem('scholarSquad_token', newToken)
    setTokenState(newToken)
  }
  return <>
    <ApplicationViews token={token} setToken={setToken} />
  </>
}

