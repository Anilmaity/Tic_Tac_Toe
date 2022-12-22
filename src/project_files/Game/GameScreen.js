import React, {useEffect, useState} from 'react'
import './GameScreenStyle.css'
import {Link} from 'react-router-dom'
import UserGameCard from './UserGameCard'
import {gql} from "@apollo/client";
import {client} from "../Client";

function GameScreen() {
    const [playersList, setPlayersList] = useState([])
    const [user, setUser] = useState(localStorage.getItem('user'))
    const [id, setid] = useState('')
    const [name, setname] = useState('')

    useEffect(() => {

        const getGame = gql`
            query{
                GetGameUserbyusername(username:"${user}"){
                    id
                    name
                    username
                    Games{
                        id
                        gameState
                        gameOver
                        tictactoe
                        startTime
                        endTime
                        player1Id
                        currentPlayer
                        player2Id
                        startedBy
                        player1Name
                        player2Name
                        currentPlayer

                    }
                }
            }
        `
        client.query({
            query: getGame,
            fetchPolicy: 'no-cache'
        }).then((data) => {
            console.log(data)
            setid(data.data.GetGameUserbyusername.id)
            setname(data.data.GetGameUserbyusername.name)
            let game = data.data.GetGameUserbyusername.Games
            // filter out games by id
            setPlayersList(data.data.GetGameUserbyusername.Games)
        }).catch((err) => {
            console.log(err)
        })
        }, [])




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
            <div style={{height: '100vh', width: '100%',}}>
                <div style={{width: '100%', height: '100%'}}>
                    {
                        playersList.length > 0 ?
                            <>{

                                playersList.map((item,index) => {
                                    return (
                                        <UserGameCard item={item} id={id} name={name}/>

                                    )
                                })
                            }

                                <div style={{
                                    position: 'fixed',
                                    backgroundColor: '#270F36',
                                    color: 'white',
                                    bottom: 10,
                                    right: 10,
                                    borderRadius: 8,
                                    boxShadow: '2px 2px 16px rgba(0, 0, 0, 0.16)'

                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0.5em'
                                    }}
                                         onClick={() => {
                                             window.location.href = '/Invite'

                                         }}
                                    >

                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_6_233)">
                                                <path
                                                    d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
                                                    fill="white"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_6_233">
                                                    <rect width="24" height="24" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <p style={{margin: 0, fontSize: 14, fontWeight: '700'}}>


                                            New game</p>
                                    </div>
                                </div>
                            </>
                            : <>
                                <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>

                                    <h1 className='mainHeading'>No Games Found</h1>

                                </div>
                                <div className='authButtonContainer'>

                                        <button className='authButtons loginBtn'
                                        onClick={() => {
                                            window.location.href = '/Invite'

                                        }}

                                        >Start a new game
                                        </button>
                                </div>
                            </>
                    }
                </div>
            </div>

        </div>
    )
}

export default GameScreen
