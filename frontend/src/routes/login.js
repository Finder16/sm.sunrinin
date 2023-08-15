import React from "react";
import './login.css';

function Login() {
    return (
        <div className="login-container">
            <img className="background" alt="background" src="img/loginBackground.png" />
            <form method="post" action="/login" className="loginForm">
                <h1 className="loginTitle">Log In</h1>
                <input type="text" className="loginUsername" placeholder="Username"></input>
                <input type="password" className="loginPassword" placeholder="Password"></input>
                <button type="submit" className="loginButton">Login</button>
            </form>
        </div>
    )
}

export default Login;
