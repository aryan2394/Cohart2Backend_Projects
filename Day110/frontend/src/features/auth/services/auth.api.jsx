import axios from "axios"
// iska kaam hai sirf backend se connect karna aur kuch nahi logics ismein nahi honge 
const api=axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})
export async function register(username,email,password) {
    try {
        const response=await api.post("/register",{
        username,email,password
    })
    return response.data
    // matlab ki user jab data craete kar diya toh hum uss data ko retrun kar denge jo create huwa hoga jaise example mein user=shriji and pass:"shriji123"
    // toh hum issi data ko return kar denge jaise waha pe hum res.sttaus karke data bhejte hai "user":user
    } catch (error) {
        throw error;
    }
}
export async function login(username,password)
{
try {
        const response=await api.post("/login",{
        username,password
    })
    return response.data
} catch (err) {
    throw err;
}
}
export async function getMe() {
    try {
        const response=await api.get("/get-me")
    return response.data
    } catch (error) {
        throw error;
    }
}