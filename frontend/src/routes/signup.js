import React from "react";
import './signup.css';

function Signup() {
    return (
        <>
        <video muted autoPlay loop className="bgVideo">
            <source src="img/background.mp4" type="video/mp4"/>
        </video>
        <div className="signup-container">
            <h1 className="signupTitle">Signup</h1>
            <form method="post" action="/signup" className="signupForm">
                <input type="text" className="signupUsername" placeholder="Username"></input>
                <input type="password" className="signupPassword" placeholder="Password"></input>
                <button type="submit" className="signupButton">Signup</button>
            </form>
        </div>
        </>
    )
}

export default Signup;