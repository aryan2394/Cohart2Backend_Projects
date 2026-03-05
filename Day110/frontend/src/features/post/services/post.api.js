import axios from "axios"
const api=axios.create({
    baseURL:"http://localhost:3000/api/",
    withCredentials:true
})
// jitne bhi post valiable hai unko laana from  databse 
// ab ye directly data ja nahi skat toh create the state layer (storage layer)
export async function getFeed()
{
    const response=await api.get("posts/feed");
    return response.data;
}