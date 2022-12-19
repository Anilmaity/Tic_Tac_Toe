import React from 'react'
import './Login.css'


function Login() {
    return (
        <div style={{ position: 'relative', height: '100vh', }}>
            <div className='authButtonContainer' >
                <div style={{ display: 'block', position: 'relative', padding: 10 }}>

                    <button className='authButtons loginBtn'>Login</button>

                    <button className='authButtons registerBtn'>Register</button>
                </div>
            </div >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                <div style={{ width: '100%', }}>

                    <h1 >async</h1>
                    <h1 className='mainHeading'>tic tac toe</h1>
                </div>
            </div>

        </div >
    )
}

export default Login