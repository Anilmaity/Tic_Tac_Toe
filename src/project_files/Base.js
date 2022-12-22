import React from 'react'
import Login from './AuthFiles/Login'
import MainScreen from './AuthFiles/MainScreen'
import { Routes, Route } from "react-router-dom"
import GameScreen from "./Game/GameScreen";
import Invite from "./Game/Invite";
import Game from "./Game/Game";
import Register from './AuthFiles/Register'
function Base() {
    return (
        <div style={{ maxWidth: 400, margin: '0 auto', height: '100%' }}>
            <Routes>
                <Route path='/' element={<MainScreen />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />

                <Route path='GameScreen' element={<GameScreen />} />
                <Route path='Invite' element={<Invite />} />
                <Route path='Game/:gameid' element={<Game />} />


            </Routes>
        </div>
    )
}

export default Base
