import React from "react";
import './login.css';

function Login() {
    return (
        <>
        <video muted autoPlay loop className="bgVideo">
            <source src="img/background.mp4" type="video/mp4"/>
        </video>
        <div className="login-container">
            <h1 className="loginTitle">Login</h1>
            <form method="post" action="/login" className="loginForm">
                <input type="text" className="loginUsername" placeholder="Username"></input>
                <input type="password" className="loginPassword" placeholder="Password"></input>
                <button type="submit" className="loginButton">Login</button>
            </form>
        </div>
        </>
        
    )
}

export default Login;
