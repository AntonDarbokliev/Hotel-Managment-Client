import { useNavigate } from 'react-router-dom'
import styles from './RoomItem.module.scss'
import { motion } from 'framer-motion';

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
        <motion.div
        className={styles["room-item"]} 
        onClick={redirect}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
         >
            <h1 >{number}</h1>
        </motion.div>
    )
}