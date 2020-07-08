import React from 'react';
import Google_Sign_In from '../img/Google_Sign_In.png'

function GoogleLogin(props) {

    const signInButton = (
        <div className = 'GoogleLogin'>
            <a href="/google/login">
            <img src = {Google_Sign_In} alt = 'Google Login' width = "200" height = "50"></img>
            </a>
        </div>
        )

    const signOutButton = (
        <div className = 'GoogleLogin'>
            <span>You are currently logged in as <br /> {props.email}</span>
            <a href="/google/logout">Logout</a>
        </div>
        )

    return (
        props.email ? signOutButton : signInButton
    )
}


export default GoogleLogin
