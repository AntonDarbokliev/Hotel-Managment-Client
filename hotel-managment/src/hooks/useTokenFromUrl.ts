import { useLocation } from "react-router-dom";



export const useGetTokenFromUrl = () => {
    const location = useLocation()

    const match = location.search.match(/[?&]token=([^&]+)/);
    
    return {
        token: match ? match[1] : null
    }

}