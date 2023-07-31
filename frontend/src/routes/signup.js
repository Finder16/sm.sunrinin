import React from "react";
import './signup.css';

function Signup() {
    return (
        <form method="post" action="" className="signupForm">
            <div className="signupBox">
                <h1 className="signupTitle">Sign Up</h1>
                <input type="text" className="signupUsername" placeholder="Username"></input>
                <input type="text" className="signupEmail" placeholder="Email"></input>
                <input type="password" className="signupPassword" placeholder="Password"></input>
                <button type="submit" className="signupButton">Signup</button>
            </div>
        </form>
        
    )
}

export default Signup;