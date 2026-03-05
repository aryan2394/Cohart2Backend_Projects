import React, { useState } from 'react'
import "../styles/form.scss"
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
const Login = () => {
    const {loading,user,handleLogin}=useAuth()
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const handleSubmit=async (e)=>
    {
        e.preventDefault()
        await handleLogin(username,password)
        navigate("/")
        console.log("shriji");
    }
    if(loading)
    {
        return <h1>Loading... shri ji</h1>
    }
  return (
    <>
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='enter username' name='username' value={username} onInput={(e)=>setUsername(e.target.value)}/>
                <input type="text" placeholder='enter password' name='password' value={password} onInput={(e)=>setPassword(e.target.value)} />
                <button className='primary-button button'>Login</button>
                <p>Don't have a account on shri ji <Link to={"/register"}>Register</Link></p>
            </form>
        </div>
    </main>
    </>
  )
}

export default Login
