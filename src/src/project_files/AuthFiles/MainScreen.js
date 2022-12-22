import React from 'react'
import './MainScreenStyle.css'
import { Link } from 'react-router-dom'

function MainScreen() {
    return (
        <div style={{ position: 'relative', height: '100vh', }}>
            <div className='authButtonContainer' >
                <div style={{ display: 'block', position: 'relative', padding: 10 }}>

                    <Link to={'login'}>
                        <button className='authButtons loginBtn'>Login</button>
                    </Link>
                    <Link to={'register'}>
                        <button className='authButtons registerBtn'>Register</button>
                    </Link>
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

export default MainScreen
