import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import http from "../plugins/http"

const Register = () => {

    const nav = useNavigate()
    const [getMessage, setMessage] = useState()

    const ref = {
        username: useRef(),
        pass1: useRef(),
        pass2: useRef()
    }

    async function register() {
        const user = {
            username: ref.username.current.value,
            pass1: ref.pass1.current.value,
            pass2: ref.pass2.current.value
        }

        http.post(user, "register").then(res => {
            setMessage(res.message)
            if(res.success) {
                nav('/login')
            }
        })
    }

    return (
        <div className="registerField d-flex f-column j-ard al-center">
            {getMessage && <div>{getMessage}</div>}
            <input type="text" ref={ref.username} placeholder="Your username"/>
            <input type="password" ref={ref.pass1} placeholder="Your password"/>
            <input type="password"  ref={ref.pass2} placeholder="Repeat your password"/>
            <button onClick={register}>Register</button>
        </div>
    );
};

export default Register;