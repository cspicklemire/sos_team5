import React from 'react';

function GoogleLogin(props) {

    const signInButton = (
        <div className = 'GoogleLogin'>
            <a href="/google/login">
                <img src = {'/img/Google_Sign_In.png'} alt = 'Google Login' width = "200" height = "50"></img>
            </a>
        </div>
        )

    const signOutButton = (
        <div className = 'GoogleLogin'>
            <span style = {{color:'white'}} >You are currently logged in as <br /> {props.email} <br /> Account status: { props.status } <br /> </span>
            <a href="/google/logout"> 
                <img src = {'/img/Google_Logout.png'} alt = 'Google Login' width = "75" height = "30"></img>
            </a>
        </div>
        )
    return (
        props.email ? signOutButton : signInButton
    )
}


export default GoogleLogin
