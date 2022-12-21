import React from 'react'
import './GameScreenStyle.css'
import { Link } from 'react-router-dom'

function GameScreen() {
    return (
        <div style={{
            position: 'relative',
            height: '100%',
            // border: '1px solid black',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                <div style={{ width: '100%', }}>

                    <h1 className='mainHeading'>No Games Found</h1>

                    <Link to={'/Invite'}>
                        <button className='authButtons loginBtn'>Start a new game </button>
                    </Link>
                </div>
            </div>

        </div >
    )
}

export default GameScreen
