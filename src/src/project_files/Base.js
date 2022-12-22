import React from 'react'
import Login from './AuthFiles/Login'
import MainScreen from './AuthFiles/MainScreen'
import { Routes, Route } from "react-router-dom"
import GameScreen from "./Game/GameScreen";
import Invite from "./Game/Invite";
import Game from "./Game/Game";
function Base() {
    return (
        <div style={{ maxWidth: 400, margin: '0 auto', }}>
            <Routes>
                <Route path='/' element={<MainScreen />} />
                <Route path='register' element={<Login />} />

                <Route path='GameScreen' element={<GameScreen />} />
                <Route path='Invite' element={<Invite />} />
                <Route path='Game/:id' element={<Game />} />


            </Routes>
        </div>
    )
}

export default Base
