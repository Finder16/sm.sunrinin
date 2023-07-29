import React from "react";
import './Login.css';

function LoginPage() {
    return (
        <div className="login_container">
            <input type="text" className="email" placeholder="Email"></input>
            <input type="password" className="password" placeholder="Password"></input>
        </div>
    )
}

export default LoginPage;