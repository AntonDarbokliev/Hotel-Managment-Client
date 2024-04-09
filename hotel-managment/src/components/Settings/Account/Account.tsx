import { useAuthStore } from "../../../stores/Auth";
import { InfoField } from "../../Shared/InfoField/InfoField";
import { ProfilePicture } from "../../Shared/ProfilePicture/ProfilePicture";
import { SettingsOption } from "../../Shared/SettingsOption/SettingsOption";
import { faKey,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import styles from "./Account.module.scss";
import { useState } from "react";
import { ResetPassword } from "../Modals/ResetPassword/ResetPassword";
import { AnimatePresence } from "framer-motion";
import { ChangeEmail } from "../Modals/ChangeEmail/ChangeEmail";

export const Account = () => {
    
    const user = useAuthStore(s => s.user);
    const [resetPassModal,setResetPassModal] = useState(false)
    const [resetEmailModal, setResetEmailModal] = useState(false)
    return (
        <>
        <AnimatePresence>

        {resetPassModal && 
            <ResetPassword key={'reset-pass-modal'} userEmail="antondarbokliev@gmail.com" modalSetter={setResetPassModal}/>
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
                       <SettingsOption onClick={() => setResetPassModal(true)} icon={faKey}>Reset Passsword</SettingsOption>
                       <SettingsOption onClick={() => setResetEmailModal(true)} icon={faEnvelope}>Change Email Address</SettingsOption>
                    </ul>
                </InfoField>
            </div>

        </>
    );
};
