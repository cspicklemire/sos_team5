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
            <span style = {{color:'white'}} >You are currently logged in as <br /> {props.email} <br /> </span>
            <a href="/google/logout">Logout </a>
        </div>
        )

    return (
        props.email ? signOutButton : signInButton
    )
}


export default GoogleLogin
