import React, { useState } from 'react'
import {Link} from "react-router"
import axios from "axios"
const Register = () => {
  const [username,setusername]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("")
  async function handleSubmit(e)
  {
    e.preventDefault();
    // ab dikkat ye hai ki agar aap use karoge axios se data bhejke register ka toh ho jayega lekin ek dikkat hai ki register ke baad token cookies mein store hoti hai client ke lekin aise hum token save nahi joga toh 
    // huemin kya karna hoga ki axios mein creadential:true kar do ab kya hoga ki jo bhi cookies mein set karana hai wo set ho jayega 
    // IN BACKEND MEIN app.use(cors() )usmein set origin to localhost:5173 
    axios.post("http://localhost:3000/api/auth/register",{
      username,
      email,
      password
    },{
      withCredentials:true
    })
    .then((res)=>
    {
      console.log(res.data);
    })
  }
  return (
     <>
    <main>
        <div className="form-container">
            <h1>Register Form</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='enter username' name='username' onInput={(e)=>setusername(e.target.value) } value={username}/>
                <input type="email" name="email" placeholder='enter email' value={email} onInput={(e)=>setemail(e.target.value)} />
                <input type="password" placeholder='enter password' name='password' value={password} onInput={(e)=>setpassword(e.target.value)}/>
                <button type='submit'>Submit</button>
            </form>
            <p>Already Have a Account <Link className='toggleAuthForm' to="/login">Login</Link></p>
        </div>
    </main>
    </>
  )
}

export default Register
