import React from "react";
import Routes from "./app.routes.jsx"
import {RouterProvider} from "react-router"
// dekho aapne different pages toh bana liye and aap chahte ho ki wo saare pages dikhe toh aapko use karna padega RouterProvider aur uske aandar aap saare routes daal do
// ab now app can acees any routes
import "./shared/global.scss"
import { AuthProvider } from "./auth/auth.context.jsx";
const App = () => {
  return (
   <>
        <AuthProvider>
          <RouterProvider router={Routes}></RouterProvider>
        </AuthProvider>
   </>
  )
}

export default App
