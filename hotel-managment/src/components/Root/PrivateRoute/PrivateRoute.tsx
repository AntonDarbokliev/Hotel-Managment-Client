import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../../stores/Auth";

interface Props {
  isLoggedIn?: boolean
}

export const PrivateRoute:React.FC<Props> = () => {
    const isLoggedIn = useAuthStore(s => s.isLoggedIn)

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  };
  