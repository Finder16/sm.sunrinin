import React from "react";
import './login.css';

function Login() {
    return (
        <form method="post" action="" className="loginForm">
            <div className="loginBox">
                <h1 className="loginTitle">Log In</h1>
                <input type="text" className="loginUsername" placeholder="Username"></input>
                <input type="password" className="loginPassword" placeholder="Password"></input>
                <button type="submit" className="loginButton">Login</button>
            </div>
        </form>
    )
}

export default Login;