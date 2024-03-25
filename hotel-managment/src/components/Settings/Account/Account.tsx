import { useAuthStore } from "../../../stores/Auth";
import { ProfilePicture } from "../../Shared/ProfilePicture/ProfilePicture";
import styles from "./Account.module.scss";

export const Account = () => {
    
    const user = useAuthStore(s => s.user);

    return (
        <>
            <div className={styles["container"]}>
                <ProfilePicture/>
                <h3>{user.fullName}</h3>
            </div>
        </>
    );
};
