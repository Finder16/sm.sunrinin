import React from "react";

function Login() {
    return (
        <div className="loginBox">
            <input type="text" className="email" placeholder="Email"></input>
            <input type="password" className="password" placeholder="Password"></input>
            <button type="submit" className="loginButton">Login</button>
        </div>
    )
}

export default Login;