import React from 'react'
import './UserGameCard.css'

function UserGameCard() {
    return (
        <div className='cardContainer'>
            <p className='title'>Game with Tanmay</p>
            <p className='description'>Tanmay just made their move!
                It’s your turn to play now.</p>
            <p className='timeStamp'>9th June 2022, 3:15pm</p>
            <button>Play!</button>
        </div>
    )
}

export default UserGameCard