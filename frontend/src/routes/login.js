import React from "react";
import './login.css';

function Login() {
    return (
        <form method="post" action="/login" className="loginForm">
            <h1 className="loginTitle">Log In</h1>
            <input type="text" className="loginUsername" placeholder="Username"></input>
            <input type="password" className="loginPassword" placeholder="Password"></input>
            <button type="submit" className="loginButton">Login</button>
        </form>
    )
}

export default Login;