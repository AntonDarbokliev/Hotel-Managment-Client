import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../../stores/Auth";

export const PrivateRoute = () => {
    const isLoggedIn = useAuthStore.getState().isLoggedIn

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  };
  