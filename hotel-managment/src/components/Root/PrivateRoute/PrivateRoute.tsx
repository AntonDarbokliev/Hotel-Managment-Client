import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../../stores/Auth";

export const PrivateRoute = () => {
    // const isLoggedIn = useAuthStore.getState().isLoggedIn
    const isLoggedIn = true;

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  };
  