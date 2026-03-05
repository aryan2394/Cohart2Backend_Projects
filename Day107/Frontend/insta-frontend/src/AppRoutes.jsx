import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./features/auth/pages/Register"
import Login from "./features/auth/pages/Login"
import React from 'react'

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes
