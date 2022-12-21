import React from 'react'
import Login from './AuthFiles/Login'
import MainScreen from './AuthFiles/MainScreen'
import { Routes, Route } from "react-router-dom"
import Register from './AuthFiles/Register'
function Base() {
    return (
        <div style={{ maxWidth: 400, margin: '0 auto', height: '100%' }}>
            <Routes>
                <Route path='/' element={<MainScreen />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />

            </Routes>
        </div>
    )
}

export default Base