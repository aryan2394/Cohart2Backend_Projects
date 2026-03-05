import { useContext } from "react";
import { AuthContext } from "../auth.context";
import React from 'react'
// ekho iska main kaam hai api and state ko maage karna toh sabse pahel toh ye karo ki dono mein jobhi likha hai uska yaha pe call karo
// jaise auth.context.jsx se craetecontext wali cheezein 
// and api se 3 function login,register and get-me 
import {register,login,getMe} from "../services/auth.api.jsx"
export const useAuth = () => {
  const context=useContext(AuthContext);
  const {user,setUser,loading,setLoading}=context;
  const handleLogin=async (username,password)=>
  {
        // as humne bataya tha ki ye do kaam karta hai 
        // api ko manage karna and states maanage karna 
        // how it handles state
        // laoding state ko set karna and jo bhi api se response data usko handle karna 
        // how it handles tha api calling
        // jab bhi api call karne ke baad data aayega respons mein usko handle karna jaise ki response aa gaya like user details toh uske saath kya karna hai 

        setLoading(true);
        const response=await login(username,password)
        setUser(response.user)
        setLoading(false);
  }
  const handleRegister=async (username,email,password)=>
  {
    setLoading(true);
    const response=await register(username,email,password);
    setUser(response.user);
    setLoading(false);
  }
  return{
    user,loading,handleLogin,handleRegister
}
}
export default useAuth;

