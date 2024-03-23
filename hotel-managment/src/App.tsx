import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./components/Auth/Login/Login";
import { Root } from "./components/Root/Root";
import { Register } from "./components/Auth/Register/Register";

import { AddHotel } from "./components/AddHotel/AddHotel.tsx";

import { HotelsHome } from "./components/HotelsHome/HotelsHome";

import { HotelDetails } from "./components/HotelDetails/HotelDetails.tsx";
import { Rooms } from "./components/HotelDetails/Rooms/Rooms.tsx";
import { Employees } from "./components/HotelDetails/Employees/Employees.tsx";

import { useEffect } from "react";
import { useAuthStore } from "./stores/Auth.ts";
import { RoomDetails } from "./components/RoomDetails/RoomDetails.tsx";
import { RoomInfo } from "./components/RoomDetails/RoomInfo/RoomInfo.tsx";
import { PrivateRoute } from "./components/Root/PrivateRoute/PrivateRoute.tsx";
import { RoomReservartions } from "./components/RoomDetails/RoomReservations/RoomReservations.tsx";
import { ReservationDetails } from "./components/Reservation/ReservationDetails/ReservationDetails.tsx";




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

    },

    {
      element: <PrivateRoute/>,
      children: [
        {
          path: "add",
          element: <AddHotel/>
    
        },
        {
          path: 'hotels',
          element: <HotelsHome/>
        },
        {
          path: 'hotels/:id',
          element: <HotelDetails/>,
          children: [
            {
              path: "rooms",
              element: <Rooms/>,
          },
          {
            path: "employees",
            element: <Employees/>,
        },
          ]
        },
    
      {
        path: 'room/:id',
        element: <RoomDetails/>,
        children: [
          {
            path: 'info',
            element: <RoomInfo/>
          },
          {
            path: 'reservations',
            element: <RoomReservartions/>,
          },
          {
            path: 'reservations/:reservationId',
            element: <ReservationDetails/>
          
          }
        ]
      }

      ]
    },
    
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
