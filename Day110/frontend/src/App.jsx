import React from 'react'
import { RouterProvider } from 'react-router'
import "./features/shared/global.scss"
import { routes } from './app.routes'
import { AuthProvider } from './features/auth/auth.context'
const App = () => {
  return (
    <>
    <AuthProvider>
         <RouterProvider router={routes}/>
    </AuthProvider>
    </>
  )
}

export default App
