import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./components/Auth/Login/Login";
import { Root } from "./components/Root/Root";
import { Register } from "./components/Auth/Register/Register";
import { AddHotel } from "./components/AddHotel/AddHotel.tsx";


const router = createBrowserRouter([
  {
      path: '/',
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
    }
    
      ],
  
  },

  
]);

function App() {
  return (
    <>
    {/* <p>Hello test</p> */}
    {/* <Navigation/> */}
    <RouterProvider router={router}/>   
    </>
  )
}

export default App
