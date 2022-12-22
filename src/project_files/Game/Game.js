import React, {useEffect, useState} from 'react'

// import {} from 'react-router';
import {gql} from "@apollo/client";
import {client} from "../Client";

import {Link,useParams, useNavigate} from 'react-router-dom'

const cross = require('../../assets/images/cross.png')
const circle = require('../../assets/images/circle.png')
const nothing = require('../../assets/images/nothing.png')

function Game() {
    const {id} = useParams();
    console.log(id)
    const [username, setusername] = useState(localStorage.getItem('user'))
    const [name, setname] = useState("")
    const [userid, setuserid] = useState([])
    const [move, setmove] = useState(true)
    const [gameover, setgameover] = useState(false)
    const [msg, setmsg] = useState('move')
    const [winner, setwinner] = useState(true)
    const navigate = useNavigate()



    useEffect(() => {
        const getid = gql`

            query{
                GetGameUserbyusername(username:"${username}"){
                    id
                    name
                    username
                }
            }
        `
        client.query({
            query: getid,
            fetchPolicy: 'no-cache'
        }).then((data) => {
                console.log(data)
                setuserid(data.data.GetGameUserbyusername.id)
                setname(data.data.GetGameUserbyusername.name)
                getGame(data.data.GetGameUserbyusername.id)


            }
        ).catch((err) => {
            console.log(err)

        })

    }, [])

    const [playername, setplayername] = React.useState('Tanmay')
    const [matrix, setmatrix] = React.useState([
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
    ])
    const [edit, setedit] = React.useState(false)
    const [position, setposition] = React.useState(0)
    const [side, setside] = React.useState(0)


    const getGame = (uid) => {
        const getgame = gql`

            query{
                GetGamebyId(id:${id})
                {
                    startTime
                    tictactoe
                    player1Id
                    player2Id
                    player1Side
                    player2Side
                    player1Name
                    player2Name
                    currentPlayer
                    gameOver
                    gameState
                }
            }
        `
        client.query({
            query: getgame,
            fetchPolicy: 'no-cache'
        }).then((data) => {
            console.log(data)
            // create matrix from tictactoe string
            let matrix = []
            let tictactoe = data.data.GetGamebyId.tictactoe
            console.log(tictactoe)
            for (let i = 0; i < 3; i++) {
                let row = []
                for (let j = 0; j < 3; j++) {
                    row.push(tictactoe[i * 3 + j])
                    // console.log("mat detail", tictactoe[i * 3 + j])
                }
                matrix.push(row)
            }

            // console.log("matrix", matrix)
            setmatrix(matrix)
            console.log("current player", data.data.GetGamebyId.currentPlayer, "user id", uid , data.data.GetGamebyId.player1Side, data.data.GetGamebyId.player2Side, data.data.GetGamebyId.player1Id, data.data.GetGamebyId.player2Id)
            if (uid == data.data.GetGamebyId.player1Id) {
                console.log("player 1", data.data.GetGamebyId.player1Side)
                setside(data.data.GetGamebyId.player1Side)
                setplayername(data.data.GetGamebyId.player2Name)

            } else {
                console.log("player 2", data.data.GetGamebyId.player2Side)

                setside(data.data.GetGamebyId.player2Side)
                setplayername(data.data.GetGamebyId.player1Name)
            }
            if (data.data.GetGamebyId.currentPlayer == uid) {
                setmove(true)

            }
            else {
                setmove(false)
            }
            console.log("gameover", data.data.GetGamebyId.gameOver,gameover)
            if (data.data.GetGamebyId.gameOver) {
                setgameover(true)
                setmsg(data.data.GetGamebyId.gameState.split(" ")[1])
                if(data.data.GetGamebyId.gameState.split(" ")[0] == name){
                    console.log("winner",data.data.GetGamebyId.gameState.split(" ")[0],name)
                    setwinner(true)
                }
                else{

                    console.log("winner",data.data.GetGamebyId.gameState.split(" ")[0],name)
                    setwinner(false)
                }
            }
            else {
                setgameover(false)
                setmsg(data.data.GetGamebyId.gameState.split(" ")[1])

            }


        }).catch((err) => {
            console.log(err)

        })

    }


    const sunbmit = () => {

        let pos = 0
        pos = position[0] * 3 + position[1]
        console.log("pos", pos)
        const updategame = gql`
            mutation{
                updateGame(
                    gameid:${id}
                    player:${userid}
                    position:${pos}

                )
                {
                    game{
                        tictactoe
                        gameState
                        currentPlayer
                        
                    }
                    message
                }
            }
        `
        client.mutate({
            mutation: updategame,
            fetchPolicy: 'no-cache'
        }).then((data) => {
            console.log("response", data)
                getGame(userid)

        }
        ).catch((err) => {
            console.log(err)

        })

    }
    return (
        <div style={{
            position: 'relative',
            // border: '1px solid black',
            height: '100%',
        }}>
            <div className='authButtonContainer'>
                <div style={{
                    display: 'block',
                    position: 'relative',
                    padding: 10,

                    // border: '1px solid black',
                    width: "100%"
                }}>

                    <button
                        style={{
                            width: '100%',
                            // border: '1px solid black',
                            opacity: 1,
                            backgroundColor: gameover ?'#F2C94C' :move? '#F2C94C':'#E0E0E0',
                        }}
                        onClick={() => {
                            if (gameover) {
                                navigate('/Invite')
                            } else {
                                if (edit === false) {
                                    alert("Please select a position")
                                } else {
                                    if (move) {
                                        sunbmit()
                                    }
                                }

                            }
                        }
                        }
                        className='authButtons loginBtn'>{gameover ?"Start another game" : move ? "Submit!": "Waiting for "+playername}
                    </button>

                </div>
            </div>
            <div style={{padding: 10}}>
                <Link to={'/GameScreen'}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3213_273)">
                            <path
                                d="M16.62 2.99006C16.13 2.50006 15.34 2.50006 14.85 2.99006L6.54 11.3001C6.15 11.6901 6.15 12.3201 6.54 12.7101L14.85 21.0201C15.34 21.5101 16.13 21.5101 16.62 21.0201C17.11 20.5301 17.11 19.7401 16.62 19.2501L9.38 12.0001L16.63 4.75006C17.11 4.27006 17.11 3.47006 16.62 2.99006Z"
                                fill="#333333"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_3213_273">
                                <rect width="24" height="24" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </Link>

                <div style={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',

                }}>
                    <p className='subHeading'>Game with {playername}</p>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 20,
                            width: '100%',
                            // border: '1px solid black',
                        }}>
                        <h2 className='heading'
                            style={{fontSize: 16, color: '#333333', fontWeight: 600, marginBottom: 10}}>
                            Your piece</h2>
                    </div>

                    <img className={'piece'}
                         style={{
                             width: 50,
                             height: 50,
                             borderRadius: 10,
                             backgroundColor: 'white',
                             // border: '1px solid black',
                             alignSelf: 'flex-start',
                             justifySelf: 'flex-start',
                             marginBottom: 20,
                             marginTop: 10,
                             marginRight: 10,
                         }}
                         src={side === 'X' ? cross : circle}
                         alt={'white king'}/>

                    <div
                        style={{
                            display: 'flex',

                        }}>
                        <h2 className='heading'
                            style={{
                                fontSize: 20,
                                // border: '1px solid black',
                                width: "100%",
                                height: 55,
                                textAlign: 'center',
                                padding: 20,
                                color: '#333333',
                                fontWeight: 500,
                                marginBottom: 0,
                                backgroundColor: '#FFE79E',
                                verticalAlign: 'middle',



                            }}>
                            {gameover ? msg == "Draw" ? "Draw" : winner ? "You " + msg : "Their "+msg : move ? "Your " + msg:"Their "+msg }</h2>
                    </div>

                    {matrix.map((row, i) => {
                            return (
                                <div
                                    key={i}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: "80%",
                                        // border: '1px solid black',
                                    }}>

                                    {
                                        matrix[i].map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        height: "100%",
                                                        width: "100%",
                                                        borderRight: index === 2 ? "7px solid white" : '7px solid #FFE79E',
                                                        borderBottom: i === 2 ? "7px solid white" : '7px solid #FFE79E',

                                                    }}>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            padding: 15,

                                                        }}
                                                    >
                                                        <img className={'piece'}
                                                             style={{
                                                                 width: 75,
                                                                 height: 75,
                                                                 borderRadius: 10,
                                                                 backgroundColor: 'white',
                                                                 // border: '1px solid black',
                                                                 alignSelf: 'center',
                                                                 justifySelf: 'center',
                                                                 marginBottom: 20,
                                                                 marginTop: 10,
                                                                 marginRight: 10,
                                                             }}
                                                             src={matrix[i][index] === 'O' ? circle : matrix[i][index] === 'X' ? cross : nothing}
                                                             onClick={() => {
                                                                 console.log(i*3+index)
                                                                 if (matrix[i][index] === '-') {
                                                                     if (edit) {
                                                                         let temp = [...matrix]
                                                                         temp[position[0]][position[1]] = '-'
                                                                         temp[i][index] = side
                                                                         setmatrix(temp)
                                                                         setposition([i, index])
                                                                         setedit(true)
                                                                     }
                                                                     let newMatrix = [...matrix]
                                                                     newMatrix[i][index] = side
                                                                     setmatrix(newMatrix)
                                                                     setedit(true)
                                                                     setposition([i, index])
                                                                 }


                                                             }}

                                                             alt={'marked'}/>

                                                    </div>
                                                </div>
                                            )
                                        })


                                    }

                                </div>
                            )
                        }
                    )
                    }


                </div>
            </div>

        </div>
    )
}

export default Game
