import axios from "axios";
// YAAD RAKHNA ISMEIN SIRF AUTH SE REALTED FRONTEND SE BACKEND SE DATA COMMUNICATE HOGA BUSS WO COD HOGA AUR KYCH BHI NAHI 
// JAISE UI MEIN KYA DIKAHEGA STATES KAUN USE HONGE ETXC SAB CHEEZEIN WO YAHA NAHI LIKHANA HAI HUMEIN USKE LIYE USE PAGEA AND COMPONENTS ONLY FOR UI
const api=axios.create({
    url:"http://localhost:3000/api/auth",
    withCredentials:true
})
export async function register(username,email,password)
{
    // as humein error bhi handle karna hga warna server aresh ho ayega fronrend pe 
    try {
        const response=await api.post("/register",{
            username,
            email,
            password
        })
        return response.data;
        // {
            withCredentials:true
        // }
        // ye code bhi reapet ho raha hai do jagah and http://localhost:3000/api/auth ye bhi reapet ho raha hai code 
        // toh us ethe common cheez taaki baar baar n likhna pade 
    } catch (err) {
        throw err;
        //  ab agar error bhi aa gaya toh kya ui mein show karna hai wo ye file nahi dikahyea beacsue ui dikahan aiska kaam nahi haia
    }
}
export async function login(username,password)
{
    try {
        const response=await api.post("/login",{
            username,
            password
        })
        return response.data;
        // why return beacuse heumin isko ye kahi n kahi bhejna hoga jaise login.jsx mein yaha ya jo bhi use karein and poore 
        // function ko bhi export function login(...)
    } catch (err) {
     throw err;
        //  ab agar error bhi aa gaya toh kya ui mein show karna hai wo ye file nahi dikahyea beacsue ui dikahan aiska kaam nahi haia 
    }
}
export async function getMe()
{
    try {
        const response=await axios.get("/get-me")
        return response.data
    } catch (err) {
        throw err
    }
}