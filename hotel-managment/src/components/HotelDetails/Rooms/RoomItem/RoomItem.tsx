import { useNavigate } from 'react-router-dom'
import styles from './RoomItem.module.scss'

interface Props {
    number: number,
    id: string,
}

export const RoomItem:React.FC<Props> = ({number,id}) => {

    const navigate = useNavigate()

    const redirect = () => {
        navigate('/room/' + id + '/info')
    }
    return (
        <div className={styles["room-item"]} onClick={redirect}>
            <h1 >{number}</h1>
        </div>
    )
}