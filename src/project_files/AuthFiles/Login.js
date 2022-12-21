import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import InputField from './InputField'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false)

    const navigate = useNavigate()

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }


    const handleLogin = (e) => {
        e.preventDefault()
        if (username === 'darshan' && password === '1234') {
            console.log(username, password)
            navigate('/GameScreen')
        }
        else {
            console.log(username, password)
            setShowError(true)
            const errorPopupTimer = setTimeout(() => {
                setShowError(false)
                clearTimeout(errorPopupTimer)
            }, 2000);
            // clearTimeout(errorPopupTimer)
        }
    }
    return (
        <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
            <form onSubmit={handleLogin}>

                <div className='authButtonContainer' >
                    <div style={{ display: 'block', position: 'relative', padding: 10 }}>

                        <button type='submit' className='authButtons loginBtn'>Login</button>

                    </div>
                </div >
                {

                    showError ?
                        <div className='errorContainer' >


                            <p className='errorText'>Enter correct details.</p>


                        </div >
                        : null}
                <div style={{ padding: 10 }}>
                    <Link to={'/'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_3213_273)">
                                <path d="M16.62 2.99006C16.13 2.50006 15.34 2.50006 14.85 2.99006L6.54 11.3001C6.15 11.6901 6.15 12.3201 6.54 12.7101L14.85 21.0201C15.34 21.5101 16.13 21.5101 16.62 21.0201C17.11 20.5301 17.11 19.7401 16.62 19.2501L9.38 12.0001L16.63 4.75006C17.11 4.27006 17.11 3.47006 16.62 2.99006Z" fill="#333333" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3213_273">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Link>

                    <div style={{ marginTop: 20 }}>
                        <h2 className='heading'>Create account</h2>
                        <p className='subHeading'>Please enter your
                            details</p>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <InputField
                            handleInput={handleUsername}
                            titleText='Username'
                            placeholderText='Type your username here'


                        />
                        <InputField
                            handleInput={handlePassword}
                            titleText='Password'
                            placeholderText='Type your password here'
                            isPassword={true}

                        />
                    </div>
                </div>
            </form>

        </div >
    )
}

export default Login