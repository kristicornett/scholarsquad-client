import {ApplicationViews} from './components/views/ApplicationViews';
import { useState } from 'react'

export const ScholarSquad = () => {
  const [token, setTokenState] = useState(localStorage.getItem('scholarSquad_token'))

  const setToken = (newToken, userToken = '') => {
    //adding user token to track pages as user. Teacher vs Student. It prevents lookups by looking at the token.
    localStorage.setItem('scholarSquad_token', newToken)
    localStorage.setItem('scholarSquad_user', userToken)
    setTokenState(newToken)
  }
  return <>
    <ApplicationViews token={token} setToken={setToken} />
  </>
}

