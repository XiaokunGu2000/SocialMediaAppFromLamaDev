import React, { useRef } from "react";
import "./register.css"
import axios from "axios";
import {useNavigate} from "react-router-dom"

export default function Register(){
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            password.current.setCustomValidity("password do not match");
        }
        else{
            const user = {
                username: username.current.value,
                email:email.current.value,
                password:password.current.value
            };
            try {
                const res = await axios.post("auth/register", user);
                history("/login");
            } catch (error) {
                console.log(error);
            }
        }

    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">LamaSocial</h3>
                    <span className="loginDesc"> Connects with the friends and the world around you on LamaSocial </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="username" required ref={username} className="loginInput" />
                        <input placeholder="email" required ref={email} className="loginInput" type="email" />
                        <input placeholder="password" required ref={password} className="loginInput" type="password" minLength="6" />
                        <input placeholder="passwordAgain" required ref={passwordAgain} className="loginInput" type="password" />
                        <button className="loginButton" type="submit">Sign up</button>
                        <button className="loginRegisterButton">Log into your account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}