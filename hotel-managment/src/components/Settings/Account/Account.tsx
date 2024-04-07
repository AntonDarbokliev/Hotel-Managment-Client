import { useAuthStore } from "../../../stores/Auth";
import { InfoField } from "../../Shared/InfoField/InfoField";
import { ProfilePicture } from "../../Shared/ProfilePicture/ProfilePicture";
import { SettingsOption } from "../../Shared/SettingsOption/SettingsOption";
import { faKey } from '@fortawesome/free-solid-svg-icons'
import styles from "./Account.module.scss";
import { useState } from "react";
import { ResetPassword } from "../Modals/ResetPassword/ResetPassword";
import { AnimatePresence } from "framer-motion";

export const Account = () => {
    
    const user = useAuthStore(s => s.user);
    const [resetPassModal,setResetPassModal] = useState(false)
    console.log(user);
    
    return (
        <>
        <AnimatePresence>

        {resetPassModal && 
            <ResetPassword userEmail="antondarbokliev@gmail.com" modalSetter={setResetPassModal}/>
        }
        </AnimatePresence>

            <div className={styles["container"]}>
                <ProfilePicture/>
                <h3>{user.fullName}</h3>
                <h4>{user.role}</h4>
                <InfoField >
                    <ul>
                       <SettingsOption onClick={() => setResetPassModal(true)} icon={faKey}>Reset Passsword</SettingsOption>
                    </ul>
                </InfoField>
            </div>

        </>
    );
};
