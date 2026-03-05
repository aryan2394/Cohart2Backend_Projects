import React, { useState } from 'react'
import { Link } from 'react-router'
import "../styles/form.scss"
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router'
const Login = () => {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const {handleLogin,user,loading}=useAuth();
  const navigate=useNavigate()
  const handleSubmit=async (e)=>
  {
    e.preventDefault();
    await handleLogin(username,password);
    setPassword("");
    setUsername("");
    navigate("/");
    console.log("shriji logged in succesfully");
  }
  if(loading)
  {
    return <h1>Shri ji is loading ...</h1>
  }
  return (
    <>
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='enter username' name='username' onInput={(e)=>setUsername(e.target.value)} value={username}/>
                <input type="password" name="username" placeholder='enter password' onInput={(e)=>setPassword(e.target.value)} value={password} />
                <button className='button primary-button'>Login</button>
                <p>Dont have a account on shri ji <Link to={"/register"}>Create Account by Shri ji</Link></p>
            </form>
        </div>
    </main>
    </>
  )
}

export default Login
