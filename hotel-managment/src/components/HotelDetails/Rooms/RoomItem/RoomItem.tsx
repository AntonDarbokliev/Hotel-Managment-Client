import styles from './RoomItem.module.scss'

interface Props {
    number: number
}

export const RoomItem:React.FC<Props> = ({number}) => {
    return (
        <div className={styles["room-item"]}>
            <h1>{number}</h1>
        </div>
    )
}