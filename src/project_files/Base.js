import React from 'react'
import Login from './AuthFiles/Login'
import MainScreen from './AuthFiles/MainScreen'
import { Routes, Route } from "react-router-dom"
function Base() {
    return (
        <div style={{ maxWidth: 400, margin: '0 auto', }}>
            <Routes>
                <Route path='/' element={<MainScreen />} />
                <Route path='register' element={<Login />} />

            </Routes>
        </div>
    )
}

export default Base