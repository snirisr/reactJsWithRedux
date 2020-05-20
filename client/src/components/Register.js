import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { login } from "../redux/Actions"



const Register = (props) => {

    const [f_name, setF_name] = useState('')
    const [l_name, setL_name] = useState('')
    const [u_name, setU_name] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState('')

    useEffect(() => {
        
    }, [])

    const registerHandleClick = async (e) => {
        e.preventDefault()
        const data = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ f_name, l_name, u_name, password})
        })
        if (data.ok) {
            alert('User has been successfully registered,you are now Logged In')
            const res = await data.json()
            console.log(res);
            loginSend(e)
        }
        else {
            console.log('err')
        }
    }

    const loginSend = async (e) => {
        const data = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ u_name, password })
        })
        if (data.ok) {
            const res = await data.json()
            sessionStorage.token = res.token
            sessionStorage.isAdmin = res.user[0].isAdmin
            setIsAdmin(res.user[0].isAdmin)
            sessionStorage.setItem('uId', res.user[0].id,)
            props.dispatch(login(u_name, password, isAdmin))
            props.history.push("/")
        }

    }

    return (
            <div className="register-container">
            <div className="register-page">
                <h1>Register</h1>
                <form className="register-payload" onSubmit={registerHandleClick}>
                    <label htmlFor="username">First Name:</label>
                    <input type="text" placeholder="Enter Your Firstname" onChange={e => { setF_name(e.target.value) }} />
                    <label htmlFor="username">Last Name:</label>
                    <input type="text" placeholder="Enter Your Lastname" onChange={e => { setL_name(e.target.value) }} />
                    <label htmlFor="username">Username:</label>
                    <input type="text" placeholder="Enter Your Username" onChange={e => { setU_name(e.target.value) }} />
                    <label htmlFor="password">Password: </label>
                    <input type="password" placeholder="Enter Your Password" onChange={e => { setPassword(e.target.value) }} />
                    <div className="btns">
                        <input type="submit" value="Register" className="register-btn"/>
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



export default connect(mapStateToProps)(Register)