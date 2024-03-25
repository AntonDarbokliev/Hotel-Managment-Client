import { useAuthStore } from "../../../stores/Auth"
import styles from './ProfilePicture.module.scss'


export const ProfilePicture = () => {
    const userImage = useAuthStore(s => s.user.picture)
    console.log(userImage);
    
    return (
        <div className={styles["profile-picture-wrapper"]} style={{'backgroundImage': `url(${userImage})`}} >
            {/* <img className="profile-picture" src={userImage} alt="Profile Picture" /> */}
        </div>
    )
}