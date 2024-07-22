import React, { memo, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setAdmin, setToken } from '../../lib/slice/authSlice'
import './login.scss'

const Login = () => {
    const [type, setType] = useState(false)
    const [admins, setAdmins] = useState({ username: 'xursanjonov004', password: '123456778' })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://trade.namtech.uz/admin/sign-in', admins)
            .then(res => (
                dispatch(setToken(res.data.innerData.token)),
                dispatch(setAdmin(res.data.innerData.user)),
                navigate("/admin/customer")
            ))
    }

    return (
        <div className='login'>
            <h1 className='login-title'>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor=""><span>UserName</span>
                    <input value={admins.username} onChange={e => setAdmins(p => ({ ...p, username: e.target.value }))}
                        type="text" placeholder="UserName" />
                </label>
                <label htmlFor="passwords" className='password-label'><span>Password</span>
                    <input id='passwords' value={admins.password} onChange={e => setAdmins(p => ({ ...p, password: e.target.value }))}
                        type={type ? 'text' : 'password'} placeholder="Password" />
                    <button onClick={() => setType(p => !p)} className='pssword-icon'>
                        {
                            type ? <FaEyeSlash fontSize={20} /> : <FaEye fontSize={20} />
                        }
                    </button>
                </label>
                <button type='submit' className='login-form-btn'>Submit</button>
            </form>
        </div>
    )
}

export default memo(Login)