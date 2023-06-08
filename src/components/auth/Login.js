import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../managers/AuthManager'

export const Login = ({ setToken }) => {
    const username = useRef()
    const password = useRef()
    const navigate = useNavigate()
    const [isUnsuccessful, setisUnsucessful] = useState(false)

    const handleLogin = (event) => {
        event.preventDefault()

        const user = {
            username: username.current.value,
            password: password.current.value
        }

        loginUser(user)
        .then(response => {
            if ('valid' in response && response.valid) {
                setToken(response.token)
                navigate('/')
            }
            else {
                setisUnsucessful(true)
            }
        })
    }

    return (
        <section>
            <form onSubmit={handleLogin}>
                <h1 className='title'>Scholar Squad</h1>
                <p className='subtitle'>Sign In To Your Account</p>
                <div className='field'>
                    <label className='label'>Username</label>
                    <div>
                        <input className='input' type='text' ref={username} />

                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Password</label>
                    <div>
                        <input className='input' type='password' ref={password} />

                    </div>
                </div>
                <div>
                    <div>
                        <button className="button is-link" type="submit">Submit</button>
                    </div>
                    <div>
                        <Link to='/register' className='button'>Cancel</Link>
                    </div>
                </div>
                {
                    isUnsuccessful ? <p className='help'>Username or password is not valid</p> : ''
                }
            </form>
        </section>
    )

}