import { useAuthStore } from "../../../stores/Auth";
import { InfoField } from "../../Shared/InfoField/InfoField";
import { ProfilePicture } from "../../Shared/ProfilePicture/ProfilePicture";
import { SettingsOption } from "../../Shared/SettingsOption/SettingsOption";
import { faKey } from '@fortawesome/free-solid-svg-icons'
import styles from "./Account.module.scss";

export const Account = () => {
    
    const user = useAuthStore(s => s.user);

    return (
        <>
            <div className={styles["container"]}>
                <ProfilePicture/>
                <h3>{user.fullName}</h3>
                <InfoField >
                    <ul>
                       <SettingsOption icon={faKey}>Reset Passsword</SettingsOption>
                       <SettingsOption icon={faKey}>Reset Passsword</SettingsOption>
                       <SettingsOption icon={faKey}>Reset Passsword</SettingsOption>
                       <SettingsOption icon={faKey}>Reset Passsword</SettingsOption>
                    </ul>
                </InfoField>
            </div>
        </>
    );
};
