import React, {useEffect, useState} from 'react'
import './Invite.css'
import {Link, useNavigate} from 'react-router-dom'
import {gql} from "@apollo/client";
import {client} from "../Client";

function Invite() {
    const [email, setemail] = useState('')
    const [id, setid] = useState('')
    const [username, setusername] = useState(localStorage.getItem('user'))
    const navigate = useNavigate()

    useEffect(() => {

        const getid = gql`
            query{
                GetGameUserbyusername(username:"${username}"){
                    id
                }
            }
        `
        client.query({
            query: getid,
            fetchPolicy: 'no-cache'
        }).then((data) => {
                console.log(data)
                setid(data.data.GetGameUserbyusername.id)

            }
        ).catch((err) => {
                console.log(err)

            }
        )
    }, [])


    const handleInvite = () => {
        console.log(email, id)
        const createneewgame = gql`
            mutation{
                createGame(
                    email:"${email}"
                    player1Id:${id}
                )
                {
                    game{
                        id
                        gameState
                    }
                    message
                }
            }
        `
        client.mutate({
            mutation: createneewgame,
            fetchPolicy: 'no-cache'
        }).then((data) => {
            console.log("response",data.data.createGame.message)
            if (data.data.createGame.message === "Game created") {
                navigate('/GameScreen')
            }
            else if(data.data.createGame.message === "Game already exists"){
                alert("Game already exists")
            }
        }).catch((err) => {
            console.log(err)
            // if (err.errors.message === "Gameuser matching query does not exist.") {
                alert("email not found")
            // }
        })
        }



    return (
        <div style={{
            position: 'relative',
            // border: '1px solid black',
            height: '100vh',
        }}>
            <div className='authButtonContainer'>
                <div style={{
                    display: 'block',
                    position: 'relative',
                    padding: 10,
                    alignSelf: 'center',
                    justifySelf: 'center',
                    // border: '1px solid black',
                    width: "100%"
                }}>

                        <button
                            style={{
                                width: '95%',
                                // border: '1px solid black',
                            }}
                            onClick={() => {
                                console.log('clicked')
                                handleInvite()

                            }}
                            className='authButtons loginBtn'>Start game
                        </button>
                </div>
            </div>
            <div style={{padding: 10}}>
                <Link to={'/'}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_3213_273)">
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

                <div style={{marginTop: 20}}>
                    <h2 className='heading'>Start a new game</h2>
                    <p className='subHeading'>Whome do you want to play with?</p>
                </div>
                <div>
                    <div>
                        <h2 className='heading'
                            style={{
                                fontSize: 16,
                                marginTop: "15%",
                                color: '#333333',
                                fontWeight: 600,
                                marginBottom: 10
                            }}>
                            Email</h2>
                        <input style={{
                            width: '100%',
                            height: 40,
                            borderRadius: 5,
                            border: '0px solid #333333',
                            padding: 10,
                            fontSize: 16,
                            color: '#333333',
                            backgroundColor: '#F2F2F2',
                            fontWeight: 400,

                        }}
                               onChange={(e) => {
                                   setemail(e.target.value)}
                               }
                               className='input'
                               type='text'
                               placeholder='Type their email here'/>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Invite
