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
    // axios.post("http://localhost:3000/api/auth/login",{
    //   username,
    //   password,
    // },{
    //   withCredentials:true
    // })
    // .then((res)=>
    // {
    //   console.log(res.data)
    // })
    // dekho bhai hum jo hai UI MEIN SIRF UI DIKATE HAI LKEIN YE UI DIKHANE WAL COMPONENT BACKEND SE BHI CONNECT KAR RAHA HAI 
    // WHICH IS NOT ALLOWED TO 
    // API HANDLE AND BACKEND SE FRONETND MEIN BAAT CHEEZ KE LIYE WE ARE USING THE API LAYER 
    // craete the auth.api.js 
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
