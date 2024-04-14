import { useAuthStore } from "../../../stores/Auth";
import { InfoField } from "../../Shared/InfoField/InfoField";
import { ProfilePicture } from "../../Shared/ProfilePicture/ProfilePicture";
import { SettingsOption } from "../../Shared/SettingsOption/SettingsOption";
import { faKey,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import styles from "./Account.module.scss";
import { useState } from "react";
import { ChangePassword } from "../Modals/ChangePassword/ChangePassword";
import { AnimatePresence } from "framer-motion";
import { ChangeEmail } from "../Modals/ChangeEmail/ChangeEmail";

export const Account = () => {
    
    const user = useAuthStore(s => s.user);
    const [resetPassModal,setChangePassModal] = useState(false)
    const [resetEmailModal, setResetEmailModal] = useState(false)
    return (
        <>
        <AnimatePresence>

        {resetPassModal && 
            <ChangePassword key={'reset-pass-modal'} userEmail="antondarbokliev@gmail.com" modalSetter={setChangePassModal}/>
        }

        {resetEmailModal && 
            <ChangeEmail key={'change-email-modal'} modalSetter={setResetEmailModal}/>
        }
        </AnimatePresence>

            <div className={styles["container"]}>
                <ProfilePicture/>
                <h3>{user.fullName}</h3>
                <h4>{user.role}</h4>
                <InfoField >
                    <ul>
                       <SettingsOption onClick={() => setChangePassModal(true)} icon={faKey}>Change Passsword</SettingsOption>
                       <SettingsOption onClick={() => setResetEmailModal(true)} icon={faEnvelope}>Change Email Address</SettingsOption>
                    </ul>
                </InfoField>
            </div>

        </>
    );
};
