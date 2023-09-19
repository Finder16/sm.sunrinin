import React from "react";
import { useNavigate } from 'react-router-dom';
import { login } from "../api";
import '../styles/login.css';

function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate();

    const handleSubmit = () => {
        login(username, password).then((res) => {
            navigate("/")
        }).catch((err) => {
            console.log(err)
            alert("로그인 실패");
        });
    }

    return (
        <>
            <video muted autoPlay loop className="bgVideo">
                <source src="/img/background.mp4" type="video/mp4" />
            </video>
            <div className="login-container">
                <h1 className="loginTitle">Login</h1>
                <form
                    className="loginForm"
                    onSubmit={(e) => {
                        e.preventDefault(); // form 클릭 시 새로고침 방지
                        handleSubmit();
                    }} 
                >
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="loginUsername" placeholder="Username"></input>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="loginPassword" placeholder="Password"></input>
                    <button type="submit" className="loginButton">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;
