import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const {loading,handleRegister}=useAuth()
  const navigate=useNavigate()
  const handleSubmit=async (e)=>
  {
    e.preventDefault();
    await handleRegister(username,email,password);
    navigate("/");
    console.log("register by shri ji");
  }
  if(loading)
  {
    return (
      <main>
        <h1>Shri ji loading ...</h1>
      </main>
    )
  }
  return (
    <>
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='enter username' name='username' onInput={(e)=>setUsername(e.target.value)} value={username}/>
                <input type="email" placeholder='enter email' name='email' onInput={(e)=>setEmail(e.target.value)} value={email} />
                <input type="password" name="password" placeholder='enter password' onInput={(e)=>setPassword(e.target.value)} value={password} />
                <button className='button primary-button'>Register</button>
                <p>Already have a account on shri ji <Link to={"/login"}>Login account by Shri ji</Link></p>
            </form>
        </div>
    </main>
    </>
  )
}

export default Register
