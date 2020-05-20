import React, { useState } from 'react';
import { connect } from 'react-redux'
import { login } from "../redux/Actions"
import { Link } from "react-router-dom";

function Login(props) {

    const [u_name, setU_name] = useState('');
    const [password, setPassword] = useState('');

    
    const handleClick = async (e) => {
        e.preventDefault()
        const data = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ u_name, password })
        })
        if (data.ok) {
            const res = await data.json()
            sessionStorage.token = res.token
            sessionStorage.isAdmin = res.user[0].isAdmin
            sessionStorage.setItem('uId', res.user[0].id,)
            props.dispatch(login(u_name, password))
            alert("User hase been successfully connected")
            props.history.push("/")
        }

    }

    return (
        <div className="login-container">
            <div className="login-page">
                <h1>Login</h1>
                <form className="login-payload" onSubmit={handleClick}>
                    <label htmlFor="userName">Username:</label>
                    <input type="text" onChange={e => setU_name(e.target.value)} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                    <div className="submit">
                        <input type="submit" value="Login" id="login-btn" />
                        <Link to="/register">New user? Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        vacations: state.getAllVacations
    }
}



export default connect(mapStateToProps)(Login)