import { useContext,useState } from "react";
import { AuthContext } from "../auth.context";
import {register,login,getMe} from "../services/auth.api.jsx"
import React from 'react'

const useAuth = () => {
    const context=useContext(AuthContext);
    const {user,setUser,loading,setLoading}=context;
    const handleLogin=async (username,password)=>
    {
        setLoading(true)
        const response=await login(username,password);
        setUser(response.data)
        setLoading(false);
    }
    const handleRegister=async (username,password,email)=>
    {
        setLoading(true);
        const response=await register(username,email,password);
        setUser(response.data);
        setLoading(false);
    }
    return {
        user,loading,handleLogin,handleRegister
    }
}

export default useAuth
