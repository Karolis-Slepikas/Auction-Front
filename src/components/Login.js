import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import http from "../plugins/http"

const Login = () => {

    const [getMessage, setMessage] = useState()

    const nav = useNavigate()
    const username = useRef()
    const pass = useRef()


    async function login() {
        const logged = {
            username: username.current.value,
            pass: pass.current.value
        }

       http.post(logged, "login").then(res => {
           setMessage(res.message)
           if(res.success) {
               nav('/allauctions')
           }
       })
    }


    return (
        <div className="registerField d-flex f-column j-ard al-center">
            {getMessage && <div>{getMessage}</div>}
            <input type="text" ref={username} placeholder="Your username"/>
            <input type="password" ref={pass} placeholder="Your password"/>
            <button onClick={login}>Login</button>
        </div>
    );
};

export default Login;