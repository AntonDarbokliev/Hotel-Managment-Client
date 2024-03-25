import { useEffect } from "react";
import { Details } from "../Shared/Details/Details";
import { useAuthStore } from "../../stores/Auth";

export const Settings = () => {
    const updateUser = useAuthStore(s => s.updateUser)

    useEffect(() => {
        updateUser()
    },[])
    
    // Temporary variables
    const isLoading = false;
    const title = "Settings";

    const tabs = ["Account", "Employees", "Preferences"];

    return (
        <Details
            root="settings"
            isLoading={isLoading}
            title={title}
            tabs={tabs}
        ></Details>
    );
};
