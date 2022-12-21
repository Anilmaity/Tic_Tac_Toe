import React from 'react'
import { Link } from 'react-router-dom'
const cross = require('../../assets/images/cross.png')
const circle = require('../../assets/images/circle.png')
const nothing = require('../../assets/images/nothing.png')

function Invite() {

    const [playername, setplayername] = React.useState('Tanmay')
    const [matrix, setmatrix] = React.useState([
        [0, 0, 1],
        [0, -1, 0],
        [1, 0, -1]
    ])

    return (
        <div style={{
            position: 'relative',
            // border: '1px solid black',
            height: '100vh',
        }}>
            <div className='authButtonContainer' >
                <div style={{
                    display: 'block',
                    position: 'relative',
                    padding: 10,
                    alignSelf: 'center',
                    justifySelf: 'center',
                    // border: '1px solid black',
                    width:"100%"}}>

                    <button
                        style={{
                            width: '95%',
                            // border: '1px solid black',
                        }}
                        className='authButtons loginBtn'>Submit</button>

                </div>
            </div >
            <div style={{ padding: 10 }}>
                <Link to={'/'}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/*<g clip-path="url(#clip0_3213_273)">*/}
                        {/*    <path d="M16.62 2.99006C16.13 2.50006 15.34 2.50006 14.85 2.99006L6.54 11.3001C6.15 11.6901 6.15 12.3201 6.54 12.7101L14.85 21.0201C15.34 21.5101 16.13 21.5101 16.62 21.0201C17.11 20.5301 17.11 19.7401 16.62 19.2501L9.38 12.0001L16.63 4.75006C17.11 4.27006 17.11 3.47006 16.62 2.99006Z" fill="#333333" />*/}
                        {/*</g>*/}
                        <defs>
                            <clipPath id="clip0_3213_273">
                                <rect width="24" height="24" fill="white" />
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
                          src={cross}
                        alt={'white king'} />

                    <div
                    style={{
                        display: 'flex',

                    }}>
                        <h2 className='heading'
                        style={{
                            fontSize: 20,
                            // border: '1px solid black',
                            width: "100%",
                            height: 20,
                            textAlign: 'center',
                            padding: 20,
                            color: '#333333',
                            fontWeight: 500,
                            marginBottom: 0,
                            backgroundColor: '#FFE79E',

                        }}>
                        Your Move</h2>
                </div>

                    { matrix.map((row, i)=> {
                            return(
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
                                        matrix[0].map((item, index) => {
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
                                                             src={matrix[i][index] === 0 ? circle :matrix[i][index] === 1 ? cross : nothing}
                                                             onClick={() => {
                                                                 console.log(i, index)
                                                                 let newMatrix = matrix
                                                                 newMatrix[i][index] = 1
                                                                 setmatrix(newMatrix)



                                                             }}

                                                             alt={'marked'} />

                                                    </div>
                                                </div>
                                            )
                                        })


                                    }

                                </div>
                            )}
                        )
                        }


                </div>
            </div>

        </div >
    )
}

export default Invite
