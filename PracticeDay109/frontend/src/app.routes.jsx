import {createBrowserRouter} from "react-router"
import Login from "./auth/pages/Login"
import Register from "./auth/pages/Register"
const Routes=createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/",
        element:<h1>Shri ji</h1>
    }
])
export default Routes