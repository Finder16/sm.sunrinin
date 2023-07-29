import React from "react";
import './Login.css';

function LoginPage() {
    return (
        <div className="login_container">
            <input type="text" className="email" placeholder="Email"></input>
            <input type="password" className="password" placeholder="Password"></input>
            <button className="signIn" type="submit">Login</button>
        </div>
    )
}

export default LoginPage;