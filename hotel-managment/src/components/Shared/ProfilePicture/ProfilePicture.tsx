import { useAuthStore } from "../../../stores/Auth"
import styles from './ProfilePicture.module.scss'
interface Props {
    width?: string;
}

export const ProfilePicture: React.FC<Props> = ({width}) => {
    const userImage = useAuthStore(s => s.user.picture)
    console.log(userImage);
    
    return (
        <div className={styles["profile-picture-wrapper"]} 
        style={{'backgroundImage': `url(${userImage})`,width}} />
    )
}