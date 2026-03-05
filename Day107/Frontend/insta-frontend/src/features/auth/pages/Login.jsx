import React from 'react'
import "../styles/form.scss"
import {Link} from "react-router"
import { useState } from 'react'
import axios from 'axios'
const Login = () => {
  const [username,setusername]=useState("");
  const [password,setpassword]=useState("");
  async function handleSubmit(e)
  {
    e.preventDefault();
    axios.post("http://localhost:3000/api/auth/login",{
      username,
      password,
    },{
      withCredentials:true
    })
    .then((res)=>
    {
      console.log(res.data)
    })
  }
  return (
    <>
    <main>
        <div className="form-container">
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='enter username' name='username' onInput={(e)=>setusername(e.target.value)} value={username}/>
                <input type="password" placeholder='enter password' name='password' onInput={(e)=>setpassword(e.target.value)} value={password}/>
                <button type='submit'>Submit</button>
            </form>
            <p>Do not have a account <Link className='toggleAuthForm' to="/register">Register</Link></p>
        </div>
    </main>
    </>
  )
}

export default Login
