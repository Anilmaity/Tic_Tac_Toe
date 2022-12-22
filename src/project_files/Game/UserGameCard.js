import React from 'react'
import './UserGameCard.css'
import {Link, useNavigate} from "react-router-dom";
import moment from 'moment'
function UserGameCard({item,id,name}) {
    // console.log(item)

    const navigate = useNavigate()
    return (
        <div className='cardContainer'>
            <p className='title'>Game with {name == item.player1Name ? item.player2Name : item.player1Name }</p>
            {item.gameOver ?

                <p className='description'>{item.gameState.split(" ")[1] == "Draw" ? "Draw" : name ==item.gameState.split(" ")[0] ? "You Won" : item.gameState } </p>
                :
                <p className='description'>{item.currentPlayer != id ?"You’ve made your move!\n" +
                    "Waiting for them." :name == item.player1Name ? item.player2Name + " just made their move!\n" +
                    "It’s your turn to play now.":item.player1Name +" just made their move!\n" +
                    "It’s your turn to play now."  } </p>

            }
            <p className='timeStamp'>{moment(item.startTime).format("Do MMM  YY, h:mm a")}</p>
            <Link to={`/game/${item.id}`}>
            <button

            >Play!</button>
            </Link>
        </div>
    )
}

export default UserGameCard
