import React from 'react'
import Login from './AuthFiles/Login'
import MainScreen from './AuthFiles/MainScreen'
function Base() {
    return (
        <div style={{ maxWidth: 400, margin: '0 auto', }}>
            <MainScreen />
            {/* <Login /> */}
        </div>
    )
}

export default Base