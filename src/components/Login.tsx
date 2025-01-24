import React, {useState} from 'react';

import style from '../styles/Login.ts';
import {useNavigate, NavLink} from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Error | null>(null);
    const navigate = useNavigate();
    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password }),
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_FETCH_URL}/auth/login`, options);
            const data = await response.json();
            if(response.ok) {
                localStorage.setItem('jwt-token', data.token);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('username', data.username)
                setError(null);
                navigate('/');
            }else {
                setError(new Error(data.msg))
            }
        }catch (error) {
            setError(new Error('no connection to server possible, pls try again later'))
            console.log((error as Error).message);
        }
    }
    return (
        <>
        <div style={style.container as object}>
            <p style={{padding: '5px', color: 'red'}}>{error?.message}</p>
            <h2 style={style.heading}>Login to Messenger</h2>
            <form style={style.formGroup}>
                <input
                    type="text"
                    placeholder="E-Mail"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={style.input as object}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={style.input as object}
                />
                <button onClick={(e) => handleLogin(e)} style={style.button}>Login</button>
            </form>
        <div>
            Don't have an Account? <NavLink to="/register">Register now</NavLink>
        </div>
        </div>

    </>
    )
}