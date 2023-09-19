import React from "react";
import '../styles/signup.css';

function Signup() {
    return (
        <>
        <video muted autoPlay loop className="bgVideo">
            <source src="/img/background.mp4" type="video/mp4"/>
        </video>
        <div className="signup-container">
            <h1 className="signupTitle">Signup</h1>
            <form method="post"action="http://localhost:5000/signup" className="signupForm">
                <input type="text" className="signupUsername" placeholder="Username" name="username"></input>
                <input type="password" className="signupPassword" placeholder="Password" name="password"></input>
                <button type="submit" className="signupButton">Signup</button>
            </form>
        </div>
        </>
    )
}

export default Signup;