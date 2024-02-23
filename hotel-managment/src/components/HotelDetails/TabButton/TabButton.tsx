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
        <button style={params['*']!.includes(String(children).toLocaleLowerCase()) ? {color: "#4844bf" } : {}} 
        className={`${styles["tab"]} ${params['*']!.includes(String(children).toLocaleLowerCase()) ? styles['active'] : ''}`} 
        onClick={() => navigate(`/hotels/${params.id}/${String(children).toLocaleLowerCase()}`)}>
            {children}
        </button>
    )
}