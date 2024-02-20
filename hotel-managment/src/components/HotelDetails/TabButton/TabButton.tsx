import { ReactNode } from "react"
import styles from './TabButton.module.scss'
import { useNavigate, useParams } from "react-router-dom"
interface Props {
    children:ReactNode
}


export const TabButton:React.FC<Props> = ({children}) => {
    const navigate = useNavigate()
    const params = useParams()
    
    return (
        <button className={styles["tab"]} onClick={() => navigate(`/hotels/${params.id}/${String(children).toLocaleLowerCase()}`)}>
            {children}
        </button>
    )
}