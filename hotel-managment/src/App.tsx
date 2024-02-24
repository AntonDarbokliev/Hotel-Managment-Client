import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./components/Auth/Login/Login";
import { Root } from "./components/Root/Root";
import { Register } from "./components/Auth/Register/Register";

import { AddHotel } from "./components/AddHotel/AddHotel.tsx";

import { HotelsHome } from "./components/HotelsHome/HotelsHome";
import { useEffect } from "react";
import { useAuthStore } from "./stores/Auth.ts";

const router = createBrowserRouter([
  {
      path: '/*',
      element: <Root/>,
      children: [
        {
          path: "login",
          element: <Login/>,
      },
      {
        path: "register",
        element: <Register/>,

    },{
      path: "add",
      element: <AddHotel/>

    },
    {
      path: 'hotels',
      element: <HotelsHome/>
    }
    
      ],
  
  },
  
]);

function App() {
  const updateUser = useAuthStore(s => s.updateUser)

  useEffect(() => {
    updateUser()
  },[])

  return (
    <>
    <RouterProvider router={router}/>   
    </>
  )
}

export default App
