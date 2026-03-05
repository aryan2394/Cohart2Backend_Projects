import { createContext,useState } from "react";
export const AuthContext=createContext()
// iss layer ka main kaam sirf ek hota hai wo hai data ko store karna buss abhi ke liye jaise ki user deatils an loadin g state 
export const AuthProvider=({children})=>
{
    const [user,setUser]=useState(null)
    // null islye because starting mein ek user jab login bhi nahi kiya hai ya regsiter it is null state
    const [loading,setLoading]=useState(false);
    return (
        <AuthContext.Provider value={{loading,setLoading,user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}