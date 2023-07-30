import React from "react";

function Signup() {
    return (
        <div className="signupBox">
            <input type="text" className="username" placeholder="Username"></input>
            <input type="text" className="email" placeholder="Email"></input>
            <input type="password" className="password" placeholder="Password"></input>
            <button type="submit" className="signupButton">Signup</button>
        </div>
    )
}

export default Signup;